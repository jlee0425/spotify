import type { NextPage } from 'next';
import React from 'react';
import { Footer } from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';

const Home: NextPage = () => {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<main className="">
				<Sidebar />
				<Main />
			</main>
			<Footer />
		</div>
	);
};

export default Home;
