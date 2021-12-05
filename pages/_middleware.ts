import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const middleware = async (req: any) => {
	// token exists if user is logged in
	const token = await getToken({ req, secret: process.env.JWT_SECRET! });

	const { pathname } = req.nextUrl;

	// the token exists or it is auth page
	if (pathname.includes('/api/auth') || token) {
		return NextResponse.next();
	}

	// redirect to /login if they don't have token AND are requesting to a protected route
	if (!token && pathname !== '/login') {
		return NextResponse.redirect('/login');
	}
};
