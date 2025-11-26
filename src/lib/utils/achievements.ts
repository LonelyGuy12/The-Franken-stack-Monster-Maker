export interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	unlocked: boolean;
	progress: number;
	maxProgress: number;
}

export const ACHIEVEMENTS: Achievement[] = [
	{
		id: 'first_summon',
		name: 'First Creation',
		description: 'Summon your first monster',
		icon: '🧪',
		unlocked: false,
		progress: 0,
		maxProgress: 1
	},
	{
		id: 'collector',
		name: 'Monster Collector',
		description: 'Summon 10 monsters',
		icon: '📚',
		unlocked: false,
		progress: 0,
		maxProgress: 10
	},
	{
		id: 'hoarder',
		name: 'Monster Hoarder',
		description: 'Summon 50 monsters',
		icon: '🏆',
		unlocked: false,
		progress: 0,
		maxProgress: 50
	},
	{
		id: 'legendary_hunter',
		name: 'Legendary Hunter',
		description: 'Find a legendary monster',
		icon: '⭐',
		unlocked: false,
		progress: 0,
		maxProgress: 1
	},
	{
		id: 'cursed_one',
		name: 'The Cursed One',
		description: 'Find a cursed monster',
		icon: '💀',
		unlocked: false,
		progress: 0,
		maxProgress: 1
	},
	{
		id: 'power_seeker',
		name: 'Power Seeker',
		description: 'Find a monster with 600+ total power',
		icon: '💪',
		unlocked: false,
		progress: 0,
		maxProgress: 1
	},
	{
		id: 'midnight_summoner',
		name: 'Midnight Summoner',
		description: 'Summon a monster at midnight',
		icon: '🌙',
		unlocked: false,
		progress: 0,
		maxProgress: 1
	},
	{
		id: 'full_collection',
		name: 'Full Cemetery',
		description: 'Have 50 monsters in your collection',
		icon: '⚰️',
		unlocked: false,
		progress: 0,
		maxProgress: 50
	}
];

class AchievementManager {
	private achievements: Achievement[] = [];

	constructor() {
		if (typeof window !== 'undefined') {
			this.loadAchievements();
		}
	}

	private loadAchievements() {
		const stored = localStorage.getItem('achievements');
		if (stored) {
			this.achievements = JSON.parse(stored);
		} else {
			this.achievements = [...ACHIEVEMENTS];
		}
	}

	private saveAchievements() {
		localStorage.setItem('achievements', JSON.stringify(this.achievements));
	}

	checkAchievement(id: string, progress: number = 1): Achievement | null {
		const achievement = this.achievements.find((a) => a.id === id);
		if (!achievement || achievement.unlocked) return null;

		achievement.progress = Math.min(achievement.progress + progress, achievement.maxProgress);

		if (achievement.progress >= achievement.maxProgress) {
			achievement.unlocked = true;
			this.saveAchievements();
			return achievement;
		}

		this.saveAchievements();
		return null;
	}

	getAchievements(): Achievement[] {
		return this.achievements;
	}

	getUnlockedCount(): number {
		return this.achievements.filter((a) => a.unlocked).length;
	}

	resetAchievements() {
		this.achievements = [...ACHIEVEMENTS];
		this.saveAchievements();
	}
}

export const achievementManager = new AchievementManager();
