import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import CameraLogo from './icons/CameraLogo';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';

export default function Header({ theme, onToggleTheme }) {
	const { t, i18n } = useTranslation();

	useEffect(() => {
		document.documentElement.lang = i18n.language === 'en' ? 'en' : 'pt-BR';
	}, [i18n.language]);

	function handleLanguageChange(e) {
		i18n.changeLanguage(e.target.value);
	}

	return (
		<header className="sticky top-0 z-50 w-full bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] backdrop-blur-md">
			<div className="w-full max-w-5xl mx-auto px-6 py-4">
				<div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 min-h-10">
					{/* Logo e título centralizados */}
					<div className="flex items-center justify-center gap-3 md:col-start-2">
						<CameraLogo className="w-7 h-7 text-[var(--color-accent)] shrink-0" />
						<h1 className="text-xl font-semibold tracking-tight text-[var(--color-accent)] font-[var(--font-serif)] text-center">
							{t('app.title')}
						</h1>
					</div>

					{/* Controles: idioma e tema */}
					<div className="flex items-center justify-center gap-2 md:col-start-3 md:justify-self-end">
						<a
							className="inline-flex items-center justify-center gap-2 h-10 px-2 lg:px-3 border border-[var(--color-accent)] rounded bg-[var(--color-accent-bg)] text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)] transition-colors"
							href="https://github.com/felipesantos2/image-meta-extrator"
							target="_blank"
							rel="noreferrer"
							aria-label={t('controls.githubLabel')}
							title={t('controls.githubLabel')}
						>
							<GithubIcon className="w-4 h-4" />
							<span className="hidden lg:inline text-sm font-medium">GitHub</span>
						</a>

						<a
							className="inline-flex items-center justify-center gap-2 h-10 px-2 lg:px-3 border border-[var(--color-accent)] rounded bg-[var(--color-accent-bg)] text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)] transition-colors"
							href="https://www.linkedin.com/in/felipepinheiro2/"
							target="_blank"
							rel="me noreferrer"
							aria-label={t('controls.linkedinLabel')}
							title={t('controls.linkedinLabel')}
						>
							<LinkedinIcon className="w-4 h-4" />
							<span className="hidden lg:inline text-sm font-medium">LinkedIn</span>
						</a>

						<select
							className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-sm text-[var(--color-text)] cursor-pointer hover:border-[var(--color-accent)] transition-colors font-[inherit]"
							value={i18n.language}
							onChange={handleLanguageChange}
							aria-label={t('controls.language')}
						>
							<option value="pt">PT</option>
							<option value="en">EN</option>
						</select>

						<button
							className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] rounded bg-[var(--color-surface)] text-[var(--color-text-secondary)] cursor-pointer hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all"
							onClick={onToggleTheme}
							aria-label={t('controls.toggleTheme')}
							title={
								theme === 'dark' ? t('controls.lightMode') : t('controls.darkMode')
							}
						>
							{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
