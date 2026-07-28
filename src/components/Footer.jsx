import { useTranslation } from 'react-i18next';
import { Heart, Shield } from 'lucide-react';

export default function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="py-10 px-4 mt-auto border-t border-[var(--color-border)] text-[var(--color-text-muted)] text-sm tracking-wide">
			<div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
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
					{t('footer.madeWith')}
					<Heart
						size={13}
						className="text-[var(--color-accent)] fill-[var(--color-accent)] inline-block align-middle mx-1"
					/>
					{t('footer.for')}
				</p>

				<p className="text-xs text-center leading-relaxed">
					<Shield
						size={12}
						className="text-[var(--color-accent)] inline-block align-middle mr-1"
					/>
					{t('footer.privacy').replace(/🔒\s*/, '')}
				</p>

				<p className="text-[10px] opacity-60 text-center mt-1">
					&copy; {new Date().getFullYear()} Image Meta Analyzer.
				</p>
			</div>
		</footer>
	);
}
