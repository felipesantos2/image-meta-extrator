import exifr from 'exifr';

/**
 * Extrai e organiza os metadados de um arquivo de imagem.
 * Usa a biblioteca exifr para ler EXIF, IPTC, XMP e GPS.
 *
 * Retorna um objeto com os dados separados por categoria:
 * - camera: informações da câmera e configurações de captura
 * - image: propriedades da imagem (dimensões, cor, compressão)
 * - datetime: datas de criação e modificação
 * - gps: coordenadas de localização (se disponíveis)
 * - raw: todos os campos brutos sem filtro
 */
export async function parseMetadata(file) {
	try {
		// Extrair TODOS os metadados possíveis do arquivo
		const allData = await exifr.parse(file, {
			tiff: true,
			exif: true,
			gps: true,
			iptc: true,
			xmp: true,
			icc: true,
			translateValues: true,
			translateKeys: true,
			reviveValues: true,
		});

		// Se não encontrou nenhum metadado, retornar vazio
		if (!allData) {
			return {
				camera: {},
				image: {},
				datetime: {},
				gps: null,
				raw: {},
			};
		}

		// Separar os dados por categoria
		const camera = pickDefined({
			make: allData.Make,
			model: allData.Model,
			lens: allData.LensModel || allData.LensMake,
			focalLength: formatFocalLength(allData.FocalLength),
			aperture: formatAperture(allData.FNumber),
			exposureTime: formatExposureTime(allData.ExposureTime),
			iso: allData.ISO,
			flash: allData.Flash,
			whiteBalance: allData.WhiteBalance,
			exposureMode: allData.ExposureMode,
			meteringMode: allData.MeteringMode,
			exposureProgram: allData.ExposureProgram,
		});

		const image = pickDefined({
			width: allData.ImageWidth || allData.ExifImageWidth || allData.PixelXDimension,
			height: allData.ImageHeight || allData.ExifImageHeight || allData.PixelYDimension,
			colorSpace: allData.ColorSpace,
			bitDepth: allData.BitsPerSample,
			compression: allData.Compression,
			orientation: allData.Orientation,
			xResolution: allData.XResolution,
			yResolution: allData.YResolution,
			resolutionUnit: allData.ResolutionUnit,
			software: allData.Software,
		});

		const datetime = pickDefined({
			dateOriginal: formatDate(allData.DateTimeOriginal),
			dateCreated: formatDate(allData.CreateDate),
			dateModified: formatDate(allData.ModifyDate),
			timezone: allData.OffsetTime || allData.OffsetTimeOriginal,
		});

		// GPS: extrair latitude e longitude se disponíveis
		const hasGps = allData.latitude != null && allData.longitude != null;
		const gps = hasGps
			? {
					latitude: allData.latitude,
					longitude: allData.longitude,
					altitude: allData.GPSAltitude,
				}
			: null;

		// Raw: limpar campos que são objetos complexos ou buffers
		const raw = {};
		for (const [key, value] of Object.entries(allData)) {
			// Pular valores binários e objetos que não são úteis na exibição
			if (value instanceof Uint8Array || value instanceof ArrayBuffer) continue;
			if (typeof value === 'object' && value !== null && !(value instanceof Date)) continue;

			raw[key] = value instanceof Date ? formatDate(value) : value;
		}

		return { camera, image, datetime, gps, raw };
	} catch (error) {
		throw new Error('Não foi possível extrair os metadados da imagem.', { cause: error });
	}
}

// --- Funções auxiliares de formatação ---

/** Remove chaves com valor undefined/null para manter o objeto limpo */
function pickDefined(obj) {
	const result = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value != null) {
			result[key] = value;
		}
	}
	return result;
}

/** Formata a distância focal: 50 → "50mm" */
function formatFocalLength(value) {
	if (value == null) return undefined;
	return `${value}mm`;
}

/** Formata a abertura: 2.8 → "f/2.8" */
function formatAperture(value) {
	if (value == null) return undefined;
	return `f/${value}`;
}

/** Formata o tempo de exposição: 0.004 → "1/250s" */
function formatExposureTime(value) {
	if (value == null) return undefined;
	if (value >= 1) return `${value}s`;
	return `1/${Math.round(1 / value)}s`;
}

/** Formata uma data para string legível */
function formatDate(value) {
	if (value == null) return undefined;
	if (value instanceof Date) {
		return value.toLocaleString();
	}
	return String(value);
}
