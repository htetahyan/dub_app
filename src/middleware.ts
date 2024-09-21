import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  
 
  // If user is trying to access the dashboard but no token is present
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // If user is trying to access /signin or /signup while having a token, redirect to the dashboard
  if ((request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/dashboard/my-projects', request.url))
  }

  // Allow the request to proceed if no conditions were met
  return NextResponse.next()
}

// Matching Paths
export const config = {
  matcher: ['/:path*', '/dashboard/:path*', '/signin', '/signup'],
}
