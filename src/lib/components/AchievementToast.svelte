<script lang="ts">
	import { onMount } from 'svelte';
	import type { Achievement } from '$lib/utils/achievements';

	export let achievement: Achievement;
	export let onClose: () => void;

	onMount(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => clearTimeout(timer);
	});
</script>

<div class="achievement-toast">
	<div class="toast-header">
		<span class="achievement-icon">{achievement.icon}</span>
		<span class="achievement-title">Achievement Unlocked!</span>
	</div>
	<div class="toast-body">
		<h3>{achievement.name}</h3>
		<p>{achievement.description}</p>
	</div>
	<button class="close-btn" on:click={onClose}>✕</button>
</div>

<style>
	.achievement-toast {
		position: fixed;
		top: 20px;
		right: 20px;
		width: 320px;
		background: linear-gradient(135deg, #240046 0%, #3c096c 100%);
		border: 3px solid #ffd700;
		border-radius: 10px;
		padding: 1rem;
		z-index: 10000;
		animation: slideInRight 0.5s ease-out, glow 2s ease-in-out infinite;
		box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
	}

	@keyframes slideInRight {
		from {
			transform: translateX(400px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes glow {
		0%,
		100% {
			box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
		}
		50% {
			box-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
		}
	}

	.toast-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.achievement-icon {
		font-size: 2rem;
		animation: bounce 0.5s ease-in-out 3;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.achievement-title {
		font-size: 0.9rem;
		color: #ffd700;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.toast-body h3 {
		margin: 0 0 0.25rem 0;
		color: #e0aaff;
		font-size: 1.1rem;
	}

	.toast-body p {
		margin: 0;
		color: #c77dff;
		font-size: 0.9rem;
	}

	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		background: transparent;
		border: none;
		color: #9d4edd;
		font-size: 1.2rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.close-btn:hover {
		color: #e0aaff;
		transform: scale(1.2);
	}
</style>
