export interface Playlist {
	id: string;
	name: string;
	description: string;
	href: string;
	images: { url: string }[];
	collaborative: boolean;
}
