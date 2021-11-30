import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyAPI, { LOGIN_URL } from 'lib/spotify';

const refreshAccessToken = async (token: JWT) => {
	try {
		console.log('refreshing ', token);
		spotifyAPI.setAccessToken(token.accessToken as string);
		spotifyAPI.setRefreshToken(token.refreshToken as string);

		const { body: refreshedToken } = await spotifyAPI.refreshAccessToken();
		console.log('refreshToken: ', refreshedToken);

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1hr as 3600 returns from spotifyAPI
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.error(error);
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
};

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, account, user }) {
			// initial signin
			if (account && user) {
				console.log('initial signin');
				console.log(account, user);
				return {
					...token,
					accessToken: account.access_token as string,
					refreshToken: account.refresh_token as string,
					username: account.providerAccountId as string,
					accessTokenExpires: Number(account.expires_at) * 1000, // expiry time in seconds
				};
			}
			// return previous token if the access token has not expired yet
			if (Date.now() < Number(token.accessTokenExpires)) {
				console.log('EXISTING ACCESS TOKEN IS VALID');
				return token;
			}

			// access token has expired, -> renew with refresh_token
			console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...');
			return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			session!.user!.accessToken = token.accessToken;
			session!.user!.refreshToken = token.refreshToken;
			session!.user!.username = token.username;
			return session;
		},
	},
});
