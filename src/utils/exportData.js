import { escapeCsvQuotes } from './helpers';

/**
 * Funções para exportar metadados como JSON ou CSV.
 * Cada função cria um arquivo em memória e dispara o download no navegador.
 */

/**
 * Exporta os metadados como arquivo JSON.
 * Cria um Blob com o conteúdo JSON formatado e dispara o download.
 */
export function exportAsJSON(metadata, filename = 'metadata') {
	const jsonString = JSON.stringify(metadata, null, 2);
	const blob = new Blob([jsonString], { type: 'application/json' });
	triggerDownload(blob, `${filename}.json`);
}

/**
 * Exporta os metadados como arquivo CSV.
 * Converte o objeto raw (chave-valor) para formato CSV com duas colunas.
 */
export function exportAsCSV(metadata, filename = 'metadata') {
	const data = metadata.raw || {};
	const rows = [
		['Campo', 'Valor'], // Header do CSV
		...Object.entries(data).map(([key, value]) => [
			escapeCsvValue(key),
			escapeCsvValue(String(value ?? '')),
		]),
	];

	const csvString = rows.map((row) => row.join(',')).join('\n');
	// BOM para garantir que o Excel abra com acentos corretos
	const bom = '\uFEFF';
	const blob = new Blob([bom + csvString], {
		type: 'text/csv;charset=utf-8',
	});
	triggerDownload(blob, `${filename}.csv`);
}

/**
 * Cria um link temporário e clica nele para disparar o download.
 * Essa é a forma padrão de forçar download no navegador.
 */
function triggerDownload(blob, filename) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

/** Escapa valores CSV que contenham vírgulas, aspas ou quebras de linha */
function escapeCsvValue(value) {
	if (value.includes(',') || value.includes('"') || value.includes('\n')) {
		return `"${escapeCsvQuotes(value)}"`;
	}
	return value;
}
