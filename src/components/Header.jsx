import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

export default function Header({ theme, onToggleTheme }) {
	const { t, i18n } = useTranslation();

	function handleLanguageChange(e) {
		i18n.changeLanguage(e.target.value);
	}

	return (
		<header className="flex items-center justify-between px-6 py-4 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] backdrop-blur-md sticky top-0 z-50">
			{/* Logo e título */}
			<div className="flex items-center gap-3">
				<svg
					className="w-7 h-7 stroke-[var(--color-accent)]"
					viewBox="0 0 512 512"
					fill="none"
					strokeWidth="32"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M128 160h48l24-32h112l24 32h48c17.7 0 32 14.3 32 32v224c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z" />
					<circle cx="256" cy="304" r="80" />
					<circle cx="256" cy="304" r="40" fill="var(--color-accent)" />
					<circle cx="380" cy="210" r="12" fill="var(--color-accent)" stroke="none" />
				</svg>
				<h1 className="text-xl font-semibold tracking-tight text-[var(--color-accent)] font-[var(--font-serif)]">
					{t('app.title')}
				</h1>
			</div>

			{/* Controles: idioma e tema */}
			<div className="flex items-center gap-2">
				<select
					className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-sm text-[var(--color-text)] cursor-pointer hover:border-[var(--color-accent)] transition-colors font-[inherit]"
					value={i18n.language}
					onChange={handleLanguageChange}
					aria-label="Language"
				>
					<option value="pt">PT</option>
					<option value="en">EN</option>
				</select>

				<button
					className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] rounded bg-[var(--color-surface)] text-[var(--color-text-secondary)] cursor-pointer hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all"
					onClick={onToggleTheme}
					aria-label="Toggle theme"
					title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
				>
					{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
				</button>
			</div>
		</header>
	);
}
