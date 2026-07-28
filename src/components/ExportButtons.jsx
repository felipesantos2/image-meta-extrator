import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { exportAsJSON, exportAsCSV } from '../utils/exportData';

export default function ExportButtons({ metadata, filename }) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-wrap gap-3 justify-center mt-4 animate-fade-slide-in">
			<button
				className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-sm font-medium text-[var(--color-text-secondary)] cursor-pointer hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)] transition-all"
				onClick={() => exportAsJSON(metadata, filename)}
				type="button"
			>
				<Download size={14} />
				{t('export.json')}
			</button>
			<button
				className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-sm font-medium text-[var(--color-text-secondary)] cursor-pointer hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)] transition-all"
				onClick={() => exportAsCSV(metadata, filename)}
				type="button"
			>
				<Download size={14} />
				{t('export.csv')}
			</button>
		</div>
	);
}
