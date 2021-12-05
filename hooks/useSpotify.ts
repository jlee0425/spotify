import { signIn, useSession } from 'next-auth/react';
import { CustomUser } from 'pages/api/auth/[...nextauth]';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
	'user-read-email',
	'playlist-read-private',
	'playlist-read-collaborative',
	'streaming',
	'user-read-private',
	'user-library-read',
	'user-top-read',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-follow-read',
].join(',');

const params = {
	scope: scopes,
};

const queryParam = new URLSearchParams(params);
export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParam.toString()}`;
const spotifyAPI = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRENT,
});

export default spotifyAPI;

export const useSpotify = () => {
	const { data: session, status } = useSession();
	useEffect(() => {
		if (session) {
			if (
				status === 'unauthenticated' ||
				session.error === 'RefreshAccessTokenError'
			) {
				signIn();
			}

			spotifyAPI.setAccessToken(
				(session.user as unknown as CustomUser).accessToken
			);
		}
	}, [session, status]);

	return spotifyAPI;
};
