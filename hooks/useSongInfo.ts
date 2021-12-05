import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Track } from 'recoil/playlistAtom';
import { currentTrackId } from 'recoil/songAtom';
import axios from 'redaxios';
import { useSpotify } from './useSpotify';

export const useSongInfo = () => {
	const spotify = useSpotify();
	const currentId = useRecoilValue(currentTrackId);
	const [songInfo, setSongInfo] = useState<Track>();

	useEffect(() => {
		const fetchSongInfo = async () => {
			if (currentId) {
				const res = await axios.get(
					`https://api.spotify.com/v1/tracks/${currentId}`,
					{
						headers: {
							authorization: `Bearer ${spotify.getAccessToken()}`,
						},
					}
				);
				if (res.ok) {
					console.log(`res.data`, res);
					setSongInfo(res.data);
				}
			} else {
				const currentlyPlaying = await spotify.getMyCurrentPlayingTrack();
				setSongInfo(currentlyPlaying?.body?.item as unknown as Track);
			}
		};

		fetchSongInfo();
	}, [spotify, currentId]);

	return songInfo;
};
