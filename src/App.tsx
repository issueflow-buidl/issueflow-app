import { useEffect, useState } from 'react'
import './App.css'

type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'issueflow-theme'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <main className="app-shell">
      <section className="dashboard-hero" aria-labelledby="dashboard-title">
        <nav className="topbar" aria-label="Primary navigation">
          <a className="brand" href="/" aria-label="IssueFlow home">
            <span className="brand-mark">IF</span>
            <span>IssueFlow</span>
          </a>

          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(nextTheme)}
            aria-label={`Switch to ${nextTheme} mode`}
            aria-pressed={theme === 'dark'}
          >
            <span className="toggle-track" aria-hidden="true">
              <span className="toggle-thumb">{theme === 'light' ? 'L' : 'D'}</span>
            </span>
            <span>{theme === 'light' ? 'Light' : 'Dark'} mode</span>
          </button>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Open-source issue operations</p>
            <h1 id="dashboard-title">Ship fixes, track bounties, and keep rewards visible.</h1>
            <p className="hero-text">
              IssueFlow brings GitHub issues, wallet readiness, and USDC reward status into one focused workspace.
            </p>
            <div className="hero-actions" aria-label="Dashboard actions">
              <a className="primary-action" href="#bounties">View bounties</a>
              <a className="secondary-action" href="#wallet">Connect wallet</a>
            </div>
          </div>

          <aside className="status-card" aria-label="IssueFlow workspace status">
            <div className="status-card-header">
              <span>Workspace pulse</span>
              <strong>Live</strong>
            </div>
            <dl className="metrics">
              <div>
                <dt>Open issues</dt>
                <dd>128</dd>
              </div>
              <div>
                <dt>Active bounties</dt>
                <dd>42</dd>
              </div>
              <div>
                <dt>USDC queued</dt>
                <dd>$8.4k</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
