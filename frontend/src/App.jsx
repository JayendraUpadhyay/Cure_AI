import React, { useState, useEffect } from 'react';
import BrainTumor  from './pages/BrainTumor';
import Diabetes    from './pages/Diabetes';
import Heart       from './pages/Heart';

/* Animated background particles */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top:   `${Math.random() * 100}%`,
  left:  `${Math.random() * 100}%`,
  dur:   `${6 + Math.random() * 10}s`,
  delay: `${-Math.random() * 12}s`,
  size:  Math.random() > 0.7 ? 3 : 2,
}));

const TABS = [
  { id: 'brain',    icon: '🧠', label: 'Brain Tumor'  },
  { id: 'diabetes', icon: '🩸', label: 'Diabetes'     },
  { id: 'heart',    icon: '❤️', label: 'Heart Disease' },
];

export default function App() {
  const [active, setActive] = useState('brain');

  return (
    <div className="app-shell">

      {/* ── Animated Background ── */}
      <div className="bg-canvas">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-grid" />
        <div className="bg-particles">
          {PARTICLES.map(p => (
            <div key={p.id} className="particle" style={{
              top: p.top, left: p.left,
              '--dur':   p.dur,
              '--delay': p.delay,
              width: p.size, height: p.size,
            }} />
          ))}
        </div>
      </div>

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">🏥</div>
          <span className="nav-title">Cure<span>AI</span></span>
          <span className="nav-pill">Beta v1.0</span>
        </div>

        <div className="nav-center">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`nav-tab ${active === t.id ? 'active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span className="nav-tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <div className="status-badge">
            <div className="status-dot" />
            All Systems Online
          </div>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <main className="main">
        {active === 'brain'    && <BrainTumor  />}
        {active === 'diabetes' && <Diabetes    />}
        {active === 'heart'    && <Heart       />}
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-brand">🏥 Cure<span>AI</span> — Medical Intelligence Platform</div>
        <div className="footer-note">
          For research &amp; educational use only · Not a clinical diagnostic tool · Always consult a licensed physician
        </div>
      </footer>

    </div>
  );
}
