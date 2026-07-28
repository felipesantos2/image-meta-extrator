import { useTranslation } from 'react-i18next';

/**
 * Tabela genérica de metadados (chave-valor).
 * Recebe um array de { label, value } e renderiza uma tabela estilizada.
 */
export default function MetadataTable({ entries, emptyMessage }) {
	const { t } = useTranslation();

	if (!entries || entries.length === 0) {
		return (
			<div className="text-center py-10 text-[var(--color-text-muted)]">
				<span className="block text-3xl mb-2">📭</span>
				<p>{emptyMessage || t('raw.noData')}</p>
			</div>
		);
	}

	return (
		<table className="w-full border-collapse animate-fade-slide-in">
			<tbody>
				{entries.map((entry) => (
					<tr
						key={entry.label}
						className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-hover)] transition-colors"
					>
						<td className="py-3 px-4 text-sm text-[var(--color-text-muted)] font-medium w-2/5 whitespace-nowrap">
							{entry.label}
						</td>
						<td className="py-3 px-4 text-sm text-[var(--color-text)] font-semibold break-words">
							{String(entry.value ?? t('noData'))}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
