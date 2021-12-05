import { atom } from 'recoil';

export const playlistIdState = atom({
	key: 'playlist-id-state',
	default: '',
});

export const playlistState = atom<PlaylistResponse | null>({
	key: 'playlist-atom-state',
	default: null,
});

export interface PlaylistResponse {
	collaborative: boolean;
	description: string;
	external_urls: { spotify: string };
	followers: { href: null; total: number };
	href: string;
	id: string;
	images: ImageProps[];
	name: string;
	owner: {
		display_name: string;
		external_urls: { spotify: string };
		href: string;
		id: string;
		type: string;
		uri: string;
	};
	primary_color: string;
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		items: TrackResponse[];
		limit: number;
		next: string;
		offset: number;
		previous: null;
		total: number;
	};
	type: string;
	uri: string;
}

interface ImageProps {
	url: string;
}

export interface TrackResponse {
	added_at: string;
	added_by: { external_urls: { spotify: string; href: string } };
	is_local: false;
	primary_color: null;
	track: Track;
	video_thumbnail: { url: null };
}

export interface Track {
	album: {
		album_type: string;
		images: ImageProps[];
		name: string;
		release_date: string;
		total_tracks: number;
	};
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	episode: false;
	explicit: false;
	external_ids: { isrc: string };
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_local: false;
	name: string;
	popularity: number;
	preview_url: string;
	track: true;
	track_number: number;
	type: string;
	uri: string;
}

export interface CurrentTrack extends Track {
	progress_ms: number;
	timestamp: number;
	is_playing: boolean;
	shuffle: boolean;
}
export interface Artist {
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}
