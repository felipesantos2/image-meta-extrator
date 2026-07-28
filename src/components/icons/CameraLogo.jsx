export default function CameraLogo({ className = '', subtleDetails = false }) {
	const detailClassName = subtleDetails ? 'opacity-30' : undefined;

	return (
		<svg
			className={className}
			viewBox="0 0 512 512"
			fill="none"
			stroke="currentColor"
			strokeWidth="32"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M128 160h48l24-32h112l24 32h48c17.7 0 32 14.3 32 32v224c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z" />
			<circle cx="256" cy="304" r="80" />
			<circle cx="256" cy="304" r="40" fill="currentColor" className={detailClassName} />
			<circle
				cx="380"
				cy="210"
				r="12"
				fill="currentColor"
				className={detailClassName}
				stroke="none"
			/>
		</svg>
	);
}
