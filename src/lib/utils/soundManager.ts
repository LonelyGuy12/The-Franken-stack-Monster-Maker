// Sound Manager for spooky audio effects
class SoundManager {
	private sounds: Map<string, HTMLAudioElement> = new Map();
	private musicEnabled = true;
	private sfxEnabled = true;
	private backgroundMusic: HTMLAudioElement | null = null;

	constructor() {
		if (typeof window !== 'undefined') {
			this.loadSounds();
		}
	}

	private loadSounds() {
		// Using free sound URLs (you can replace with actual audio files)
		const soundUrls = {
			thunder: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
			witch: 'https://assets.mixkit.co/active_storage/sfx/1740/1740-preview.mp3',
			summon: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
			click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
			success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
			error: 'https://assets.mixkit.co/active_storage/sfx/1867/1867-preview.mp3'
		};

		Object.entries(soundUrls).forEach(([name, url]) => {
			const audio = new Audio(url);
			audio.volume = 0.3;
			this.sounds.set(name, audio);
		});
	}

	play(soundName: string) {
		if (!this.sfxEnabled) return;
		const sound = this.sounds.get(soundName);
		if (sound) {
			sound.currentTime = 0;
			sound.play().catch(() => {
				// Ignore autoplay errors
			});
		}
	}

	startBackgroundMusic() {
		if (!this.musicEnabled || this.backgroundMusic) return;
		// Placeholder for background music
		// You can add actual spooky music URL here
	}

	stopBackgroundMusic() {
		if (this.backgroundMusic) {
			this.backgroundMusic.pause();
			this.backgroundMusic = null;
		}
	}

	toggleMusic() {
		this.musicEnabled = !this.musicEnabled;
		if (!this.musicEnabled) {
			this.stopBackgroundMusic();
		}
		return this.musicEnabled;
	}

	toggleSFX() {
		this.sfxEnabled = !this.sfxEnabled;
		return this.sfxEnabled;
	}
}

export const soundManager = new SoundManager();
