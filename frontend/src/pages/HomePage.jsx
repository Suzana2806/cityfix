.hero {
  min-height: 92vh;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-overlay {
  width: 100%;
  padding: 60px 8vw 80px;
  background: linear-gradient(180deg, rgba(24,34,37,0) 0%, rgba(24,34,37,0.55) 40%, rgba(24,34,37,0.92) 100%);
  color: white;
}

.hero-eyebrow {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 20px;
  padding: 6px 14px;
  margin-bottom: 20px;
}

.hero h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(48px, 9vw, 108px);
  line-height: 0.95;
  margin: 0 0 20px;
  letter-spacing: 0.5px;
}

.hero h1 em {
  font-style: normal;
  color: #E1531F;
}

.hero p {
  font-size: clamp(16px, 2vw, 20px);
  max-width: 520px;
  color: rgba(255,255,255,0.85);
  margin: 0 0 28px;
  line-height: 1.5;
}

.hero-cta {
  display: inline-block;
  background: #E1531F;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  padding: 16px 32px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.hero-cta:hover {
  background: #ff6a35;
}

.how {
  max-width: 960px;
  margin: 0 auto;
  padding: 80px 24px;
}

.how h2 {
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 36px;
  margin: 0 0 40px;
  text-align: center;
}

.how-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.how-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  color: #2E6F8E;
  font-weight: 600;
}

.how-card h3 {
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 22px;
  margin: 8px 0 8px;
}

.how-card p {
  color: #57666A;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 700px) {
  .how-grid {
    grid-template-columns: 1fr;
  }
}