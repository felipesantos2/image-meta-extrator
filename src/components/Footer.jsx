import { useTranslation } from 'react-i18next';
import { Heart, Shield } from 'lucide-react';
import CameraLogo from './icons/CameraLogo';

export default function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="w-full border-t border-[var(--color-border)] text-[var(--color-text-muted)] text-sm tracking-wide mt-auto">
			<div className="w-full max-w-5xl mx-auto px-6 py-10">
				<div className="flex w-full flex-col items-center justify-center gap-3.5 text-center">
					{/* Marca sutil no rodapé */}
					<CameraLogo
						className="w-6 h-6 text-[var(--color-text-muted)] opacity-30"
						subtleDetails
					/>

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
						className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
						href="/privacy.html"
					>
						{t('footer.privacyPolicy')}
					</a>
					<button
						className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
						type="button"
						onClick={() => window.dispatchEvent(new Event('open-consent-settings'))}
					>
						{t('footer.cookieSettings')}
					</button>

					<nav
						className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs"
						aria-label={t('navigation.footer')}
					>
						<a className="hover:text-[var(--color-accent)]" href="/#como-funciona">
							{t('navigation.howItWorks')}
						</a>
						<a className="hover:text-[var(--color-accent)]" href="/#guia-metadados">
							{t('navigation.metadata')}
						</a>
						<a className="hover:text-[var(--color-accent)]" href="/#sobre">
							{t('navigation.about')}
						</a>
					</nav>

					<p className="text-[10px] opacity-60 text-center mt-1">
						&copy; {new Date().getFullYear()} Image Meta Analyzer.
					</p>
				</div>
			</div>
		</footer>
	);
}
