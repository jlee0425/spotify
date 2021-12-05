import type { NextPage } from 'next';
import React from 'react';
import { Footer } from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import { getSession, GetSessionParams } from 'next-auth/react';

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
			<Footer />
		</div>
	);
};

export default Home;
