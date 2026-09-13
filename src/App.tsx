import { useState } from 'react';
import { motion } from 'framer-motion';

const TERMINAL = 'https://ai.ipeset.com';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="kicker">{children}</div>;
}

/* ---------------- HEADER ---------------- */
const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#how', label: 'How It Works' },
  { href: '#ai', label: 'AI Intelligence' },
  { href: '#features', label: 'Features' },
  { href: '#risk', label: 'Risk Management' },
  { href: '#tech', label: 'Technology' },
  { href: '#faq', label: 'FAQ' },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="hdr">
      <div className="hdr-in">
        <a href="#home" className="logo">◈ <span>NEXUS&nbsp;AI</span></a>
        <nav className="nav">
          {NAV.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="hdr-cta">
          <a className="btn ghost sm" href={TERMINAL}>Login</a>
          <a className="btn primary sm" href={TERMINAL}>Launch Terminal</a>
        </div>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <div className="mob-nav">
          {NAV.map(n => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
          <a className="btn primary sm" href={TERMINAL} onClick={() => setOpen(false)}>Launch Terminal</a>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" />
      <div className="wrap hero-grid">
        <div>
          <Reveal>
            <Kicker>AI-POWERED CRYPTO TRADING INTELLIGENCE</Kicker>
            <h1 className="h-xl">TRADE WITH<br />INTELLIGENCE.<br /><span className="grad">NOT EMOTION.</span></h1>
            <p className="lead">NEXUS AI combines real-time market data, quantitative analysis and specialized AI agents to help traders understand market conditions, identify high-quality opportunities and manage risk with greater structure.</p>
            <div className="row-gap">
              <a className="btn primary" href="#what">EXPLORE NEXUS AI</a>
              <a className="btn ghost" href="#how">HOW IT WORKS</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="flow">
            {[
              { t: 'REAL-TIME MARKET DATA', s: 'live feeds · validated · timestamped' },
              { t: 'AI INTELLIGENCE', s: '8 specialized agents · consensus' },
              { t: 'RISK ENGINE', s: 'ARES · position · exposure · veto' },
              { t: 'CLEARER DECISION', s: 'LONG · SHORT · or NO TRADE' },
            ].map((n, i) => (
              <div key={n.t}>
                <div className="flow-node">
                  <span className="flow-idx">0{i + 1}</span>
                  <div><b>{n.t}</b><small>{n.s}</small></div>
                </div>
                {i < 3 && <div className="flow-link"><span className="dot-run" style={{ animationDelay: `${i * 0.5}s` }} /></div>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="hero-strip">
        <span>REAL MARKET DATA</span><span>MULTI-AGENT AI</span><span>QUANTITATIVE ANALYSIS</span><span>LIQUIDITY INTELLIGENCE</span><span>ORDER FLOW</span><span>MULTI-TIMEFRAME</span><span>RISK MANAGEMENT</span><span>PAPER TRADING</span><span>OPTIONAL LIVE EXECUTION</span>
      </div>
    </section>
  );
}

/* ---------------- WHAT IS ---------------- */
function WhatIs() {
  return (
    <section id="what" className="sec">
      <div className="wrap">
        <Reveal><Kicker>WHAT IS NEXUS AI?</Kicker><h2>ONE INTELLIGENCE LAYER<br />FOR THE ENTIRE MARKET.</h2>
          <p className="lead narrow">Crypto markets generate massive amounts of information. Price, volume, liquidity, order flow, funding, open interest and market structure can all change rapidly. NEXUS AI brings these different layers into one intelligent workspace.</p></Reveal>
        <div className="grid3">
          {[
            { t: 'REAL-TIME DATA', d: 'Live market information, price movements, volume and market activity.', v: 'particles' },
            { t: 'AI INTELLIGENCE', d: 'Multiple specialized AI agents analyze different aspects of the market.', v: 'nodes' },
            { t: 'RISK CONTROL', d: 'Every potential setup is evaluated through a dedicated risk layer.', v: 'shield' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div className="card big">
                <div className={`viz viz-${c.v}`} aria-hidden />
                <h3>{c.t}</h3><p>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROBLEM ---------------- */
function Problem() {
  const chips = ['Charts', 'News', 'Order Book', 'Funding', 'Open Interest', 'Liquidations', 'Indicators', 'Volume', 'Market Data'];
  return (
    <section className="sec alt">
      <div className="wrap center">
        <Reveal><Kicker>THE PROBLEM</Kicker><h2>THE MARKET IS FULL OF INFORMATION.<br />THE REAL PROBLEM IS<br /><span className="grad">KNOWING WHAT MATTERS.</span></h2></Reveal>
        <Reveal delay={0.1}>
          <div className="scatter">
            {chips.map((c, i) => <span key={c} className="sc-chip" style={{ '--i': i } as React.CSSProperties}>{c}</span>)}
          </div>
          <div className="too-much">TOO MUCH INFORMATION.</div>
          <div className="arrow-down">↓</div>
          <div className="nexus-pill">NEXUS AI</div>
          <div className="arrow-down">↓</div>
          <div className="one-view">ONE STRUCTURED VIEW.</div>
        </Reveal>
        <Reveal delay={0.15}><p className="lead narrow center-mt">Instead of switching between multiple tools, NEXUS AI helps organize important market information into one structured decision-making process.</p></Reveal>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { n: '01', t: 'COLLECT', d: 'Real-time market information is collected from connected exchanges and data sources.' },
    { n: '02', t: 'ANALYZE', d: 'Technical analysis, liquidity, order flow, quantitative models and market context are processed.' },
    { n: '03', t: 'CONSENSUS', d: 'Specialized AI agents independently analyze different aspects of the market.' },
    { n: '04', t: 'CONTROL', d: 'The risk engine evaluates the setup before it can move forward.' },
  ];
  return (
    <section id="how" className="sec">
      <div className="wrap">
        <Reveal><Kicker>HOW IT WORKS</Kicker><h2>FROM RAW DATA<br />TO A CLEARER DECISION.</h2></Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="step">
                <span className="step-n">{s.n}</span>
                <div><h3>{s.t}</h3><p>{s.d}</p></div>
              </div>
              {i < 3 && <div className="step-arrow">↓</div>}
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="flow-line">
            {['DATA', 'INTELLIGENCE', 'CONSENSUS', 'RISK', 'DECISION'].map((w, i, a) => (
              <span key={w} className="fl-item">{i < a.length - 1 ? <>{w} <em>→</em></> : w}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- AGENTS ---------------- */
const AGENTS = [
  { n: 'NOVA', r: 'Market Structure', a: ['Trend', 'Support', 'Resistance', 'BOS', 'CHOCH'] },
  { n: 'ORION', r: 'Price Action', a: ['Momentum', 'Breakouts', 'Rejections', 'Retests'] },
  { n: 'LUMA', r: 'Order Flow', a: ['Buyers', 'Sellers', 'Volume Pressure', 'Market Activity'] },
  { n: 'ATLAS', r: 'Liquidity', a: ['Liquidity Zones', 'Stop Clusters', 'Sweeps', 'Order Blocks'] },
  { n: 'GANN', r: 'Time & Price', a: ['Price Cycles', 'Time Cycles', 'Gann Levels', 'Symmetry'] },
  { n: 'MACRO', r: 'Market Context', a: ['Market Conditions', 'Macro Factors', 'Sentiment'] },
  { n: 'QUANT', r: 'Quantitative Analysis', a: ['Volatility', 'Momentum', 'Probability', 'History'] },
  { n: 'ARES', r: 'Risk Management', a: ['Position Size', 'Stop Distance', 'Leverage', 'Exposure'], special: true },
];

function Agents() {
  return (
    <section id="ai" className="sec alt">
      <div className="wrap">
        <Reveal><Kicker>AI AGENTS</Kicker><h2>NOT ONE AI.<br /><span className="grad">A TEAM OF SPECIALISTS.</span></h2>
          <p className="lead narrow">Different market questions require different types of intelligence.</p></Reveal>
        <div className="grid4">
          {AGENTS.map((g, i) => (
            <Reveal key={g.n} delay={(i % 4) * 0.08}>
              <div className={`card agent ${g.special ? 'ares' : ''}`}>
                <div className="agent-top"><span className="agent-ic">{g.special ? '🛡' : '◈'}</span><span className="pulse" /></div>
                <h3>{g.n}</h3>
                <div className="agent-role">{g.r}</div>
                <div className="chips">{g.a.map(x => <span key={x}>{x}</span>)}</div>
                {g.special && <p className="veto">ARES can reject a trade even if other agents agree.</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PERSPECTIVES ---------------- */
function Perspectives() {
  const rows = [['NOVA', 'Structure'], ['ORION', 'Price Action'], ['LUMA', 'Order Flow'], ['ATLAS', 'Liquidity'], ['GANN', 'Cycles'], ['MACRO', 'Context'], ['QUANT', 'Probability']];
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><Kicker>MULTIPLE PERSPECTIVES</Kicker><h2>ONE MARKET.<br />MULTIPLE PERSPECTIVES.</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="net">
            <div className="net-col">
              {rows.map(([a, b]) => <div key={a} className="net-node"><b>{a}</b><span>{b}</span></div>)}
            </div>
            <div className="net-mid">
              <div className="net-arrow">→</div>
              <div className="consensus-box">NEXUS<br />CONSENSUS</div>
              <div className="net-arrow">→</div>
            </div>
            <div className="net-col out">
              <div className="out-long">LONG</div>
              <div className="out-short">SHORT</div>
              <div className="out-no">NO TRADE</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- NO TRADE ---------------- */
function NoTrade() {
  return (
    <section className="sec alt">
      <div className="wrap center">
        <Reveal><Kicker>DISCIPLINE</Kicker><h2>SOMETIMES THE BEST DECISION<br />IS <span className="grad">NO TRADE.</span></h2>
          <p className="lead narrow center-mt">NEXUS AI is not designed to create a signal every minute. If market conditions are unclear, risk is too high, agents strongly disagree, or the available setup does not meet the required conditions, the system can simply say: NO TRADE.</p></Reveal>
        <div className="cmp">
          <Reveal>
            <div className="card cmp-card yes">
              <div className="chips col"><span>HIGH CONFIDENCE</span><span>GOOD RISK / REWARD</span><span>MULTIPLE CONFIRMATIONS</span></div>
              <div className="arrow-down">↓</div>
              <div className="verdict up">TRADE SETUP</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card cmp-card no">
              <div className="chips col"><span>UNCLEAR MARKET</span><span>HIGH RISK</span><span>WEAK CONFIRMATION</span></div>
              <div className="arrow-down">↓</div>
              <div className="verdict no">NO TRADE</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- RISK ---------------- */
function Risk() {
  const items = ['Position Size', 'Stop Loss', 'Risk Per Trade', 'Risk / Reward', 'Leverage', 'Portfolio Exposure', 'Drawdown'];
  return (
    <section id="risk" className="sec">
      <div className="wrap">
        <Reveal><Kicker>RISK MANAGEMENT</Kicker><h2>INTELLIGENCE IS NOT ENOUGH.<br /><span className="grad">RISK COMES FIRST.</span></h2>
          <p className="lead narrow">A market signal is not automatically a trade. Every potential setup passes through the ARES Risk Engine.</p></Reveal>
        <Reveal delay={0.1}>
          <div className="risk-flow">
            <div className="rf-node">AI SIGNAL</div><span className="rf-arr">↓</span>
            <div className="rf-node ares">ARES RISK ENGINE</div><span className="rf-arr">↓</span>
            <div className="rf-split"><div className="rf-node ok">APPROVED</div><div className="rf-node bad">REJECTED</div></div>
          </div>
          <div className="chips wrap-chips">{items.map(i => <span key={i}>{i}</span>)}</div>
          <div className="veto-banner">THE RISK ENGINE HAS VETO POWER.</div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- REAL DATA ---------------- */
function RealData() {
  const cards = ['LIVE PRICE', 'ORDER BOOK', 'TRADES', 'VOLUME', 'OPEN INTEREST', 'FUNDING', 'LIQUIDATIONS', 'MARKET STRUCTURE'];
  return (
    <section id="features" className="sec alt">
      <div className="wrap">
        <Reveal><Kicker>DATA</Kicker><h2>BUILT AROUND<br />REAL MARKET DATA.</h2></Reveal>
        <div className="grid4">{cards.map((c, i) => <Reveal key={c} delay={(i % 4) * 0.06}><div className="card data-c"><span className="live-dot" />{c}</div></Reveal>)}</div>
        <Reveal delay={0.15}>
          <div className="flow-line data-strip">
            <span>LIVE DATA</span><span>SOURCE VERIFIED</span><span>TIMESTAMPED</span>
          </div>
          <p className="lead narrow center-mt">NEXUS AI is designed to work with live market infrastructure instead of static screenshots or manually entered prices.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SEE BEYOND ---------------- */
function SeeBeyond() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><Kicker>DEPTH</Kicker><h2>PRICE IS ONLY ONE PART<br />OF THE MARKET.</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="terminal-mock">
            <div className="tm-bar"><span /><span /><span /></div>
            <div className="tm-body">
              <div className="tm-chart">
                {[38, 52, 44, 60, 55, 70, 64, 78, 72, 66, 80, 74, 88, 82, 90].map((h, i) => <div key={i} className="tm-bar-c" style={{ height: `${h}%` }} />)}
                <div className="tm-zone z1" />
                <div className="tm-zone z2" />
              </div>
              <div className="tm-side">
                {['Liquidity Zones', 'Order Flow', 'Volume', 'Open Interest', 'Funding', 'Liquidations', 'Market Structure'].map(x => <div key={x} className="tm-row">{x}</div>)}
              </div>
            </div>
            <div className="tm-label">PREVIEW — SIMPLIFIED ILLUSTRATION</div>
          </div>
        </Reveal>
        <Reveal delay={0.15}><p className="lead narrow center-mt">NEXUS AI combines different market dimensions to provide a broader view of what is happening behind price movement.</p></Reveal>
      </div>
    </section>
  );
}

/* ---------------- MULTI-TIMEFRAME ---------------- */
function MultiTF() {
  const rows = [['5M', 'BULLISH', 'up'], ['15M', 'BULLISH', 'up'], ['1H', 'BULLISH', 'up'], ['4H', 'NEUTRAL', 'flat'], ['1D', 'BULLISH', 'up']];
  return (
    <section id="tech" className="sec alt">
      <div className="wrap">
        <Reveal><Kicker>MULTI-TIMEFRAME</Kicker><h2>SEE THE MARKET<br />FROM MORE THAN ONE ANGLE.</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="tf-table">
            <div className="tf-head"><span>TIMEFRAME</span><span>MARKET VIEW</span></div>
            {rows.map(([a, b, c]) => <div key={a} className="tf-row"><span>{a}</span><span className={`tf-${c}`}>{b}</span></div>)}
            <div className="tf-cons">MULTI-TIMEFRAME CONSENSUS</div>
          </div>
        </Reveal>
        <Reveal delay={0.15}><p className="lead narrow center-mt">NEXUS AI compares different timeframes to identify alignment, conflicts and broader market context.</p></Reveal>
      </div>
    </section>
  );
}

/* ---------------- PAPER ---------------- */
function Paper() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><Kicker>PAPER TRADING</Kicker><h2>TEST BEFORE<br />YOU RISK CAPITAL.</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="flow-line paper-eq">
            <span>REAL MARKET DATA</span><em>+</em><span>PAPER ACCOUNT</span><em>=</em><span className="hl">RISK-FREE PRACTICE</span>
          </div>
          <p className="lead narrow center-mt">Explore strategies and trading ideas using market-based simulations before connecting a live trading account.</p>
          <div className="chips wrap-chips">
            {['Test Entries', 'Test Stop Loss', 'Test Take Profit', 'Test Position Sizing', 'Test Risk Management'].map(x => <span key={x}>{x}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- BACKTEST ---------------- */
function Backtest() {
  const m = ['WIN RATE', 'PROFIT FACTOR', 'MAX DRAWDOWN', 'EXPECTANCY', 'SHARPE RATIO', 'NUMBER OF TRADES'];
  return (
    <section className="sec alt">
      <div className="wrap">
        <Reveal><Kicker>BACKTESTING</Kicker><h2>TURN IDEAS<br />INTO DATA.</h2>
          <p className="lead narrow">Test strategies against historical market conditions and evaluate performance through measurable metrics.</p></Reveal>
        <div className="grid3">
          {m.map((x, i) => <Reveal key={x} delay={(i % 3) * 0.06}><div className="card metric-c"><div className="metric-name">{x}</div><div className="metric-ph">— — —</div></div></Reveal>)}
        </div>
        <Reveal delay={0.1}><div className="example-tag">EXAMPLE ANALYTICS — placeholder metrics only. NEXUS AI never displays fabricated results.</div></Reveal>
      </div>
    </section>
  );
}

/* ---------------- LIVE ---------------- */
function Live() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><Kicker>LIVE TRADING — OPTIONAL</Kicker><h2>FROM ANALYSIS TO EXECUTION.<br />WHEN YOU ARE READY.</h2>
          <p className="lead narrow">Users can begin with market analysis, paper trading and strategy testing. Live exchange connectivity is optional and should only be activated when the user explicitly chooses.</p></Reveal>
        <Reveal delay={0.1}>
          <div className="flow-line">
            {['ANALYSIS', 'CONSENSUS', 'RISK VALIDATION', 'EXECUTION ENGINE', 'EXCHANGE'].map((w, i, a) => (
              <span key={w} className="fl-item">{i < a.length - 1 ? <>{w} <em>→</em></> : w}</span>
            ))}
          </div>
          <div className="exch">{['BINANCE', 'BYBIT', 'OKX'].map(x => <span key={x} className="exch-c">{x}</span>)}</div>
          <div className="veto-banner">LIVE TRADING IS OPTIONAL.</div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SECURITY ---------------- */
function Security() {
  const cards = [
    ['ENCRYPTED CREDENTIALS', 'API secrets are never stored or transmitted in plain text.'],
    ['TWO-FACTOR AUTHENTICATION', 'Extra verification for sensitive actions.'],
    ['ROLE-BASED ACCESS', 'Granular permissions per user role.'],
    ['AUDIT LOGS', 'Important actions are recorded and traceable.'],
    ['RISK LIMITS', 'Hard caps on exposure, leverage and daily loss.'],
    ['EMERGENCY KILL SWITCH', 'Stop new trades and flatten positions instantly.'],
  ];
  return (
    <section className="sec alt">
      <div className="wrap">
        <Reveal><Kicker>SECURITY</Kicker><h2>BUILT WITH CONTROL<br />IN MIND.</h2></Reveal>
        <div className="grid3">
          {cards.map(([t, d], i) => <Reveal key={t} delay={(i % 3) * 0.06}><div className="card sec-c"><h3>🔒 {t}</h3><p>{d}</p></div></Reveal>)}
        </div>
        <Reveal delay={0.15}><div className="veto-banner soft">Withdrawal permissions are never required.</div>
          <p className="lead narrow center-mt">Trading infrastructure requires more than intelligent analysis. NEXUS AI is designed around control, validation and transparency.</p></Reveal>
      </div>
    </section>
  );
}

/* ---------------- WHO FOR ---------------- */
function WhoFor() {
  const cards = [
    ['ACTIVE TRADERS', 'For traders who need a structured view of fast-moving markets.'],
    ['QUANT TRADERS', 'For users interested in data-driven analysis, backtesting and systematic research.'],
    ['PROFESSIONAL TEAMS', 'For teams that need centralized market intelligence and risk control.'],
    ['DEVELOPING TRADERS', 'For traders who want to build a more structured decision process.'],
  ];
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><Kicker>AUDIENCE</Kicker><h2>BUILT FOR TRADERS<br />WHO WANT MORE STRUCTURE.</h2></Reveal>
        <div className="grid4">
          {cards.map(([t, d], i) => <Reveal key={t} delay={(i % 4) * 0.06}><div className="card"><h3>{t}</h3><p>{d}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ADVANTAGE ---------------- */
function Advantage() {
  return (
    <section className="sec alt">
      <div className="wrap">
        <Reveal><Kicker>THE NEXUS ADVANTAGE</Kicker><h2>ONE WORKSPACE.<br /><span className="grad">MULTIPLE INTELLIGENCE LAYERS.</span></h2></Reveal>
        <div className="cmp">
          <Reveal><div className="card cmp-card">
            <h3 className="cmp-t">TRADITIONAL WORKFLOW</h3>
            {['Chart', 'Indicators', 'News', 'Order Book', 'Risk Calculator', 'Exchange'].map(x => <div key={x} className="trad-row">{x}</div>)}
          </div></Reveal>
          <Reveal delay={0.1}><div className="card cmp-card nexus">
            <h3 className="cmp-t grad">NEXUS AI</h3>
            <div className="chips wrap-chips">{['MARKET DATA', 'AI AGENTS', 'QUANT', 'LIQUIDITY', 'ORDER FLOW', 'RISK ENGINE'].map(x => <span key={x}>{x}</span>)}</div>
            <div className="arrow-down">↓</div>
            <div className="one-ws">ONE INTELLIGENT WORKSPACE</div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WORKFLOW ---------------- */
function Workflow() {
  const steps = [
    ['01', 'SELECT MARKET', 'BTC · ETH · SOL and more'],
    ['02', 'ANALYZE', 'The market is processed through multiple intelligence layers.'],
    ['03', 'REVIEW', 'See market context, AI consensus, risk and potential setup.'],
    ['04', 'SIMULATE', 'Test with paper trading and strategy analysis.'],
    ['05', 'EXECUTE', 'Optionally connect to supported exchanges.'],
  ];
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><Kicker>SIMPLE WORKFLOW</Kicker><h2>FROM MARKET<br />TO DECISION.</h2></Reveal>
        <div className="wf-row">
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="wf-step"><span className="step-n">{n}</span><h4>{t}</h4><p>{d}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="final">
      <div className="final-glow" />
      <div className="wrap center">
        <Reveal>
          <h2 className="h-xl center-h">UNDERSTAND THE MARKET.<br />CONTROL THE RISK.<br /><span className="grad">TRADE WITH INTELLIGENCE.</span></h2>
          <p className="lead narrow center-mt">NEXUS AI brings together real-time market data, AI intelligence, quantitative analysis, liquidity analysis and risk management into one powerful trading workspace.</p>
          <div className="row-gap center-row">
            <a className="btn primary lg" href="#what">EXPLORE NEXUS AI</a>
            <a className="btn ghost lg" href={TERMINAL}>LAUNCH TERMINAL →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS: [string, string][] = [
  ['What is NEXUS AI?', 'NEXUS AI is an AI-powered crypto trading intelligence platform: real-time market data, multiple specialized analysis agents, a weighted consensus engine, a risk engine with veto power, paper trading and backtesting — in one structured workspace.'],
  ['Does NEXUS AI guarantee profits?', 'No. NEXUS AI is an analysis and trading intelligence platform. Financial markets are uncertain and no system can guarantee profits.'],
  ['Does NEXUS AI use real market data?', 'Yes. Prices, candles, order books and trades come from live public exchange feeds (Binance, Bybit, OKX). If a data source becomes stale or unavailable, the system says so and stops issuing new signals.'],
  ['Can I use NEXUS AI without live trading?', 'Yes — that is the default. Analysis, signals, paper trading and backtesting work without any exchange connection.'],
  ['Does AI automatically execute trades?', 'No. AI never sends orders directly. Every potential trade must pass the ARES risk engine, and execution requires explicit user action.'],
  ['Which exchanges can be supported?', 'The adapter architecture supports Binance, Bybit and OKX today, and new exchanges can be added without rewriting the platform.'],
  ['Is my exchange API required to have withdrawal permissions?', 'No. Withdrawal permissions should not be required — and the platform never asks for them.'],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="sec alt">
      <div className="wrap narrow">
        <Reveal><Kicker>FAQ</Kicker><h2>QUESTIONS,<br />ANSWERED HONESTLY.</h2></Reveal>
        <div className="faq">
          {FAQS.map(([q, a], i) => (
            <div key={q} className={`faq-i ${open === i ? 'on' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)}>{q}<span>{open === i ? '−' : '+'}</span></button>
              {open === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Foot() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div>
          <div className="logo">◈ <span>NEXUS&nbsp;AI</span></div>
          <p className="ftr-tag">AI-POWERED CRYPTO TRADING INTELLIGENCE</p>
        </div>
        <div className="ftr-col"><b>Product</b>
          <a href="#how">How It Works</a><a href="#ai">AI Intelligence</a><a href="#features">Features</a><a href="#risk">Risk Management</a><a href="#tech">Technology</a><a href="#faq">FAQ</a>
        </div>
        <div className="ftr-col"><b>Legal</b>
          <a href="#faq">Terms</a><a href="#faq">Privacy</a><a href="#faq">Risk Disclosure</a>
        </div>
      </div>
      <div className="wrap ftr-disc">
        NEXUS AI provides market analysis, trading intelligence and technology tools. It does not guarantee profits or investment returns. Cryptocurrency trading involves significant risk. Users are responsible for their own trading decisions.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero /><WhatIs /><Problem /><HowItWorks /><Agents /><Perspectives /><NoTrade /><Risk /><RealData /><SeeBeyond /><MultiTF /><Paper /><Backtest /><Live /><Security /><WhoFor /><Advantage /><Workflow /><FinalCTA /><Faq />
      </main>
      <Foot />
    </>
  );
}
