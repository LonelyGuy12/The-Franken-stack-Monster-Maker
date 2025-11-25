<script lang="ts">
	import type { FrankenMonster } from '$lib/types';

	let monster: FrankenMonster | null = null;
	let loading = false;
	let error = '';

	async function summonMonster() {
		loading = true;
		error = '';
		monster = null;

		try {
			const response = await fetch('/api/monster');
			if (!response.ok) {
				throw new Error('Failed to summon monster');
			}
			monster = await response.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unknown error occurred';
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<div class="container">
		<h1 class="title">🧟‍♂️ Franken-Monster Lab 🧟‍♂️</h1>

		<button class="summon-btn" on:click={summonMonster} disabled={loading}>
			{loading ? 'Summoning...' : '⚡ Summon Monster ⚡'}
		</button>

		{#if loading}
			<div class="loading">
				<p class="stitching">Stitching body parts...</p>
				<div class="lightning">⚡⚡⚡</div>
			</div>
		{/if}

		{#if error}
			<div class="error">
				<p>💀 Error: {error}</p>
			</div>
		{/if}

		{#if monster && !loading}
			<div class="monster-container">
				<!-- The Head (Identity) -->
				<div class="head-section">
					<h2 class="section-title">👤 The Head (Identity)</h2>
					<div class="head-content">
						<img src={monster.monster_data.head.picture} alt="Monster Head" class="head-image" />
						<div class="head-info">
							<p><strong>Name:</strong> {monster.monster_data.head.name}</p>
							<p><strong>Gender:</strong> {monster.monster_data.head.gender}</p>
							<p><strong>Email:</strong> {monster.monster_data.head.email}</p>
							<p><strong>Location:</strong> {monster.monster_data.head.location}</p>
						</div>
					</div>
				</div>

				<!-- The Torso (Power) -->
				<div class="torso-section">
					<h2 class="section-title">💪 The Torso (Power)</h2>
					<div class="torso-content">
						<h3 class="pokemon-name">{monster.monster_data.torso.pokemon_name.toUpperCase()}</h3>
						<p class="pokemon-id">Pokémon #{monster.monster_data.torso.pokemon_id}</p>
						<div class="stats-grid">
							<div class="stat">
								<span class="stat-label">HP</span>
								<span class="stat-value">{monster.monster_data.torso.hp}</span>
							</div>
							<div class="stat">
								<span class="stat-label">Attack</span>
								<span class="stat-value">{monster.monster_data.torso.attack}</span>
							</div>
							<div class="stat">
								<span class="stat-label">Defense</span>
								<span class="stat-value">{monster.monster_data.torso.defense}</span>
							</div>
							<div class="stat">
								<span class="stat-label">Speed</span>
								<span class="stat-value">{monster.monster_data.torso.speed}</span>
							</div>
						</div>
						<div class="total-power">
							<strong>Total Power:</strong>
							{monster.monster_data.torso.total_power}
						</div>
					</div>
				</div>

				<!-- The Legs (Story) -->
				<div class="legs-section">
					<h2 class="section-title">👻 The Legs (Story)</h2>
					<div class="legs-content">
						<p class="spooky-fact">{monster.monster_data.legs.spooky_fact}</p>
					</div>
				</div>

				<!-- Monster Metadata -->
				<div class="metadata">
					<p><strong>Monster ID:</strong> {monster.monster_id}</p>
					<p><strong>Assembled:</strong> {new Date(monster.assembled_at).toLocaleString()}</p>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #1a1a1a;
		color: #00ff00;
		font-family: 'Courier New', monospace;
	}

	main {
		min-height: 100vh;
		padding: 2rem;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
	}

	.title {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
		animation: flicker 3s infinite;
	}

	@keyframes flicker {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.8;
		}
	}

	.summon-btn {
		display: block;
		margin: 0 auto 2rem;
		padding: 1rem 2rem;
		font-size: 1.2rem;
		font-weight: bold;
		background-color: #000;
		color: #00ff00;
		border: 3px solid #00ff00;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Courier New', monospace;
		clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
	}

	.summon-btn:hover:not(:disabled) {
		background-color: #00ff00;
		color: #000;
		box-shadow: 0 0 20px #00ff00;
		transform: scale(1.05);
	}

	.summon-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading {
		text-align: center;
		padding: 2rem;
	}

	.stitching {
		font-size: 1.5rem;
		animation: pulse 1s infinite;
	}

	.lightning {
		font-size: 2rem;
		margin-top: 1rem;
		animation: flash 0.5s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@keyframes flash {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	.error {
		text-align: center;
		padding: 1rem;
		background-color: #330000;
		border: 2px solid #ff0000;
		color: #ff0000;
		margin: 1rem 0;
	}

	.monster-container {
		margin-top: 2rem;
	}

	.head-section,
	.torso-section,
	.legs-section {
		background-color: #0d0d0d;
		border: 3px solid #00ff00;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		clip-path: polygon(
			0% 5%,
			5% 0%,
			95% 0%,
			100% 5%,
			100% 95%,
			95% 100%,
			5% 100%,
			0% 95%
		);
	}

	.section-title {
		text-align: center;
		font-size: 1.5rem;
		margin-bottom: 1rem;
		text-shadow: 0 0 5px #00ff00;
	}

	.head-content {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.head-image {
		width: 150px;
		height: 150px;
		border: 3px solid #00ff00;
		border-radius: 50%;
		box-shadow: 0 0 15px #00ff00;
	}

	.head-info {
		flex: 1;
		min-width: 200px;
	}

	.head-info p {
		margin: 0.5rem 0;
	}

	.torso-content {
		text-align: center;
	}

	.pokemon-name {
		font-size: 2rem;
		margin: 0.5rem 0;
		text-shadow: 0 0 10px #00ff00;
	}

	.pokemon-id {
		font-size: 1rem;
		opacity: 0.8;
		margin-bottom: 1rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem;
		border: 2px solid #00ff00;
		background-color: #000;
	}

	.stat-label {
		font-size: 0.9rem;
		opacity: 0.8;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 0.25rem;
	}

	.total-power {
		font-size: 1.2rem;
		margin-top: 1rem;
		padding: 0.5rem;
		border: 2px solid #00ff00;
		background-color: #000;
	}

	.legs-content {
		text-align: center;
	}

	.spooky-fact {
		font-size: 1.1rem;
		line-height: 1.6;
		font-style: italic;
	}

	.metadata {
		text-align: center;
		padding: 1rem;
		opacity: 0.7;
		font-size: 0.9rem;
	}

	.metadata p {
		margin: 0.25rem 0;
	}
</style>
