<script lang="ts">
	export let monster1: any;
	export let monster2: any;
	export let onClose: () => void;

	function calculateWinner() {
		const power1 = monster1.monster_data.torso.total_power;
		const power2 = monster2.monster_data.torso.total_power;

		if (power1 > power2) return 1;
		if (power2 > power1) return 2;
		return 0; // Tie
	}

	const winner = calculateWinner();
</script>

<div class="battle-overlay">
	<div class="battle-container">
		<h2 class="battle-title">⚔️ MONSTER BATTLE ⚔️</h2>

		<div class="battle-arena">
			<div class="monster-fighter {winner === 1 ? 'winner' : winner === 2 ? 'loser' : 'tie'}">
				<img src={monster1.monster_data.head.picture} alt="Monster 1" class="fighter-image" />
				<h3>{monster1.name}</h3>
				<div class="power-display">
					<span class="power-label">Power:</span>
					<span class="power-value">{monster1.monster_data.torso.total_power}</span>
				</div>
				<div class="stats-mini">
					<div>HP: {monster1.monster_data.torso.hp}</div>
					<div>ATK: {monster1.monster_data.torso.attack}</div>
					<div>DEF: {monster1.monster_data.torso.defense}</div>
					<div>SPD: {monster1.monster_data.torso.speed}</div>
				</div>
			</div>

			<div class="vs-divider">
				<span class="vs-text">VS</span>
				<div class="lightning-strike">⚡</div>
			</div>

			<div class="monster-fighter {winner === 2 ? 'winner' : winner === 1 ? 'loser' : 'tie'}">
				<img src={monster2.monster_data.head.picture} alt="Monster 2" class="fighter-image" />
				<h3>{monster2.name}</h3>
				<div class="power-display">
					<span class="power-label">Power:</span>
					<span class="power-value">{monster2.monster_data.torso.total_power}</span>
				</div>
				<div class="stats-mini">
					<div>HP: {monster2.monster_data.torso.hp}</div>
					<div>ATK: {monster2.monster_data.torso.attack}</div>
					<div>DEF: {monster2.monster_data.torso.defense}</div>
					<div>SPD: {monster2.monster_data.torso.speed}</div>
				</div>
			</div>
		</div>

		<div class="battle-result">
			{#if winner === 0}
				<h3 class="result-text tie">IT'S A TIE!</h3>
				<p>Both monsters are equally powerful!</p>
			{:else}
				<h3 class="result-text">
					{winner === 1 ? monster1.name : monster2.name} WINS!
				</h3>
				<p>Victory through superior power!</p>
			{/if}
		</div>

		<button class="close-battle-btn" on:click={onClose}>Close Battle</button>
	</div>
</div>

<style>
	.battle-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(10, 0, 21, 0.95);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		overflow-y: auto;
	}

	.battle-container {
		max-width: 900px;
		width: 100%;
		background: linear-gradient(135deg, #240046 0%, #3c096c 100%);
		border: 3px solid #9d4edd;
		border-radius: 15px;
		padding: 2rem;
		box-shadow: 0 0 50px rgba(157, 78, 221, 0.5);
	}

	.battle-title {
		text-align: center;
		font-size: 2.5rem;
		color: #e0aaff;
		text-shadow: 0 0 20px #9d4edd;
		margin-bottom: 2rem;
		animation: pulse 2s infinite;
	}

	.battle-arena {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
		align-items: center;
	}

	.monster-fighter {
		background: linear-gradient(135deg, rgba(16, 0, 43, 0.8) 0%, rgba(36, 0, 70, 0.6) 100%);
		border: 3px solid #9d4edd;
		border-radius: 10px;
		padding: 1.5rem;
		text-align: center;
		transition: all 0.5s ease;
	}

	.monster-fighter.winner {
		border-color: #ffd700;
		box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
		transform: scale(1.05);
	}

	.monster-fighter.loser {
		opacity: 0.6;
		transform: scale(0.95);
	}

	.fighter-image {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		border: 3px solid #9d4edd;
		margin-bottom: 1rem;
	}

	.monster-fighter.winner .fighter-image {
		border-color: #ffd700;
		box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
	}

	.monster-fighter h3 {
		color: #e0aaff;
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}

	.power-display {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	.power-label {
		color: #c77dff;
	}

	.power-value {
		color: #e0aaff;
		font-weight: bold;
		text-shadow: 0 0 10px #9d4edd;
	}

	.stats-mini {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		font-size: 0.9rem;
		color: #c77dff;
	}

	.vs-divider {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.vs-text {
		font-size: 3rem;
		font-weight: bold;
		color: #e0aaff;
		text-shadow: 0 0 20px #9d4edd;
		animation: pulse 1s infinite;
	}

	.lightning-strike {
		font-size: 4rem;
		animation: flash 0.5s infinite;
		filter: drop-shadow(0 0 20px #9d4edd);
	}

	.battle-result {
		text-align: center;
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(60, 9, 108, 0.4) 0%, rgba(36, 0, 70, 0.6) 100%);
		border: 2px solid #9d4edd;
		border-radius: 10px;
		margin-bottom: 1.5rem;
	}

	.result-text {
		font-size: 2rem;
		color: #ffd700;
		text-shadow: 0 0 20px #ffd700;
		margin-bottom: 0.5rem;
		animation: glow 1s ease-in-out infinite;
	}

	.result-text.tie {
		color: #9d4edd;
		text-shadow: 0 0 20px #9d4edd;
	}

	@keyframes glow {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	.battle-result p {
		color: #c77dff;
		font-size: 1.1rem;
	}

	.close-battle-btn {
		display: block;
		margin: 0 auto;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, #240046 0%, #3c096c 100%);
		border: 3px solid #9d4edd;
		color: #e0aaff;
		font-size: 1.1rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
		border-radius: 5px;
		font-family: 'Courier New', monospace;
	}

	.close-battle-btn:hover {
		background: linear-gradient(135deg, #9d4edd 0%, #c77dff 100%);
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		.battle-arena {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.vs-divider {
			transform: rotate(90deg);
		}
	}
</style>
