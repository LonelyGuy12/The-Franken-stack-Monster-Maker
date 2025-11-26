<script lang="ts">
	import { onMount } from 'svelte';

	let particles: Array<{ id: number; x: number; y: number; delay: number; duration: number }> = [];

	onMount(() => {
		// Generate 30 floating particles
		particles = Array.from({ length: 30 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: Math.random() * 5,
			duration: 10 + Math.random() * 10
		}));
	});
</script>

<div class="particle-container">
	{#each particles as particle (particle.id)}
		<div
			class="particle"
			style="
				left: {particle.x}%;
				top: {particle.y}%;
				animation-delay: {particle.delay}s;
				animation-duration: {particle.duration}s;
			"
		></div>
	{/each}
</div>

<style>
	.particle-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 5;
		overflow: hidden;
	}

	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: radial-gradient(circle, #c77dff 0%, transparent 70%);
		border-radius: 50%;
		animation: float-particle infinite ease-in-out;
		opacity: 0;
	}

	@keyframes float-particle {
		0% {
			transform: translateY(0) translateX(0) scale(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(-100vh) translateX(50px) scale(1.5);
			opacity: 0;
		}
	}
</style>
