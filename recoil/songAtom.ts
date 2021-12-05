import { atom } from 'recoil';

export const currentTrackId = atom<string>({
	key: 'current-track-id-state',
	default: '',
});

export const isPlaying = atom({
	key: 'playing-state',
	default: false,
});
