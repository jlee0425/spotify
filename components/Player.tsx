/* eslint-disable @next/next/no-img-element */
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import {
	FastForwardIcon,
	PauseIcon,
	PlayIcon,
	ReplyIcon,
	RewindIcon,
	VolumeUpIcon,
	SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { usePlayingState } from 'hooks/usePlayingState';
import { useSongInfo } from 'hooks/useSongInfo';
import { useSpotify } from 'hooks/useSpotify';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isPlaying } from 'recoil/songAtom';

interface Props {}

const Player = (props: Props) => {
	const { data: session } = useSession();
	const spotify = useSpotify();
	const song = useSongInfo();
	const playingState = usePlayingState();
	const [isPlayingNow, setPlaying] = useRecoilState(isPlaying);
	const [volume, setVolume] = useState(50);

	useEffect(() => {
		if (playingState?.is_playing) {
			setPlaying(playingState?.is_playing);
			setVolume(50);
		}
	}, [playingState?.is_playing, setPlaying]);

	const onChangeVolume = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setVolume(Number(e.target.value));
	}, []);

	const handlePlayPause = useCallback(async () => {
		if (isPlayingNow) {
			await spotify.pause();
			setPlaying(false);
		} else {
			await spotify.play();
			setPlaying(true);
		}
	}, [isPlayingNow, setPlaying, spotify]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedAdjustVolume = useCallback(
		debounce(async (volume: number) => await spotify.setVolume(volume), 300),
		[]
	);

	useEffect(() => {
		if (volume > 0 && volume < 100) {
			debouncedAdjustVolume(volume);
		}
	}, [debouncedAdjustVolume, volume]);

	return (
		<div className="sticky bottom-0 h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
			{/* Left */}
			<div className="flex items-center space-x-4">
				<img
					src={song?.album?.images?.[0]?.url}
					alt=""
					className="hidden md:inline h-10 w-10"
				/>
				<div>
					<h3>{song?.name}</h3>
					<p className="text-gray-500">{song?.artists?.[0].name}</p>
				</div>
			</div>

			{/* Center */}
			<div className="flex items-center justify-evenly">
				<SwitchHorizontalIcon className="playlist-btn smallbtn" />
				<RewindIcon className="playlist-btn smallbtn" />
				{isPlayingNow ? (
					<PauseIcon
						className="playlist-btn playbtn"
						onClick={handlePlayPause}
					/>
				) : (
					<PlayIcon
						className="playlist-btn playbtn"
						onClick={handlePlayPause}
					/>
				)}
				<FastForwardIcon className="playlist-btn smallbtn" />
				<ReplyIcon className="playlist-btn smallbtn" />
			</div>

			{/* Right */}
			<div className="flex items-center space-x-3 md:space-x-4 justify-end">
				<VolumeDownIcon
					className="playlist-btn smallbtn"
					onClick={() => volume > 0 && setVolume(volume - 10)}
				/>
				<input
					className="w-14 md:w-28"
					type="range"
					value={volume}
					min={0}
					max={100}
					onChange={onChangeVolume}
				/>
				<VolumeUpIcon
					className="playlist-btn smallbtn"
					onClick={() => volume < 100 && setVolume(volume + 10)}
				/>
			</div>
		</div>
	);
};

export default Player;
