/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSpotify } from 'hooks/useSpotify';
import shuffle from 'lodash/shuffle';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	playlistIdState,
	PlaylistResponse,
	playlistState,
} from 'recoil/playlistAtom';
import Song from './Song';

const colors = ['indigo', 'blue', 'green', 'red', 'yellow', 'pink', 'purple'];
const Main = () => {
	const { data: session } = useSession();
	const spotify = useSpotify();
	const [color, setColor] = useState<string>('');
	const currentPlaylistId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState(playlistState);

	useEffect(() => {
		if (currentPlaylistId) {
			spotify
				.getPlaylist(currentPlaylistId)
				.then((data) => setPlaylist(data.body as unknown as PlaylistResponse))
				.catch((err) => console.error(err));
		}
	}, [currentPlaylistId, setPlaylist, spotify]);

	useEffect(() => {
		setColor(shuffle(colors).pop() as string);
	}, [currentPlaylistId]);

	return (
		<div className="flex flex-col flex-grow text-white">
			<Header
				username={session?.user?.name as string}
				profileImage={session?.user?.image as string}
				color={color}
				playlistTitle={playlist?.name as string}
				playlistImg={playlist?.images?.[0]?.url as string}
			/>
			<Tracks />
		</div>
	);
};

export default Main;

interface HeaderProps extends FloatingBtnProps {
	playlistImg: string;
	playlistTitle: string;
}

const Header = ({
	username,
	profileImage,
	color,
	playlistTitle,
	playlistImg,
}: HeaderProps) => {
	return (
		<div className="">
			<HeaderFloatingBtn
				username={username}
				profileImage={profileImage}
				color={color}
			/>
			<section
				className={`flex items-end space-x-7 bg-gradient-to-b to-black from-${color}-500 h-80 w-full  p-8`}
			>
				<img className="h-44 w-44 shadow-2xl" src={playlistImg} alt="" />
				<div>
					<p>Playlist</p>
					<h1 className="text-2xl md:text-3xl xl:text-5xl ">{playlistTitle}</h1>
				</div>
			</section>
		</div>
	);
};
interface FloatingBtnProps {
	username: string;
	profileImage: string;
	color: string;
}
const HeaderFloatingBtn = ({
	color,
	profileImage,
	username,
}: FloatingBtnProps) => {
	return (
		<header className="absolute top-5 right-8">
			<div
				className={`flex items-center bg-${color}-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2`}
			>
				<img className="rounded-full w-10 h-10" src={profileImage} alt="" />
				<h2>{username}</h2>
				<ChevronDownIcon className="h-5 w-5 pr-1" />
			</div>
		</header>
	);
};

const Tracks = () => {
	const playlist = useRecoilValue(playlistState);

	return (
		<div className="px-8 pb-28 flex-col space-y-1 overflow-y-scroll h-screen">
			{playlist?.tracks?.items?.map((pl, i) => (
				<Song key={pl.track.id} track={pl.track} order={i + 1} />
			))}
		</div>
	);
};
