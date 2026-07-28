/**
 * Remove a extensão de um nome de arquivo sem usar expressões regulares.
 * Exemplo: "foto.imagem.jpg" -> "foto.imagem"
 *
 * @param {string} filename - O nome completo do arquivo.
 * @returns {string} O nome do arquivo sem a extensão.
 */
export function removeFileExtension(filename) {
	if (!filename) return '';
	const lastDotIndex = filename.lastIndexOf('.');
	if (lastDotIndex === -1) return filename;
	return filename.substring(0, lastDotIndex);
}

/**
 * Escapa aspas duplas de um valor para formato CSV sem usar expressões regulares.
 * Substitui todas as aspas duplas (") por duas aspas duplas ("").
 *
 * @param {string} value - O valor a ser escapado.
 * @returns {string} O valor escapado.
 */
export function escapeCsvQuotes(value) {
	if (!value) return '';
	return value.split('"').join('""');
}
