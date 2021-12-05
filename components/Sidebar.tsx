import {
	HeartIcon,
	HomeIcon,
	LibraryIcon,
	LogoutIcon,
	PlusCircleIcon,
	RssIcon,
	SearchIcon,
} from '@heroicons/react/outline';
import { useSpotify } from 'hooks/useSpotify';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { playlistIdState, PlaylistResponse } from 'recoil/playlistAtom';

const Sidebar = () => {
	const { data: session, status } = useSession();
	const spotify = useSpotify();
	const [playlists, setPlaylists] = useState<PlaylistResponse[]>([]);
	const setCurrentPlaylist = useSetRecoilState(playlistIdState);

	useEffect(() => {
		if (spotify.getAccessToken()) {
			spotify.getUserPlaylists().then((data) => {
				if (data) {
					setPlaylists(data.body.items as unknown as PlaylistResponse[]);
					setCurrentPlaylist(data.body.items[0]?.id);
				}
			});
		}
	}, [session, setCurrentPlaylist, spotify]);

	return (
		<div className=" hidden md:inline-flex text-gray-500 p-5 border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
			<div className="space-y-4 text-xs lg:text-sm xl:text-lg sm:max-w-[12rem] lg:max-w-[15rem]">
				<button className="main-btn">
					<HomeIcon className="h-5 w-5" />
					<p>Home</p>
				</button>
				<button className="main-btn">
					<SearchIcon className="h-5 w-5" />
					<p>Search</p>
				</button>
				<button className="main-btn">
					<LibraryIcon className="h-5 w-5" />
					<p>Your Library</p>
				</button>
				<hr className="divider" />
				<button className="main-btn">
					<PlusCircleIcon className="h-5 w-5" />
					<p>Create Playlist</p>
				</button>
				<button className="main-btn">
					<HeartIcon className="h-5 w-5" />
					<p>Liked Songs</p>
				</button>
				<button className="main-btn">
					<RssIcon className="h-5 w-5" />
					<p>Your Episodes</p>
				</button>
				<hr className="divider" />
				{playlists.map((pl) => (
					<p
						className="playlist"
						key={pl.id}
						onClick={() => setCurrentPlaylist(pl.id)}
					>
						{pl.name}
					</p>
				))}
				<button className="main-btn" onClick={() => signOut()}>
					<LogoutIcon className="h-5 w-5" />
					<p>Sign out</p>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
