import test from 'node:test';
import assert from 'node:assert/strict';
import {
	escapeCsvQuotes,
	isImageFile,
	neutralizeCsvFormula,
	removeFileExtension,
} from '../src/utils/helpers.js';

test('remove somente a última extensão do arquivo', () => {
	assert.equal(removeFileExtension('foto.original.jpg'), 'foto.original');
	assert.equal(removeFileExtension('foto'), 'foto');
});

test('aceita somente arquivos identificados como imagem', () => {
	assert.equal(isImageFile({ type: 'image/jpeg' }), true);
	assert.equal(isImageFile({ type: 'text/plain' }), false);
	assert.equal(isImageFile(null), false);
});

test('neutraliza valores que uma planilha interpretaria como fórmula', () => {
	assert.equal(neutralizeCsvFormula('=SUM(A1:A2)'), "'=SUM(A1:A2)");
	assert.equal(neutralizeCsvFormula('  @command'), "'  @command");
	assert.equal(neutralizeCsvFormula('texto comum'), 'texto comum');
});

test('escapa aspas duplas para exportação CSV', () => {
	assert.equal(escapeCsvQuotes('Câmera "principal"'), 'Câmera ""principal""');
});
