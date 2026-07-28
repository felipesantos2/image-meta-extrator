import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Image, Calendar, MapPin, FileCode } from 'lucide-react';
import MetadataTable from './MetadataTable';
import GpsMap from './GpsMap';

/**
 * Abas de metadados organizadas por categoria.
 * Cada aba renderiza uma MetadataTable (ou GpsMap para GPS).
 */
export default function MetadataTabs({ metadata }) {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState('camera');

	// Definição das abas com ícones
	const tabs = [
		{ id: 'camera', label: t('tabs.camera'), IconComponent: Camera },
		{ id: 'image', label: t('tabs.image'), IconComponent: Image },
		{ id: 'datetime', label: t('tabs.datetime'), IconComponent: Calendar },
		{ id: 'gps', label: t('tabs.gps'), IconComponent: MapPin },
		{ id: 'raw', label: t('tabs.raw'), IconComponent: FileCode },
	];

	/**
	 * Converte os dados de uma categoria em array de { label, value }
	 * para passar ao MetadataTable.
	 */
	function getEntries(category) {
		const data = metadata[category];
		if (!data || typeof data !== 'object') return [];

		// Para a aba "raw", usar as chaves originais do EXIF
		if (category === 'raw') {
			return Object.entries(data).map(([key, value]) => ({
				label: key,
				value,
			}));
		}

		// Para outras abas, usar as traduções das labels
		return Object.entries(data).map(([key, value]) => ({
			label: t(`${category}.${key}`, key),
			value,
		}));
	}

	return (
		<div className="animate-fade-slide-in">
			{/* Barra de abas */}
			<div className="flex gap-1 overflow-x-auto pb-1 mb-4 border-b border-[var(--color-border)]">
				{tabs.map((tab) => {
					const Icon = tab.IconComponent;
					return (
						<button
							key={tab.id}
							className={`
								flex items-center gap-1.5 px-4 py-2.5
								text-sm font-medium whitespace-nowrap
								border-b-2 cursor-pointer
								transition-all duration-200
								${
									activeTab === tab.id
										? 'border-[var(--color-accent)] text-[var(--color-accent)]'
										: 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-border)]'
								}
							`}
							onClick={() => setActiveTab(tab.id)}
							type="button"
						>
							<Icon size={16} />
							<span className="hidden sm:inline">{tab.label}</span>
						</button>
					);
				})}
			</div>

			{/* Conteúdo da aba ativa */}
			<div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded p-4">
				{activeTab === 'gps' ? (
					<GpsMap gps={metadata.gps} />
				) : (
					<MetadataTable
						entries={getEntries(activeTab)}
						emptyMessage={activeTab === 'raw' ? t('raw.noData') : undefined}
					/>
				)}
			</div>
		</div>
	);
}
