<script lang="ts">
	import { onMount } from 'svelte';
	import type { FrankenMonster } from '$lib/types';
	import { monsterCollection } from '$lib/stores/monsterStore';
	import {
		calculateRarity,
		generateBackstory,
		generatePersonality,
		generateCurse,
		generateMonsterName
	} from '$lib/utils/monsterEnhancer';
	import ParticleSystem from '$lib/components/ParticleSystem.svelte';
	import FogEffect from '$lib/components/FogEffect.svelte';
	import MonsterCard from '$lib/components/MonsterCard.svelte';

	let monster: any = null;
	let loading = false;
	let error = '';
	let witchElement: HTMLImageElement;
	let showGallery = false;
	let retryCount = 0;
	let customName = '';
	let showNameInput = false;

	// Sound effects (placeholder - would need actual audio files)
	function playSound(type: 'summon' | 'thunder' | 'witch') {
		// Placeholder for sound effects
		console.log(`Playing ${type} sound`);
	}

	async function summonMonster() {
		loading = true;
		error = '';
		monster = null;
		retryCount = 0;
		showNameInput = false;

		playSound('summon');

		try {
			const response = await fetch('/api/monster');
			if (!response.ok) {
				throw new Error('Failed to summon monster');
			}
			const baseMonster = await response.json();

			// Enhance monster with metadata
			const rarity = calculateRarity(baseMonster);
			const backstory = generateBackstory(baseMonster);
			const personality = generatePersonality(baseMonster);
			const curse = generateCurse(baseMonster);
			const name = generateMonsterName(baseMonster);

			monster = {
				...baseMonster,
				name,
				rarity,
				backstory,
				personality,
				curse
			};

			// Add to collection
			monsterCollection.addMonster(monster);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unknown error occurred';
			// Auto-retry once
			if (retryCount < 1) {
				retryCount++;
				setTimeout(() => summonMonster(), 2000);
			}
		} finally {
			loading = false;
		}
	}

	function saveMonsterName() {
		if (customName.trim() && monster) {
			monster.name = customName.trim();
			monsterCollection.addMonster(monster);
			showNameInput = false;
			customName = '';
		}
	}

	function downloadMonsterCard() {
		// Placeholder for download functionality
		alert('Monster card download feature coming soon!');
	}

	function shareMonster() {
		const url = `${window.location.origin}?monster=${monster.monster_id}`;
		navigator.clipboard.writeText(url);
		alert('Monster link copied to clipboard!');
	}

	function randomizeWitchPath() {
		if (!witchElement) return;

		const startY = Math.random() * 60 + 10;
		const endY = Math.random() * 60 + 10;
		const midY1 = Math.random() * 60 + 10;
		const midY2 = Math.random() * 60 + 10;
		const duration = Math.random() * 5 + 12;

		witchElement.style.setProperty('--start-y', `${startY}%`);
		witchElement.style.setProperty('--mid-y1', `${midY1}%`);
		witchElement.style.setProperty('--mid-y2', `${midY2}%`);
		witchElement.style.setProperty('--end-y', `${endY}%`);
		witchElement.style.animationDuration = `${duration}s`;
	}

	function handleWitchClick() {
		playSound('witch');
		// Make witch spin
		if (witchElement) {
			witchElement.style.animation = 'none';
			setTimeout(() => {
				witchElement.style.animation = '';
				randomizeWitchPath();
			}, 10);
		}
	}

	function handlePumpkinClick(side: 'left' | 'right') {
		// Pumpkin explosion effect
		const pumpkin = document.querySelector(`.pumpkin-${side}`);
		if (pumpkin) {
			pumpkin.classList.add('explode');
			setTimeout(() => pumpkin.classList.remove('explode'), 1000);
		}
	}

	function triggerLightning() {
		playSound('thunder');
		document.body.style.background = '#fff';
		setTimeout(() => {
			document.body.style.background = '';
		}, 100);
	}

	onMount(() => {
		randomizeWitchPath();
		witchElement.addEventListener('animationiteration', randomizeWitchPath);

		// Random lightning strikes
		const lightningInterval = setInterval(() => {
			if (Math.random() < 0.1) triggerLightning();
		}, 10000);

		return () => {
			witchElement?.removeEventListener('animationiteration', randomizeWitchPath);
			clearInterval(lightningInterval);
		};
	});
</script>

<ParticleSystem />
<FogEffect />

<main>
	<!-- Flying Witch -->
	<img
		src="/witch.png"
		alt="Flying Witch"
		class="flying-witch"
		bind:this={witchElement}
		on:click={handleWitchClick}
		role="button"
		tabindex="0"
	/>

	<!-- Spooky Decorations -->
	<div
		class="decoration pumpkin pumpkin-left"
		on:click={() => handlePumpkinClick('left')}
		role="button"
		tabindex="0"
	>
		🎃
	</div>
	<div
		class="decoration pumpkin pumpkin-right"
		on:click={() => handlePumpkinClick('right')}
		role="button"
		tabindex="0"
	>
		🎃
	</div>
	<div class="decoration lamp lamp-left">🕯️</div>
	<div class="decoration lamp lamp-right">🕯️</div>
	<div class="lightning lightning-1">⚡</div>
	<div class="lightning lightning-2">⚡</div>

	<div class="container">
		<h1 class="title">🧟‍♂️ Franken-Monster Lab 🧟‍♂️</h1>

		<div class="controls">
			<button class="summon-btn" on:click={summonMonster} disabled={loading}>
				{loading ? 'Summoning...' : '⚡ Summon Monster ⚡'}
			</button>
			<button class="gallery-btn" on:click={() => (showGallery = !showGallery)}>
				{showGallery ? '🧪 Lab' : '⚰️ Cemetery'}
			</button>
		</div>

		{#if loading}
			<div class="loading">
				<p class="stitching">Stitching body parts...</p>
				<div class="lightning">⚡⚡⚡</div>
			</div>
		{/if}

		{#if error}
			<div class="error">
				<p>💀 Error: {error}</p>
				{#if retryCount > 0}
					<p class="retry-msg">Attempting resurrection... {retryCount}/1</p>
				{/if}
			</div>
		{/if}

		{#if showGallery}
			<div class="gallery-section">
				<h2 class="gallery-title">👻 Monster Cemetery 👻</h2>
				<p class="gallery-subtitle">Your collection of unholy creations</p>

				{#if $monsterCollection.length === 0}
					<div class="empty-gallery">
						<p>No monsters summoned yet...</p>
						<p class="hint">Click "Summon Monster" to begin your collection!</p>
					</div>
				{:else}
					<div class="gallery-grid">
						{#each $monsterCollection as collectedMonster (collectedMonster.monster_id)}
							<MonsterCard monster={collectedMonster} compact={false} />
						{/each}
					</div>
					<button class="clear-btn" on:click={() => monsterCollection.clear()}>
						🔥 Clear Cemetery
					</button>
				{/if}
			</div>
		{/if}

		{#if monster && !loading && !showGallery}
			<div class="monster-container">
				<!-- Monster Header with Rarity -->
				<div class="monster-header">
					<div class="name-section">
						{#if showNameInput}
							<input
								type="text"
								bind:value={customName}
								placeholder="Enter monster name..."
								class="name-input"
								on:keydown={(e) => e.key === 'Enter' && saveMonsterName()}
							/>
							<button class="save-name-btn" on:click={saveMonsterName}>✓</button>
							<button class="cancel-name-btn" on:click={() => (showNameInput = false)}>✗</button>
						{:else}
							<h2 class="monster-title">{monster.name}</h2>
							<button class="rename-btn" on:click={() => (showNameInput = true)}>✏️</button>
						{/if}
					</div>
					<div class="rarity-display {monster.rarity}">
						<span class="rarity-text">{monster.rarity?.toUpperCase()}</span>
						<div class="rarity-glow"></div>
					</div>
				</div>

				<!-- Backstory Section -->
				{#if monster.backstory}
					<div class="backstory-section">
						<h3 class="backstory-title">📜 Origin Story</h3>
						<p class="backstory-text">{monster.backstory}</p>
					</div>
				{/if}

				<!-- Personality Traits -->
				{#if monster.personality && monster.personality.length > 0}
					<div class="personality-section">
						<h3 class="personality-title">🎭 Personality</h3>
						<div class="traits-container">
							{#each monster.personality as trait}
								<span class="trait-badge">{trait}</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Curse Warning -->
				{#if monster.curse}
					<div class="curse-section">
						<h3 class="curse-title">⚠️ Cursed!</h3>
						<p class="curse-text">{monster.curse}</p>
					</div>
				{/if}

				<!-- Action Buttons -->
				<div class="action-buttons">
					<button class="action-btn" on:click={downloadMonsterCard}>📸 Download</button>
					<button class="action-btn" on:click={shareMonster}>🔗 Share</button>
					<button class="action-btn" on:click={summonMonster}>🔄 New Monster</button>
				</div>

				<!-- The Head (Identity) -->
				<div class="head-section">
					<h2 class="section-title">👤 The Head (Identity)</h2>
					<div class="head-content">
						<div class="profile-container">
							<!-- Haunted decorations around profile -->
							<div class="haunted-element ghost ghost-1">👻</div>
							<div class="haunted-element ghost ghost-2">👻</div>
							<div class="haunted-element skull skull-1">💀</div>
							<div class="haunted-element skull skull-2">💀</div>
							<div class="haunted-element bat bat-1">🦇</div>
							<div class="haunted-element bat bat-2">🦇</div>
							<div class="haunted-element spider">🕷️</div>
							<div class="haunted-ring"></div>
							<img src={monster.monster_data.head.picture} alt="Monster Head" class="head-image" />
						</div>
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

	.controls {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.summon-btn,
	.gallery-btn {
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

	.summon-btn:hover:not(:disabled),
	.gallery-btn:hover {
		background: linear-gradient(135deg, #9d4edd 0%, #c77dff 100%);
		color: #10002b;
		box-shadow: 0 0 30px #9d4edd, 0 0 50px rgba(157, 78, 221, 0.5);
		transform: scale(1.05) rotate(-1deg);
	}

	.summon-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.monster-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(60, 9, 108, 0.4) 0%, rgba(36, 0, 70, 0.6) 100%);
		border: 2px solid #9d4edd;
		border-radius: 10px;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.name-section {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
	}

	.monster-title {
		font-size: 2rem;
		color: #e0aaff;
		margin: 0;
		text-shadow: 0 0 10px #9d4edd;
	}

	.name-input {
		flex: 1;
		padding: 0.5rem;
		background: rgba(16, 0, 43, 0.8);
		border: 2px solid #9d4edd;
		color: #e0aaff;
		font-family: 'Courier New', monospace;
		font-size: 1.2rem;
	}

	.rename-btn,
	.save-name-btn,
	.cancel-name-btn {
		padding: 0.5rem;
		background: rgba(157, 78, 221, 0.3);
		border: 2px solid #9d4edd;
		color: #e0aaff;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.rename-btn:hover,
	.save-name-btn:hover,
	.cancel-name-btn:hover {
		background: #9d4edd;
		transform: scale(1.1);
	}

	.rarity-display {
		position: relative;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		font-weight: bold;
		text-align: center;
	}

	.rarity-display.common {
		background: #808080;
		color: #000;
	}
	.rarity-display.rare {
		background: #4169e1;
		color: #fff;
	}
	.rarity-display.epic {
		background: #9d4edd;
		color: #fff;
	}
	.rarity-display.legendary {
		background: #ffd700;
		color: #000;
		animation: legendary-pulse 2s ease-in-out infinite;
	}
	.rarity-display.cursed {
		background: #ff006e;
		color: #fff;
		animation: cursed-shake 0.5s ease-in-out infinite;
	}

	@keyframes legendary-pulse {
		0%,
		100% {
			box-shadow: 0 0 20px #ffd700;
		}
		50% {
			box-shadow: 0 0 40px #ffd700;
		}
	}

	@keyframes cursed-shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-2px);
		}
		75% {
			transform: translateX(2px);
		}
	}

	.backstory-section,
	.personality-section,
	.curse-section {
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: linear-gradient(135deg, rgba(36, 0, 70, 0.4) 0%, rgba(16, 0, 43, 0.6) 100%);
		border: 2px solid #9d4edd;
		border-radius: 10px;
	}

	.backstory-title,
	.personality-title,
	.curse-title {
		font-size: 1.3rem;
		color: #e0aaff;
		margin-bottom: 0.5rem;
		text-shadow: 0 0 5px #9d4edd;
	}

	.backstory-text {
		line-height: 1.6;
		font-style: italic;
		color: #c77dff;
	}

	.traits-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.trait-badge {
		padding: 0.5rem 1rem;
		background: rgba(157, 78, 221, 0.3);
		border: 2px solid #9d4edd;
		border-radius: 20px;
		color: #e0aaff;
		font-size: 0.9rem;
		transition: all 0.3s ease;
	}

	.trait-badge:hover {
		background: rgba(157, 78, 221, 0.6);
		transform: scale(1.05);
	}

	.curse-section {
		border-color: #ff006e;
		background: linear-gradient(135deg, rgba(51, 0, 17, 0.6) 0%, rgba(26, 0, 8, 0.8) 100%);
	}

	.curse-title {
		color: #ff006e;
	}

	.curse-text {
		color: #ff006e;
		font-style: italic;
		animation: ghostly 3s ease-in-out infinite;
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.action-btn {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #240046 0%, #3c096c 100%);
		border: 2px solid #9d4edd;
		color: #e0aaff;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Courier New', monospace;
		font-size: 1rem;
		border-radius: 5px;
	}

	.action-btn:hover {
		background: linear-gradient(135deg, #9d4edd 0%, #c77dff 100%);
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(157, 78, 221, 0.4);
	}

	.gallery-section {
		margin-top: 2rem;
	}

	.gallery-title {
		text-align: center;
		font-size: 2rem;
		color: #e0aaff;
		text-shadow: 0 0 10px #9d4edd;
		margin-bottom: 0.5rem;
	}

	.gallery-subtitle {
		text-align: center;
		color: #c77dff;
		margin-bottom: 2rem;
		font-style: italic;
	}

	.empty-gallery {
		text-align: center;
		padding: 3rem;
		background: linear-gradient(135deg, rgba(36, 0, 70, 0.4) 0%, rgba(16, 0, 43, 0.6) 100%);
		border: 2px dashed #9d4edd;
		border-radius: 10px;
	}

	.hint {
		color: #9d4edd;
		font-size: 0.9rem;
		margin-top: 1rem;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.clear-btn {
		display: block;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #330011 0%, #1a0008 100%);
		border: 2px solid #ff006e;
		color: #ff006e;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Courier New', monospace;
		border-radius: 5px;
	}

	.clear-btn:hover {
		background: #ff006e;
		color: #000;
		transform: scale(1.05);
	}

	.retry-msg {
		font-size: 0.9rem;
		margin-top: 0.5rem;
		animation: pulse 1s infinite;
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

	.profile-container {
		position: relative;
		width: 200px;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.head-image {
		width: 150px;
		height: 150px;
		border: 3px solid #9d4edd;
		border-radius: 50%;
		box-shadow: 0 0 20px #9d4edd, 0 0 40px rgba(157, 78, 221, 0.4);
		transition: all 0.3s ease;
		filter: saturate(1.2) contrast(1.1);
		position: relative;
		z-index: 2;
	}

	.head-image:hover {
		box-shadow: 0 0 30px #c77dff, 0 0 60px rgba(199, 125, 255, 0.5);
		transform: scale(1.05);
	}

	/* Haunted ring around profile */
	.haunted-ring {
		position: absolute;
		width: 180px;
		height: 180px;
		border: 2px dashed #9d4edd;
		border-radius: 50%;
		animation: rotateRing 10s linear infinite;
		opacity: 0.5;
		z-index: 1;
	}

	@keyframes rotateRing {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Haunted elements */
	.haunted-element {
		position: absolute;
		font-size: 1.5rem;
		z-index: 3;
		filter: drop-shadow(0 0 5px #9d4edd);
		pointer-events: none;
	}

	.ghost {
		animation: floatGhost 3s ease-in-out infinite;
	}

	.ghost-1 {
		top: -10px;
		left: 10px;
		animation-delay: 0s;
	}

	.ghost-2 {
		bottom: -10px;
		right: 10px;
		animation-delay: 1.5s;
	}

	@keyframes floatGhost {
		0%,
		100% {
			transform: translateY(0px) translateX(0px);
			opacity: 0.7;
		}
		50% {
			transform: translateY(-10px) translateX(5px);
			opacity: 1;
		}
	}

	.skull {
		animation: bobSkull 2s ease-in-out infinite;
	}

	.skull-1 {
		top: 10px;
		right: -5px;
		animation-delay: 0.5s;
	}

	.skull-2 {
		bottom: 10px;
		left: -5px;
		animation-delay: 1s;
	}

	@keyframes bobSkull {
		0%,
		100% {
			transform: rotate(-10deg) translateY(0px);
		}
		50% {
			transform: rotate(10deg) translateY(-8px);
		}
	}

	.bat {
		animation: flyBat 4s ease-in-out infinite;
		font-size: 1.2rem;
	}

	.bat-1 {
		top: 30px;
		left: -15px;
		animation-delay: 0s;
	}

	.bat-2 {
		bottom: 30px;
		right: -15px;
		animation-delay: 2s;
	}

	@keyframes flyBat {
		0%,
		100% {
			transform: translateX(0px) translateY(0px) rotate(0deg);
		}
		25% {
			transform: translateX(-10px) translateY(-5px) rotate(-15deg);
		}
		75% {
			transform: translateX(10px) translateY(5px) rotate(15deg);
		}
	}

	.spider {
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		animation: hangSpider 3s ease-in-out infinite;
	}

	@keyframes hangSpider {
		0%,
		100% {
			transform: translateX(-50%) translateY(0px);
		}
		50% {
			transform: translateX(-50%) translateY(10px);
		}
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

	/* Flying Witch Animation */
	.flying-witch {
		position: fixed;
		width: 150px;
		height: 150px;
		z-index: 1000;
		filter: drop-shadow(0 0 15px #9d4edd);
		animation: flyAcross 15s linear infinite;
		cursor: pointer;
		pointer-events: auto;
		transform: scaleX(-1);
		transition: filter 0.3s ease;
		--start-y: 10%;
		--mid-y1: 20%;
		--mid-y2: 15%;
		--end-y: 25%;
	}

	.flying-witch:hover {
		filter: drop-shadow(0 0 30px #c77dff);
	}

	@keyframes flyAcross {
		0% {
			left: -200px;
			top: var(--start-y);
			transform: scaleX(-1) rotate(-5deg);
		}
		25% {
			top: var(--mid-y1);
			transform: scaleX(-1) rotate(5deg);
		}
		50% {
			top: var(--mid-y2);
			transform: scaleX(-1) rotate(-3deg);
		}
		75% {
			top: var(--end-y);
			transform: scaleX(-1) rotate(3deg);
		}
		100% {
			left: calc(100% + 200px);
			top: var(--end-y);
			transform: scaleX(-1) rotate(-5deg);
		}
	}

	/* Spooky Decorations */
	.decoration {
		position: fixed;
		font-size: 3rem;
		z-index: 999;
		cursor: pointer;
		pointer-events: auto;
		transition: all 0.3s ease;
	}

	.decoration:hover {
		transform: scale(1.2);
	}

	.pumpkin.explode {
		animation: explode 0.5s ease-out;
	}

	@keyframes explode {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(2) rotate(180deg);
			opacity: 0.5;
		}
		100% {
			transform: scale(0.8) rotate(360deg);
			opacity: 1;
		}
	}

	.pumpkin-left {
		left: 2%;
		top: 15%;
		animation: bob 3s ease-in-out infinite;
		filter: drop-shadow(0 0 15px #ff6b35);
	}

	.pumpkin-right {
		right: 2%;
		top: 20%;
		animation: bob 3s ease-in-out infinite 1.5s;
		filter: drop-shadow(0 0 15px #ff6b35);
	}

	.lamp-left {
		left: 5%;
		top: 5%;
		animation: flicker 2s ease-in-out infinite;
		filter: drop-shadow(0 0 20px #ffd700);
	}

	.lamp-right {
		right: 5%;
		top: 8%;
		animation: flicker 2s ease-in-out infinite 1s;
		filter: drop-shadow(0 0 20px #ffd700);
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0px) rotate(-2deg);
		}
		50% {
			transform: translateY(-15px) rotate(2deg);
		}
	}

	/* Horror Lightning */
	.lightning {
		position: fixed;
		font-size: 4rem;
		z-index: 998;
		pointer-events: none;
		opacity: 0;
		color: #c77dff;
		filter: drop-shadow(0 0 20px #9d4edd);
	}

	.lightning-1 {
		left: 20%;
		top: 5%;
		animation: strike 8s ease-in-out infinite;
	}

	.lightning-2 {
		right: 25%;
		top: 10%;
		animation: strike 8s ease-in-out infinite 4s;
	}

	@keyframes strike {
		0%,
		90%,
		100% {
			opacity: 0;
		}
		91% {
			opacity: 1;
		}
		92% {
			opacity: 0;
		}
		93% {
			opacity: 1;
		}
		94%,
		96% {
			opacity: 0;
		}
		97% {
			opacity: 1;
		}
	}

	/* Add atmospheric glow to body */
	:global(body)::before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			circle at 50% 50%,
			rgba(157, 78, 221, 0.1) 0%,
			transparent 70%
		);
		pointer-events: none;
		z-index: 1;
	}
</style>
