<script lang="ts">
	export let show = false;
</script>

{#if show}
	<div class="stitching-overlay">
		<div class="stitch-container">
			<div class="body-part head">
				<div class="part-label">HEAD</div>
				<div class="stitch-line stitch-1"></div>
			</div>
			<div class="lightning-bolt">⚡</div>
			<div class="body-part torso">
				<div class="part-label">TORSO</div>
				<div class="stitch-line stitch-2"></div>
			</div>
			<div class="lightning-bolt">⚡</div>
			<div class="body-part legs">
				<div class="part-label">LEGS</div>
			</div>
		</div>
		<p class="stitch-text">STITCHING BODY PARTS...</p>
	</div>
{/if}

<style>
	.stitching-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(10, 0, 21, 0.95);
		z-index: 9999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease-in;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.stitch-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.body-part {
		width: 200px;
		height: 100px;
		background: linear-gradient(135deg, #240046 0%, #3c096c 100%);
		border: 3px solid #9d4edd;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		animation: slideIn 0.5s ease-out;
	}

	.head {
		animation-delay: 0s;
	}

	.torso {
		animation-delay: 0.5s;
	}

	.legs {
		animation-delay: 1s;
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100vw);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.part-label {
		font-size: 1.5rem;
		font-weight: bold;
		color: #e0aaff;
		text-shadow: 0 0 10px #9d4edd;
	}

	.stitch-line {
		position: absolute;
		bottom: -15px;
		left: 50%;
		transform: translateX(-50%);
		width: 2px;
		height: 30px;
		background: repeating-linear-gradient(
			to bottom,
			#9d4edd 0px,
			#9d4edd 5px,
			transparent 5px,
			transparent 10px
		);
		animation: stitchGrow 0.5s ease-out;
	}

	.stitch-1 {
		animation-delay: 0.5s;
	}

	.stitch-2 {
		animation-delay: 1s;
	}

	@keyframes stitchGrow {
		from {
			height: 0;
		}
		to {
			height: 30px;
		}
	}

	.lightning-bolt {
		font-size: 3rem;
		animation: flash 0.3s ease-in-out 3;
		filter: drop-shadow(0 0 20px #9d4edd);
	}

	.stitch-text {
		margin-top: 2rem;
		font-size: 1.5rem;
		color: #e0aaff;
		text-shadow: 0 0 10px #9d4edd;
		animation: pulse 1s infinite;
		letter-spacing: 3px;
	}
</style>
