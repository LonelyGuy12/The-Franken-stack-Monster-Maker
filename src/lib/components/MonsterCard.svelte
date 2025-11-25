<script lang="ts">
	import type { FrankenMonster } from '$lib/types';

	export let monster: any; // MonsterWithMetadata
	export let compact = false;

	const rarityColors = {
		common: '#808080',
		rare: '#4169e1',
		epic: '#9d4edd',
		legendary: '#ffd700',
		cursed: '#ff006e'
	};
</script>

<div class="monster-card {compact ? 'compact' : ''}" style="--rarity-color: {rarityColors[monster.rarity || 'common']}">
	<div class="card-header">
		<h3 class="monster-name">{monster.name || 'Unnamed Monster'}</h3>
		<span class="rarity-badge {monster.rarity}">{monster.rarity?.toUpperCase()}</span>
	</div>
	
	{#if !compact}
		<div class="card-body">
			<img src={monster.monster_data.head.picture} alt="Monster" class="card-image" />
			<div class="card-stats">
				<p><strong>Power:</strong> {monster.monster_data.torso.total_power}</p>
				<p><strong>Pokemon:</strong> {monster.monster_data.torso.pokemon_name}</p>
			</div>
			{#if monster.personality}
				<div class="personality">
					{#each monster.personality as trait}
						<span class="trait-badge">{trait}</span>
					{/each}
				</div>
			{/if}
			{#if monster.curse}
				<p class="curse">⚠️ {monster.curse}</p>
			{/if}
		</div>
	{:else}
		<div class="compact-body">
			<img src={monster.monster_data.head.picture} alt="Monster" class="compact-image" />
			<span class="compact-power">{monster.monster_data.torso.total_power}</span>
		</div>
	{/if}
</div>

<style>
	.monster-card {
		background: linear-gradient(135deg, rgba(36, 0, 70, 0.8) 0%, rgba(16, 0, 43, 0.9) 100%);
		border: 2px solid var(--rarity-color);
		border-radius: 10px;
		padding: 1rem;
		box-shadow: 0 0 20px var(--rarity-color);
		transition: all 0.3s ease;
	}

	.monster-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 0 30px var(--rarity-color);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.monster-name {
		font-size: 1.2rem;
		color: #e0aaff;
		margin: 0;
	}

	.rarity-badge {
		padding: 0.25rem 0.5rem;
		border-radius: 5px;
		font-size: 0.7rem;
		font-weight: bold;
		background: var(--rarity-color);
		color: #000;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.card-image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 2px solid var(--rarity-color);
		margin: 0 auto;
	}

	.card-stats {
		font-size: 0.9rem;
	}

	.personality {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.trait-badge {
		padding: 0.2rem 0.5rem;
		background: rgba(157, 78, 221, 0.3);
		border: 1px solid #9d4edd;
		border-radius: 5px;
		font-size: 0.8rem;
	}

	.curse {
		color: #ff006e;
		font-size: 0.85rem;
		font-style: italic;
		margin-top: 0.5rem;
	}

	.compact {
		padding: 0.5rem;
	}

	.compact-body {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.compact-image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid var(--rarity-color);
	}

	.compact-power {
		font-weight: bold;
		color: var(--rarity-color);
	}
</style>
