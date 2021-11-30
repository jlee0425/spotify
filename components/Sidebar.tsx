import {
	HeartIcon,
	HomeIcon,
	LibraryIcon,
	LogoutIcon,
	PlusCircleIcon,
	RssIcon,
	SearchIcon,
} from '@heroicons/react/outline';
import { signOut } from 'next-auth/react';
import React from 'react';

const Sidebar = () => {
	return (
		<div className="text-gray-500 p-5 text-sm border-r border-gray-900">
			<div className="space-y-4">
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
				{/* Playlists */}
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<p className="playlist">Playlist name...</p>
				<button className="main-btn" onClick={() => signOut()}>
					<LogoutIcon className="h-5 w-5" />
					<p>Sign out</p>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
