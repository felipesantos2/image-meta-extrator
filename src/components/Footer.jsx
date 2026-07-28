import { useTranslation } from 'react-i18next';
import { Heart, Shield } from 'lucide-react';

export default function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="w-full border-t border-[var(--color-border)] text-[var(--color-text-muted)] text-sm tracking-wide mt-auto">
			<div className="w-full max-w-5xl mx-auto px-6 py-10">
				<div className="flex w-full flex-col items-center justify-center gap-3.5 text-center">
					{/* Marca sutil no rodapé */}
					<svg
						className="w-6 h-6 stroke-[var(--color-text-muted)] opacity-30"
						viewBox="0 0 512 512"
						fill="none"
						strokeWidth="32"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M128 160h48l24-32h112l24 32h48c17.7 0 32 14.3 32 32v224c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z" />
						<circle cx="256" cy="304" r="80" />
						<circle
							cx="256"
							cy="304"
							r="40"
							fill="var(--color-text-muted)"
							className="opacity-30"
						/>
						<circle
							cx="380"
							cy="210"
							r="12"
							fill="var(--color-text-muted)"
							className="opacity-30"
							stroke="none"
						/>
					</svg>

					<p className="font-medium text-[var(--color-text-secondary)] text-center leading-relaxed">
						{t('footer.madeWith')}{' '}
						<Heart
							size={13}
							className="text-[var(--color-accent)] fill-[var(--color-accent)] inline-block align-middle mx-1 -translate-y-[1px]"
						/>{' '}
						{t('footer.for')}
					</p>

					<p className="text-xs text-center leading-relaxed">
						<Shield
							size={12}
							className="text-[var(--color-accent)] inline-block align-middle mr-1.5 -translate-y-[1px]"
						/>
						{t('footer.privacy')}
					</p>

					<a
						className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
						href="https://github.com/felipesantos2/image-meta-extrator"
						target="_blank"
						rel="noreferrer"
						aria-label={t('footer.githubLabel')}
					>
						<svg
							className="w-3.5 h-3.5 fill-current"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49v-1.91c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.95a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.79c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
						</svg>
						{t('footer.github')}
					</a>

					<p className="text-[10px] opacity-60 text-center mt-1">
						&copy; {new Date().getFullYear()} Image Meta Analyzer.
					</p>
				</div>
			</div>
		</footer>
	);
}
