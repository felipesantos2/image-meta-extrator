import { useTranslation } from 'react-i18next';
import { Camera, Clock3, Download, FileImage, MapPin, ScanSearch, ShieldCheck } from 'lucide-react';

export default function ContentGuide() {
	const { t } = useTranslation();

	const steps = [
		{
			title: t('guide.steps.select.title'),
			description: t('guide.steps.select.description'),
			Icon: FileImage,
		},
		{
			title: t('guide.steps.analyze.title'),
			description: t('guide.steps.analyze.description'),
			Icon: ScanSearch,
		},
		{
			title: t('guide.steps.export.title'),
			description: t('guide.steps.export.description'),
			Icon: Download,
		},
	];

	const metadataTypes = [
		{
			title: t('guide.metadata.camera.title'),
			description: t('guide.metadata.camera.description'),
			Icon: Camera,
		},
		{
			title: t('guide.metadata.datetime.title'),
			description: t('guide.metadata.datetime.description'),
			Icon: Clock3,
		},
		{
			title: t('guide.metadata.location.title'),
			description: t('guide.metadata.location.description'),
			Icon: MapPin,
		},
	];

	return (
		<div className="mt-8 border-t border-[var(--color-border)] pt-16 pb-8">
			<section id="como-funciona" className="scroll-mt-28" aria-labelledby="how-title">
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
						{t('guide.eyebrow')}
					</p>
					<h2
						id="how-title"
						className="mt-3 text-3xl font-semibold font-[var(--font-serif)] text-[var(--color-text)]"
					>
						{t('guide.title')}
					</h2>
					<p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)]">
						{t('guide.introduction')}
					</p>
				</div>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
					{steps.map(({ title, description, Icon }, index) => (
						<article
							key={title}
							className="p-5 rounded border border-[var(--color-border)] bg-[var(--color-surface)]"
						>
							<div className="flex items-center justify-between">
								<Icon size={22} className="text-[var(--color-accent)]" />
								<span className="text-xs font-semibold text-[var(--color-text-muted)]">
									{String(index + 1).padStart(2, '0')}
								</span>
							</div>
							<h3 className="mt-5 font-semibold text-[var(--color-text)]">{title}</h3>
							<p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
								{description}
							</p>
						</article>
					))}
				</div>
			</section>

			<section
				id="guia-metadados"
				className="scroll-mt-28 mt-20"
				aria-labelledby="metadata-guide-title"
			>
				<div className="max-w-3xl">
					<h2
						id="metadata-guide-title"
						className="text-3xl font-semibold font-[var(--font-serif)] text-[var(--color-text)]"
					>
						{t('guide.metadata.title')}
					</h2>
					<p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)]">
						{t('guide.metadata.introduction')}
					</p>
				</div>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
					{metadataTypes.map(({ title, description, Icon }) => (
						<article
							key={title}
							className="p-5 rounded border border-[var(--color-border)]"
						>
							<Icon size={22} className="text-[var(--color-accent)]" />
							<h3 className="mt-4 font-semibold text-[var(--color-text)]">{title}</h3>
							<p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
								{description}
							</p>
						</article>
					))}
				</div>

				<div className="mt-6 p-6 rounded border border-[var(--color-border)] bg-[var(--color-accent-bg)]">
					<h3 className="font-semibold text-[var(--color-text)]">
						{t('guide.metadata.limits.title')}
					</h3>
					<p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
						{t('guide.metadata.limits.description')}
					</p>
				</div>
			</section>

			<section
				id="privacidade"
				className="scroll-mt-28 mt-20 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 p-6 md:p-8 rounded border border-[var(--color-border)] bg-[var(--color-surface)]"
				aria-labelledby="privacy-title"
			>
				<ShieldCheck size={36} className="text-[var(--color-accent)]" />
				<div>
					<h2
						id="privacy-title"
						className="text-2xl font-semibold font-[var(--font-serif)] text-[var(--color-text)]"
					>
						{t('guide.privacy.title')}
					</h2>
					<p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
						{t('guide.privacy.description')}
					</p>
					<p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
						{t('guide.privacy.mapNotice')}
					</p>
					<a
						className="inline-flex mt-5 text-sm font-semibold text-[var(--color-accent)] hover:underline"
						href="/privacy.html"
					>
						{t('guide.privacy.link')}
					</a>
				</div>
			</section>

			<section id="sobre" className="scroll-mt-28 mt-20" aria-labelledby="about-title">
				<div className="max-w-3xl">
					<h2
						id="about-title"
						className="text-3xl font-semibold font-[var(--font-serif)] text-[var(--color-text)]"
					>
						{t('guide.about.title')}
					</h2>
					<p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)]">
						{t('guide.about.description')}
					</p>
					<p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)]">
						{t('guide.about.contact')}
					</p>
					<a
						className="inline-flex mt-5 text-sm font-semibold text-[var(--color-accent)] hover:underline"
						href="https://github.com/felipesantos2/image-meta-extrator/issues"
						target="_blank"
						rel="noreferrer"
					>
						{t('guide.about.contactLink')}
					</a>
				</div>
			</section>
		</div>
	);
}
