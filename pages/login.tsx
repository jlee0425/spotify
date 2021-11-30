import React from 'react';
import {
	ClientSafeProvider,
	getProviders,
	LiteralUnion,
	signIn,
} from 'next-auth/react';
import Image from 'next/image';
import SpotifyLogo from 'styles/spotify_logo.png';
import { BuiltInProviderType } from 'next-auth/providers';

export const getServerSideProps = async () => {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
};

const login = ({
	providers,
}: {
	providers: Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	>;
}) => {
	return (
		<div className="bg-black w-full min-h-screen flex flex-col justify-center items-center">
			<div className="relative w-52 h-52 mb-5">
				<Image src={SpotifyLogo} layout="fill" alt="" />
			</div>
			{providers &&
				Object.values(providers).map((provider) => (
					<div key={provider.id}>
						<button
							className="bg-spotify text-white p-5 rounded-3xl"
							onClick={() => signIn(provider.id, { callbackUrl: '/' })}
						>
							Login with {provider.name}
						</button>
					</div>
				))}
		</div>
	);
};

export default login;
