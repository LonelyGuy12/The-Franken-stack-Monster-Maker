<div class="skeleton-container">
	<div class="skeleton-header">
		<div class="skeleton-box skeleton-title"></div>
		<div class="skeleton-box skeleton-badge"></div>
	</div>

	<div class="skeleton-section">
		<div class="skeleton-box skeleton-image"></div>
		<div class="skeleton-info">
			<div class="skeleton-box skeleton-line"></div>
			<div class="skeleton-box skeleton-line"></div>
			<div class="skeleton-box skeleton-line short"></div>
		</div>
	</div>

	<div class="skeleton-section">
		<div class="skeleton-box skeleton-line"></div>
		<div class="skeleton-stats">
			<div class="skeleton-box skeleton-stat"></div>
			<div class="skeleton-box skeleton-stat"></div>
			<div class="skeleton-box skeleton-stat"></div>
			<div class="skeleton-box skeleton-stat"></div>
		</div>
	</div>
</div>

<style>
	.skeleton-container {
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(36, 0, 70, 0.6) 0%, rgba(16, 0, 43, 0.8) 100%);
		border: 3px solid #9d4edd;
		border-radius: 10px;
	}

	.skeleton-box {
		background: linear-gradient(90deg, rgba(157, 78, 221, 0.1) 0%, rgba(199, 125, 255, 0.2) 50%, rgba(157, 78, 221, 0.1) 100%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 5px;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	.skeleton-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.skeleton-title {
		width: 200px;
		height: 40px;
	}

	.skeleton-badge {
		width: 80px;
		height: 30px;
	}

	.skeleton-section {
		margin-bottom: 1.5rem;
	}

	.skeleton-section:first-of-type {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}

	.skeleton-image {
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}

	.skeleton-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.skeleton-line {
		height: 20px;
		width: 100%;
	}

	.skeleton-line.short {
		width: 60%;
	}

	.skeleton-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.skeleton-stat {
		height: 80px;
	}
</style>
