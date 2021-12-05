/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Track } from 'recoil/playlistAtom';

interface Props {
	order: number;
	track: Track;
}

const millisToMinuteAndSecond = (millis: number) => {
	let minutes = Math.floor(millis / (1000 * 60));
	let seconds = Math.floor((millis % (1000 * 60)) / 1000);
	if (seconds === 60) {
		minutes++;
		seconds = 0;
	}
	return (
		minutes.toString().padStart(2, '0') +
		':' +
		seconds.toString().padStart(2, '0')
	);
};

const Song = ({ order, track }: Props) => {
	return (
		<div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
			<div className="flex items-center space-x-4">
				<span>{order}</span>
				<img className="w-10 h-10" src={track.album.images?.[0].url} alt="" />
				<div className="w-36 lg:w-64">
					<p className="text-white truncate">{track.name}</p>
					<p className="text-wrap">{track.artists[0].name}</p>
				</div>
			</div>

			<div className="flex items-center justify-between ml-auto md:ml-0">
				<p className="hidden md:inline w-40">{track.album.name}</p>
				<p>{millisToMinuteAndSecond(track.duration_ms)}</p>
			</div>
		</div>
	);
};

export default Song;
