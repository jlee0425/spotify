import type { NextPage } from 'next';
import React from 'react';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import { getSession, GetSessionParams } from 'next-auth/react';
import Player from 'components/Player';

export const getServerSideProps = async (ctx: GetSessionParams) => {
	const session = await getSession(ctx);

	return {
		props: {
			session,
		},
	};
};

const Home: NextPage = () => {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<main className="flex ">
				<Sidebar />
				<Main />
			</main>
			<Player />
		</div>
	);
};

export default Home;
