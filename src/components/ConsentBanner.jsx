import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CONSENT_KEY = 'image-meta-google-consent';

export default function ConsentBanner() {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(() => !localStorage.getItem(CONSENT_KEY));

	useEffect(() => {
		function openSettings() {
			setVisible(true);
		}

		window.addEventListener('open-consent-settings', openSettings);
		return () => window.removeEventListener('open-consent-settings', openSettings);
	}, []);

	function saveConsent(granted) {
		const value = granted ? 'granted' : 'denied';

		localStorage.setItem(CONSENT_KEY, granted ? 'accepted' : 'rejected');
		window.gtag?.('consent', 'update', {
			ad_storage: value,
			ad_user_data: value,
			ad_personalization: value,
			analytics_storage: value,
		});
		setVisible(false);
	}

	if (!visible) return null;

	return (
		<aside
			className="fixed inset-x-4 bottom-4 z-[1000] max-w-2xl mx-auto p-4 md:p-5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
			aria-labelledby="consent-title"
		>
			<h2 id="consent-title" className="font-semibold text-[var(--color-text)]">
				{t('consent.title')}
			</h2>
			<p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
				{t('consent.description')}{' '}
				<a className="text-[var(--color-accent)] hover:underline" href="/privacy.html">
					{t('consent.policy')}
				</a>
			</p>
			<div className="mt-4 flex flex-wrap gap-3">
				<button
					className="px-4 py-2 rounded bg-[var(--color-accent)] text-white text-sm font-medium cursor-pointer"
					type="button"
					onClick={() => saveConsent(true)}
				>
					{t('consent.accept')}
				</button>
				<button
					className="px-4 py-2 rounded border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] cursor-pointer hover:border-[var(--color-accent)]"
					type="button"
					onClick={() => saveConsent(false)}
				>
					{t('consent.reject')}
				</button>
			</div>
		</aside>
	);
}
