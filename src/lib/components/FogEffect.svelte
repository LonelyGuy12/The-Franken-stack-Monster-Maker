<div class="fog-container">
	<div class="fog fog-1"></div>
	<div class="fog fog-2"></div>
	<div class="fog fog-3"></div>
</div>

<style>
	.fog-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 4;
		overflow: hidden;
	}

	.fog {
		position: absolute;
		width: 200%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(157, 78, 221, 0.1) 25%,
			rgba(199, 125, 255, 0.15) 50%,
			rgba(157, 78, 221, 0.1) 75%,
			transparent 100%
		);
		opacity: 0.3;
	}

	.fog-1 {
		bottom: 0;
		animation: drift 30s linear infinite;
	}

	.fog-2 {
		bottom: 20%;
		animation: drift 40s linear infinite reverse;
		animation-delay: -10s;
	}

	.fog-3 {
		bottom: 40%;
		animation: drift 50s linear infinite;
		animation-delay: -20s;
	}

	@keyframes drift {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0%);
		}
	}
</style>
