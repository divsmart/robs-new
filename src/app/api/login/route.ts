import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

function hashPassword(password: string): string {
  return createHash('sha256').update(password + process.env.PASSWORD_SALT).digest('hex')
}

// Credentials are stored as username:hashed_password pairs in env
// Format in .env: USERS=michael:hashed_pw1,rob:hashed_pw2,guest1:hashed_pw3
function getUsers(): Record<string, string> {
  const raw = process.env.USERS || ''
  return Object.fromEntries(
    raw.split(',')
      .filter(Boolean)
      .map((entry) => {
        const [username, hash] = entry.split(':')
        return [username.trim(), hash.trim()]
      })
  )
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }

  const users = getUsers()
  const expectedHash = users[username.toLowerCase().trim()]

  if (!expectedHash) {
    // Consistent timing to prevent username enumeration
    hashPassword('dummy_timing_value')
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const inputHash = hashPassword(password)

  if (inputHash !== expectedHash) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set('rff_session', process.env.SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })

  return response
}
