import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Map, MapPin, Mountain } from 'lucide-react';

// Corrigir o ícone padrão do Leaflet que quebra com bundlers como Vite.
// Sem isso, o marker fica invisível.
const defaultIcon = L.icon({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIconRetina,
	shadowUrl: markerShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function GpsMap({ gps }) {
	const { t } = useTranslation();

	if (!gps) {
		return (
			<div className="text-center py-10 text-[var(--color-text-muted)]">
				<Map
					size={40}
					className="mx-auto text-[var(--color-text-muted)] mb-3"
					strokeWidth={1.5}
				/>
				<p>{t('gps.noData')}</p>
			</div>
		);
	}

	const { latitude, longitude, altitude } = gps;
	const position = [latitude, longitude];

	return (
		<div className="animate-fade-slide-in">
			{/* Container do mapa */}
			<div className="w-full h-70 rounded overflow-hidden mb-4 border border-[var(--color-border)]">
				<MapContainer
					center={position}
					zoom={13}
					style={{ height: '100%', width: '100%' }}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={position}>
						<Popup>
							{latitude.toFixed(6)}, {longitude.toFixed(6)}
						</Popup>
					</Marker>
				</MapContainer>
			</div>

			{/* Coordenadas */}
			<div className="flex flex-wrap gap-3 justify-center">
				<span className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--color-surface-hover)] rounded text-sm text-[var(--color-text-secondary)]">
					<MapPin size={14} className="text-[var(--color-accent)]" />
					{t('gps.latitude')}:{' '}
					<strong className="text-[var(--color-text)] font-semibold tabular-nums">
						{latitude.toFixed(6)}
					</strong>
				</span>
				<span className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--color-surface-hover)] rounded text-sm text-[var(--color-text-secondary)]">
					<MapPin size={14} className="text-[var(--color-accent)]" />
					{t('gps.longitude')}:{' '}
					<strong className="text-[var(--color-text)] font-semibold tabular-nums">
						{longitude.toFixed(6)}
					</strong>
				</span>
				{altitude != null && (
					<span className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--color-surface-hover)] rounded text-sm text-[var(--color-text-secondary)]">
						<Mountain size={14} className="text-[var(--color-accent)]" />
						{t('gps.altitude')}:{' '}
						<strong className="text-[var(--color-text)] font-semibold tabular-nums">
							{altitude.toFixed(1)}m
						</strong>
					</span>
				)}
			</div>
			<p className="mt-3 text-xs text-center text-[var(--color-text-muted)]">
				{t('gps.externalMapNotice')}
			</p>
		</div>
	);
}
