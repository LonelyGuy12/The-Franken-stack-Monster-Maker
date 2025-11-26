<div class="cobwebs-container">
	<div class="cobweb cobweb-top-left">
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M 0 0 L 50 50 M 0 20 L 50 50 M 0 40 L 50 50 M 20 0 L 50 50 M 40 0 L 50 50"
				stroke="#9d4edd"
				stroke-width="0.5"
				fill="none"
				opacity="0.3"
			/>
			<circle cx="50" cy="50" r="2" fill="#9d4edd" opacity="0.5" />
		</svg>
		<div class="spider">🕷️</div>
	</div>

	<div class="cobweb cobweb-top-right">
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M 100 0 L 50 50 M 100 20 L 50 50 M 100 40 L 50 50 M 80 0 L 50 50 M 60 0 L 50 50"
				stroke="#9d4edd"
				stroke-width="0.5"
				fill="none"
				opacity="0.3"
			/>
			<circle cx="50" cy="50" r="2" fill="#9d4edd" opacity="0.5" />
		</svg>
	</div>
</div>

<style>
	.cobwebs-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 3;
	}

	.cobweb {
		position: absolute;
		width: 150px;
		height: 150px;
	}

	.cobweb-top-left {
		top: 0;
		left: 0;
	}

	.cobweb-top-right {
		top: 0;
		right: 0;
	}

	.cobweb svg {
		width: 100%;
		height: 100%;
		filter: drop-shadow(0 0 5px rgba(157, 78, 221, 0.3));
	}

	.spider {
		position: absolute;
		top: 50px;
		left: 50px;
		font-size: 1.5rem;
		animation: swing 3s ease-in-out infinite;
		transform-origin: top center;
	}

	@keyframes swing {
		0%,
		100% {
			transform: rotate(-5deg);
		}
		50% {
			transform: rotate(5deg);
		}
	}
</style>
