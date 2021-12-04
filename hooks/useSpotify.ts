import spotifyAPI from 'lib/spotify';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useSpotify = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			if (session.error === 'RefreshAccessTokenError') {
				signIn();
			}

			spotifyAPI.setAccessToken(session!.user!.accessToken);
		}
	}, [session]);

	return spotifyAPI;
};
