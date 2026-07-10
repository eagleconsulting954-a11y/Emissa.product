import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse('Admin access is not configured.', { status: 503 });
  }

  const authorization = request.headers.get('authorization');
  if (authorization?.startsWith('Basic ')) {
    try {
      const decoded = atob(authorization.slice(6));
      const separator = decoded.indexOf(':');
      const suppliedUser = decoded.slice(0, separator);
      const suppliedPassword = decoded.slice(separator + 1);
      if (suppliedUser === username && suppliedPassword === password) {
        return NextResponse.next();
      }
    } catch {
      // Fall through to authentication challenge.
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Emissa Admin"' },
  });
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
