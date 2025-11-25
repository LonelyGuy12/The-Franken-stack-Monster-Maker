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
		background: linear-gradient(135deg, #0a0015 0%, #1a0033 50%, #0a0015 100%);
		color: #c77dff;
		font-family: 'Courier New', monospace;
		background-attachment: fixed;
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
		color: #e0aaff;
		text-shadow: 0 0 10px #9d4edd, 0 0 20px #7b2cbf, 0 0 30px #5a189a;
		animation: flicker 3s infinite, float 4s ease-in-out infinite;
		letter-spacing: 2px;
	}

	@keyframes flicker {
		0%,
		100% {
			opacity: 1;
			text-shadow: 0 0 10px #9d4edd, 0 0 20px #7b2cbf, 0 0 30px #5a189a;
		}
		50% {
			opacity: 0.85;
			text-shadow: 0 0 5px #9d4edd, 0 0 10px #7b2cbf;
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	.summon-btn {
		display: block;
		margin: 0 auto 2rem;
		padding: 1rem 2rem;
		font-size: 1.2rem;
		font-weight: bold;
		background: linear-gradient(135deg, #240046 0%, #3c096c 100%);
		color: #e0aaff;
		border: 3px solid #9d4edd;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Courier New', monospace;
		clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
		box-shadow: 0 0 15px rgba(157, 78, 221, 0.3);
	}

	.summon-btn:hover:not(:disabled) {
		background: linear-gradient(135deg, #9d4edd 0%, #c77dff 100%);
		color: #10002b;
		box-shadow: 0 0 30px #9d4edd, 0 0 50px rgba(157, 78, 221, 0.5);
		transform: scale(1.05) rotate(-1deg);
	}

	.summon-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading {
		text-align: center;
		padding: 2rem;
		background: linear-gradient(135deg, rgba(60, 9, 108, 0.3) 0%, rgba(36, 0, 70, 0.3) 100%);
		border: 2px solid #9d4edd;
		border-radius: 10px;
		box-shadow: 0 0 30px rgba(157, 78, 221, 0.4);
	}

	.stitching {
		font-size: 1.5rem;
		color: #e0aaff;
		text-shadow: 0 0 10px #9d4edd;
		animation: pulse 1s infinite;
	}

	.lightning {
		font-size: 2rem;
		margin-top: 1rem;
		color: #c77dff;
		animation: flash 0.5s infinite;
		filter: drop-shadow(0 0 10px #9d4edd);
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.05);
		}
	}

	@keyframes flash {
		0%,
		100% {
			opacity: 1;
			filter: drop-shadow(0 0 10px #9d4edd);
		}
		50% {
			opacity: 0.4;
			filter: drop-shadow(0 0 20px #c77dff);
		}
	}

	.error {
		text-align: center;
		padding: 1rem;
		background: linear-gradient(135deg, #330011 0%, #1a0008 100%);
		border: 2px solid #ff006e;
		color: #ff006e;
		margin: 1rem 0;
		box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
		animation: shake 0.5s ease-in-out;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}

	.monster-container {
		margin-top: 2rem;
	}

	.head-section,
	.torso-section,
	.legs-section {
		background: linear-gradient(135deg, rgba(36, 0, 70, 0.6) 0%, rgba(16, 0, 43, 0.8) 100%);
		border: 3px solid #9d4edd;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		clip-path: polygon(
			0% 5%,
			3% 0%,
			8% 2%,
			12% 0%,
			88% 0%,
			92% 2%,
			97% 0%,
			100% 5%,
			98% 8%,
			100% 12%,
			100% 88%,
			98% 92%,
			100% 95%,
			97% 100%,
			92% 98%,
			88% 100%,
			12% 100%,
			8% 98%,
			3% 100%,
			0% 95%,
			2% 92%,
			0% 88%,
			0% 12%,
			2% 8%
		);
		box-shadow: 0 0 20px rgba(157, 78, 221, 0.3), inset 0 0 30px rgba(157, 78, 221, 0.1);
		transition: all 0.3s ease;
	}

	.head-section:hover,
	.torso-section:hover,
	.legs-section:hover {
		box-shadow: 0 0 30px rgba(157, 78, 221, 0.5), inset 0 0 40px rgba(157, 78, 221, 0.15);
		transform: translateY(-2px);
	}

	.section-title {
		text-align: center;
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #e0aaff;
		text-shadow: 0 0 10px #9d4edd, 0 0 20px #7b2cbf;
		letter-spacing: 1px;
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
		border: 3px solid #9d4edd;
		border-radius: 50%;
		box-shadow: 0 0 20px #9d4edd, 0 0 40px rgba(157, 78, 221, 0.4);
		transition: all 0.3s ease;
		filter: saturate(1.2) contrast(1.1);
	}

	.head-image:hover {
		box-shadow: 0 0 30px #c77dff, 0 0 60px rgba(199, 125, 255, 0.5);
		transform: scale(1.05);
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
		color: #e0aaff;
		text-shadow: 0 0 10px #9d4edd, 0 0 20px #7b2cbf;
		animation: pulse 2s ease-in-out infinite;
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
		border: 2px solid #9d4edd;
		background: linear-gradient(135deg, #10002b 0%, #240046 100%);
		box-shadow: 0 0 10px rgba(157, 78, 221, 0.3);
		transition: all 0.3s ease;
	}

	.stat:hover {
		box-shadow: 0 0 20px rgba(157, 78, 221, 0.6);
		transform: translateY(-2px);
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
		border: 2px solid #9d4edd;
		background: linear-gradient(135deg, #10002b 0%, #240046 100%);
		box-shadow: 0 0 15px rgba(157, 78, 221, 0.4);
		color: #e0aaff;
	}

	.legs-section {
		color: #c77dff;
		background: linear-gradient(135deg, rgba(60, 9, 108, 0.6) 0%, rgba(36, 0, 70, 0.8) 100%);
	}

	.legs-section .section-title {
		color: #e0aaff;
		text-shadow: 0 0 10px #c77dff, 0 0 20px #9d4edd;
	}

	.legs-content {
		text-align: center;
		position: relative;
	}

	.spooky-fact {
		font-size: 1.1rem;
		line-height: 1.6;
		font-style: italic;
		color: #e0aaff;
		text-shadow: 0 0 8px #9d4edd, 0 0 15px rgba(157, 78, 221, 0.5);
		animation: ghostly 3s ease-in-out infinite;
	}

	@keyframes ghostly {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.9;
		}
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
