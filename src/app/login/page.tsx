'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push(from)
        router.refresh()
      } else {
        setError('Incorrect username or password. Please try again.')
        setPassword('')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f2010',
      fontFamily: "'Georgia', serif",
      padding: '2rem',
    }}>

      {/* Subtle organic background texture */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(92,184,50,0.06) 0%, transparent 60%),
                          radial-gradient(ellipse at 80% 20%, rgba(26,61,26,0.4) 0%, transparent 50%)`,
        pointerEvents: 'none',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(92,184,50,0.2)',
        borderRadius: '4px',
        padding: '2.5rem 2rem',
      }}>

        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1rem',
            background: 'rgba(92,184,50,0.1)',
            borderRadius: '50%',
            border: '1px solid rgba(92,184,50,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#5cb832" strokeWidth="1"/>
              <path d="M14 22 L14 10" stroke="#5cb832" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M14 14 Q9 10 7 6" stroke="#1a3d1a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M14 12 Q19 8 21 5" stroke="#1a3d1a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M14 16 Q10 13 8 10" stroke="#2d5c1e" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <path d="M14 15 Q18 12 20 9" stroke="#2d5c1e" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <ellipse cx="10" cy="22" rx="4" ry="2.5" fill="#3d2b0a" opacity="0.8"/>
              <ellipse cx="18" cy="22" rx="4" ry="2.5" fill="#3d2b0a" opacity="0.8"/>
            </svg>
          </div>
          <p style={{
            color: '#5cb832',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: 0,
            fontFamily: "'Georgia', serif",
          }}>Rob's Food Forest</p>
          <h1 style={{
            color: '#e8f5e0',
            fontSize: '18px',
            fontWeight: 400,
            margin: '0.4rem 0 0',
            letterSpacing: '0.02em',
          }}>Preview Access</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              color: 'rgba(232,245,224,0.5)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoCapitalize="none"
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(92,184,50,0.2)',
                borderRadius: '3px',
                color: '#e8f5e0',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
                fontFamily: "'Georgia', serif",
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(92,184,50,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(92,184,50,0.2)'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'rgba(232,245,224,0.5)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(92,184,50,0.2)',
                borderRadius: '3px',
                color: '#e8f5e0',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
                fontFamily: "'Georgia', serif",
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(92,184,50,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(92,184,50,0.2)'}
            />
          </div>

          {error && (
            <p style={{
              color: '#e88c6a',
              fontSize: '13px',
              marginBottom: '1rem',
              padding: '0.5rem 0.75rem',
              background: 'rgba(232,140,106,0.08)',
              border: '1px solid rgba(232,140,106,0.2)',
              borderRadius: '3px',
              margin: '0 0 1rem',
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: loading ? 'rgba(92,184,50,0.3)' : 'rgba(92,184,50,0.15)',
              border: '1px solid rgba(92,184,50,0.4)',
              borderRadius: '3px',
              color: '#5cb832',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              fontFamily: "'Georgia', serif",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.background = 'rgba(92,184,50,0.25)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.background = 'rgba(92,184,50,0.15)'
              }
            }}
          >
            {loading ? 'Entering...' : 'Enter'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          color: 'rgba(232,245,224,0.2)',
          fontSize: '11px',
          marginTop: '1.5rem',
          marginBottom: 0,
          letterSpacing: '0.05em',
        }}>
          This site is password protected
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
