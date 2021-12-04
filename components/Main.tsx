/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import shuffle from 'lodash/shuffle';

const colors = ['indigo', 'blue', 'green', 'red', 'yellow', 'pink', 'purple'];
const Main = () => {
	const { data: session } = useSession();
	const [color, setColor] = useState<string>('');
	useEffect(() => {
		setColor(shuffle(colors).pop() as string);
	}, []);

	return (
		<div className="flex-grow">
			<header className="absolute top-5 right-8">
				<div
					className={`flex items-center bg-${color}-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2`}
				>
					<img
						className="rounded-full w-10 h-10"
						src={session?.user?.image as string}
						alt=""
					/>
					<h2>{session?.user?.name}</h2>
					<ChevronDownIcon className="h-5 w-5" />
				</div>
			</header>
			<section
				className={`flex items-end space-x-7 bg-gradient-to-b to-black from-${color}-500 h-80 w-full text-white p-8`}
			>
				<img src="" alt="" />
			</section>
		</div>
	);
};

export default Main;
