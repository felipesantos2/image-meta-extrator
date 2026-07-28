import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import DropZone from './components/DropZone';
import ImagePreview from './components/ImagePreview';
import MetadataTabs from './components/MetadataTabs';
import ExportButtons from './components/ExportButtons';
import ContentGuide from './components/ContentGuide';
import Footer from './components/Footer';
import ConsentBanner from './components/ConsentBanner';
import { parseMetadata } from './utils/parseMetadata';
import { removeFileExtension } from './utils/helpers';

export default function App() {
	const { t } = useTranslation();
	const [imageFile, setImageFile] = useState(null);
	const [metadata, setMetadata] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [theme, setTheme] = useState('dark');

	useEffect(() => {
		let cancelled = false;

		if (!imageFile) {
			setMetadata(null);
			setError('');
			return;
		}

		// TODO: Implementar editor em lote futuramente e resolver a atualização da data de criação (DateTimeOriginal) e outros campos.
		setMetadata(null);
		setError('');
		setLoading(true);
		parseMetadata(imageFile)
			.then((data) => {
				if (!cancelled) setMetadata(data);
			})
			.catch(() => {
				if (!cancelled) setError(t('metadata.parseError'));
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [imageFile, t]);

	useEffect(() => {
		document.documentElement.className = theme;
	}, [theme]);

	function toggleTheme() {
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
	}

	function handleReset() {
		setImageFile(null);
		setMetadata(null);
		setError('');
	}

	// [Nota Antigravity] Helper criado em src/support/helpers.js para evitar expressões regulares inline
	// não sou fã de expressões regulares, podemos criar uma pasta de suport e adicionar arquivos de helpers
	const filenameBase = imageFile ? removeFileExtension(imageFile.name) : 'metadata';

	return (
		<div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
			<Header theme={theme} onToggleTheme={toggleTheme} />

			<main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
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
									{t('metadata.processing')}
								</div>
							) : error ? (
								<div
									className="p-4 border border-[var(--color-accent)] rounded text-center text-[var(--color-accent)]"
									role="alert"
								>
									{error}
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

				<ContentGuide />
			</main>

			<Footer />
			<ConsentBanner />
		</div>
	);
}
