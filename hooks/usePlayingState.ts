import { useEffect, useState } from 'react';
import { CurrentTrack } from 'recoil/playlistAtom';
import { useSpotify } from './useSpotify';

// Currently, playing state cannot be manipulated through API due to unknown reasons by Spotify API.
export const usePlayingState = () => {
	const spotify = useSpotify();
	const [state, setState] = useState<CurrentTrack>();

	useEffect(() => {
		const fetchPlayingState = async () => {
			if (spotify.getAccessToken()) {
				const res = await spotify.getMyCurrentPlaybackState();
				if (res.statusCode === 200) {
					setState(res.body as unknown as CurrentTrack);
				}
			}
		};

		fetchPlayingState();
	}, [spotify]);

	return state;
};
