<script lang="ts">
	import { onMount } from 'svelte';

	let drips: Array<{ id: number; left: number; delay: number; duration: number }> = [];

	onMount(() => {
		drips = Array.from({ length: 8 }, (_, i) => ({
			id: i,
			left: Math.random() * 100,
			delay: Math.random() * 5,
			duration: 3 + Math.random() * 2
		}));
	});
</script>

<div class="blood-drips-container">
	{#each drips as drip (drip.id)}
		<div
			class="blood-drip"
			style="
				left: {drip.left}%;
				animation-delay: {drip.delay}s;
				animation-duration: {drip.duration}s;
			"
		></div>
	{/each}
</div>

<style>
	.blood-drips-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 2;
		overflow: hidden;
	}

	.blood-drip {
		position: absolute;
		top: -20px;
		width: 2px;
		height: 20px;
		background: linear-gradient(to bottom, transparent 0%, #8b0000 50%, #ff0000 100%);
		animation: drip infinite ease-in;
		opacity: 0.6;
	}

	@keyframes drip {
		0% {
			transform: translateY(0);
			opacity: 0;
		}
		10% {
			opacity: 0.6;
		}
		90% {
			opacity: 0.6;
		}
		100% {
			transform: translateY(100vh);
			opacity: 0;
		}
	}
</style>
