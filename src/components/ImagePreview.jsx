import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, HardDrive, Maximize2, RefreshCw } from 'lucide-react';

/**
 * Formata o tamanho do arquivo para uma string legível.
 * Ex: 1024 → "1.00 KB"
 */
function formatFileSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImagePreview({ file, metadata, onReset }) {
	const { t } = useTranslation();
	const [previewUrl, setPreviewUrl] = useState(null);

	useEffect(() => {
		if (!file) return;
		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [file]);

	if (!file || !previewUrl) return null;

	const width = metadata?.image?.width;
	const height = metadata?.image?.height;

	return (
		<div className="flex flex-col items-center gap-4 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded animate-fade-slide-in">
			<img
				className="w-full max-h-72 object-contain rounded-sm bg-[var(--color-bg)]"
				src={previewUrl}
				alt={file.name}
			/>

			{/* Tags de informação do arquivo */}
			<div className="flex flex-wrap gap-3 justify-center">
				<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-hover)] rounded text-xs text-[var(--color-text-secondary)]">
					<FileText size={13} className="text-[var(--color-accent)]" />
					<strong className="text-[var(--color-text)] font-semibold">{file.name}</strong>
				</span>
				<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-hover)] rounded text-xs text-[var(--color-text-secondary)]">
					<HardDrive size={13} className="text-[var(--color-accent)]" />
					<strong className="text-[var(--color-text)] font-semibold">
						{formatFileSize(file.size)}
					</strong>
				</span>
				{width && height && (
					<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-hover)] rounded text-xs text-[var(--color-text-secondary)]">
						<Maximize2 size={13} className="text-[var(--color-accent)]" />
						<strong className="text-[var(--color-text)] font-semibold">
							{width} × {height}px
						</strong>
					</span>
				)}
			</div>

			<button
				className="inline-flex items-center gap-1.5 px-5 py-2 bg-transparent border border-[var(--color-border)] rounded text-sm text-[var(--color-text-secondary)] cursor-pointer hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
				onClick={onReset}
				type="button"
			>
				<RefreshCw size={14} />
				{t('preview.changeImage')}
			</button>
		</div>
	);
}
