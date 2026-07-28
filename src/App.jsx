import { useState, useEffect } from 'react';
import Header from './components/Header';
import DropZone from './components/DropZone';
import ImagePreview from './components/ImagePreview';
import MetadataTabs from './components/MetadataTabs';
import ExportButtons from './components/ExportButtons';
import Footer from './components/Footer';
import { parseMetadata } from './utils/parseMetadata';
import { removeFileExtension } from './utils/helpers';

export default function App() {
	const [imageFile, setImageFile] = useState(null);
	const [metadata, setMetadata] = useState(null);
	const [loading, setLoading] = useState(false);
	const [theme, setTheme] = useState('dark');

	useEffect(() => {
		if (!imageFile) {
			setMetadata(null);
			return;
		}

		// TODO: Implementar editor em lote futuramente e resolver a atualização da data de criação (DateTimeOriginal) e outros campos.
		setLoading(true);
		parseMetadata(imageFile)
			.then((data) => setMetadata(data))
			.catch((err) => console.error('Erro ao processar metadados:', err))
			.finally(() => setLoading(false));
	}, [imageFile]);

	useEffect(() => {
		document.documentElement.className = theme;
	}, [theme]);

	function toggleTheme() {
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
	}

	function handleReset() {
		setImageFile(null);
		setMetadata(null);
	}

	// [Nota Antigravity] Helper criado em src/support/helpers.js para evitar expressões regulares inline
	// não sou fã de expressões regulares, podemos criar uma pasta de suport e adicionar arquivos de helpers
	const filenameBase = imageFile ? removeFileExtension(imageFile.name) : 'metadata';

	return (
		<div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
			<Header theme={theme} onToggleTheme={toggleTheme} />

			<main className="flex-1 w-full max-w-5xl self-center px-4 py-6">
				{!imageFile && <DropZone onFileSelect={setImageFile} />}

				{imageFile && (
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
						<div>
							<ImagePreview
								file={imageFile}
								metadata={metadata}
								onReset={handleReset}
							/>
						</div>

						<div>
							{loading ? (
								<div className="flex items-center justify-center py-16 text-[var(--color-text-muted)]">
									<span className="text-3xl animate-spin mr-3">⏳</span>
									Processando...
								</div>
							) : metadata ? (
								<>
									<MetadataTabs metadata={metadata} />
									<ExportButtons metadata={metadata} filename={filenameBase} />
								</>
							) : null}
						</div>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
