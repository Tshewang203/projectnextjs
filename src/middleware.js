import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/', '/destinations', '/travel-tips', '/blog', '/quiz', '/contact', '/booking'];
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check if the path is an API route
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = await verifyToken(token);
    
    // Add user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.id);
    requestHeaders.set('x-user-role', decoded.role);

    // For API routes, return the modified request
    if (isApiRoute) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // For admin routes, check if user is admin
    if (request.nextUrl.pathname.startsWith('/admin') && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    if (isApiRoute) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 