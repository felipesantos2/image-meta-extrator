import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ImagePlus, Upload } from 'lucide-react';
import { isImageFile } from '../utils/helpers';

export default function DropZone({ onFileSelect }) {
	const { t } = useTranslation();
	const [isDragOver, setIsDragOver] = useState(false);
	const [hasValidationError, setHasValidationError] = useState(false);
	const fileInputRef = useRef(null);

	function validateAndSelect(file) {
		if (!isImageFile(file)) {
			setHasValidationError(true);
			return;
		}

		setHasValidationError(false);
		onFileSelect(file);
	}

	function handleDragOver(e) {
		e.preventDefault();
		setIsDragOver(true);
	}

	function handleDragLeave() {
		setIsDragOver(false);
	}

	function handleDrop(e) {
		e.preventDefault();
		setIsDragOver(false);
		validateAndSelect(e.dataTransfer.files[0]);
	}

	function handleFileInput(e) {
		validateAndSelect(e.target.files[0]);
		e.target.value = '';
	}

	function handleButtonClick() {
		fileInputRef.current.click();
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 mx-auto w-full">
			{/* Título e descrição */}
			<div className="text-center mb-8">
				<h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-2 font-[var(--font-serif)]">
					{t('app.title')}
				</h2>
				<p className="text-[var(--color-text-muted)] text-base">{t('app.subtitle')}</p>
			</div>

			{/* Área de drop */}
			<div
				className={`
					relative w-full max-w-lg p-8 md:p-12 mx-auto
					border border-dashed rounded
					text-center cursor-pointer
					transition-all duration-200
					${
						isDragOver
							? 'border-[var(--color-accent)] bg-[var(--color-accent-bg)] scale-[1.01]'
							: 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-hover)]'
					}
				`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<div className="flex justify-center mb-4">
					<ImagePlus
						className={`w-12 h-12 transition-all duration-200 ${
							isDragOver
								? 'scale-110 text-[var(--color-accent)]'
								: 'text-[var(--color-text-muted)]'
						}`}
						strokeWidth={1.5}
					/>
				</div>

				<p className="text-lg text-[var(--color-text-secondary)] mb-4">
					{t('dropzone.title')}
				</p>

				{/* Divisor "ou" */}
				<div className="flex items-center gap-4 my-4 text-[var(--color-text-muted)] text-sm">
					<span className="flex-1 h-px bg-[var(--color-border)]" />
					{t('dropzone.or')}
					<span className="flex-1 h-px bg-[var(--color-border)]" />
				</div>

				<div className="flex justify-center">
					<button
						className="inline-flex items-center gap-2 p-6 bg-[var(--color-accent)] text-white rounded font-medium cursor-pointer hover:bg-[var(--color-accent-secondary)] hover:-translate-y-0.5 transition-all"
						onClick={handleButtonClick}
						type="button"
					>
						<Upload size={16} />
						{t('dropzone.button')}
					</button>
				</div>

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleFileInput}
					className="hidden"
				/>

				<p className="mt-5 text-xs text-[var(--color-text-muted)]">
					{t('dropzone.formats')}
				</p>
				{hasValidationError && (
					<p
						className="mt-3 text-sm text-[var(--color-accent)]"
						role="alert"
						aria-live="polite"
					>
						{t('dropzone.invalidFile')}
					</p>
				)}
			</div>
		</div>
	);
}
