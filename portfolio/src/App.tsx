import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

type IconName =
  | "arrow"
  | "award"
  | "briefcase"
  | "code"
  | "download"
  | "external"
  | "github"
  | "linkedin"
  | "mail"
  | "menu"
  | "moon"
  | "play"
  | "spark"
  | "sun"
  | "volume"
  | "x";
const iconPaths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.2 13 7 22l5-3 5 3-1.2-9" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  code: (
    <>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
    </>
  ),
  external: (
    <>
      <path d="M15 4h5v5M20 4l-9 9" />
      <path d="M18 13v6H5V6h6" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 0 15 2a13.4 13.4 0 0 0-7 0C5 .1 3.8.5 3.8.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.3 3.5 6.5 6.8 6.9A4.8 4.8 0 0 0 8 18v4" />
      <path d="M8 19c-3 .9-3-1.5-4-2" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="9" width="4" height="12" />
      <path d="M5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM11 21v-7a5 5 0 0 1 10 0v7M11 9v12" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
  play: <path d="m8 5 11 7-11 7Z" />,
  spark: <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  volume: (
    <>
      <path d="M11 5 6 9H3v6h3l5 4Z" />
      <path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12" />
    </>
  ),
  x: <path d="m5 5 14 14M19 5 5 19" />,
};
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

const skills = [
  ["01", "Code", "Python · C · C++ · SQL", 86],
  ["02", "Web systems", "Flask · HTML · CSS · Backend", 84],
  ["03", "Electronics", "IoT · Arduino · Verilog · MATLAB", 79],
  ["04", "Intelligence", "LLMs · AI applications · Automation", 82],
];
const projects = [
  {
    number: "01",
    title: "TrustGuard AI",
    subtitle: "Scam detection & digital risk",
    copy: "An LLM-powered web application that analyzes suspicious content, detects scam patterns and translates digital risk into clear, actionable signals.",
    image: "",
    tags: ["LLMs", "Python", "Flask"],
    tone: "blue",
  },
  {
    number: "02",
    title: "Uzhavar Connect",
    subtitle: "Smart farmer support platform",
    copy: "A community-first platform connecting farmers with intelligent crop support, shared knowledge and accessible digital tools. Awarded first prize at TECHATHON 2025.",
    image: "/assets/uzhavar-connect.png",
    tags: ["Web", "Design thinking", "AI"],
    tone: "lime",
  },
  {
    number: "03",
    title: "Smart Spoon AI",
    subtitle: "SIH 2026 · College phase 2",
    copy: "An AI-powered smart eating assistant designed to make everyday nutrition more aware, supportive and intelligent.",
    image: "",
    tags: ["AI", "Product design", "SIH"],
    tone: "pink",
  },
  {
    number: "04",
    title: "SafeHer",
    subtitle: "Women safety mobile experience",
    copy: "An emergency-first safety application designed for rapid assistance and dependable security features when every second matters.",
    image: "/assets/women-safety-demo.gif.png",
    tags: ["Safety", "Mobile", "Human UX"],
    tone: "lime",
  },
];

function AnimeMuse({ mouse, scroll }: { mouse: { x: number; y: number }; scroll: number }) {
  return (
    <div
      className="muse-wrap portrait-muse"
      aria-label="Cursor-reactive anime portrait"
      style={
        {
          "--look-x": `${mouse.x * 11}px`,
          "--look-y": `${mouse.y * 8}px`,
          "--tilt-x": `${mouse.y * -3.5}deg`,
          "--tilt-y": `${mouse.x * 5}deg`,
          "--portrait-scroll": `${Math.min(scroll * 55, 20)}px`,
        } as CSSProperties
      }
    >
      <div className="muse-halo" />
      <div className="muse-orbit orbit-one" />
      <div className="muse-orbit orbit-two" />
      <div className="portrait-frame">
        <div className="portrait-aura" />
        <img src="/assets/sindhuja-anime.avif" alt="Anime-inspired portrait of Sindhuja" />
        <div className="portrait-light" />
        <div className="portrait-scan" />
      </div>
      <div className="muse-data data-a">
        <b>01</b>
        <span>Software</span>
      </div>
      <div className="muse-data data-b">
        <b>02</b>
        <span>Electronics</span>
      </div>
      <div className="muse-caption">
        <span>Digital alter ego</span>
        <i />
        <span>Cursor reactive</span>
      </div>
    </div>
  );
}

function Game({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"home" | "signal" | "quest">("home");
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [pos, setPos] = useState({ x: 50, y: 48 });
  const [question, setQuestion] = useState(0);
  const [questScore, setQuestScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const move = () => setPos({ x: 8 + Math.random() * 80, y: 14 + Math.random() * 70 });
  const missions = [
    {
      project: "TrustGuard AI",
      clue: "Detects scams and assesses digital risk.",
      answer: "LLMs",
      options: ["Arduino", "LLMs", "Verilog"],
    },
    {
      project: "Uzhavar Connect",
      clue: "Connects farmers directly with buyers.",
      answer: "Web platform",
      options: ["Web platform", "MATLAB", "Sensors"],
    },
    {
      project: "Smart Spoon AI",
      clue: "An intelligent eating assistant selected for SIH.",
      answer: "AI application",
      options: ["SQL only", "Automation", "AI application"],
    },
    {
      project: "Home Automation",
      clue: "Remote monitoring for connected devices.",
      answer: "IoT",
      options: ["IoT", "CSS", "Flask only"],
    },
  ];
  useEffect(() => {
    if (!active || time <= 0) return;
    const timer = window.setTimeout(() => setTime((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [active, time]);
  const startSignal = () => {
    setScore(0);
    setTime(15);
    setActive(true);
    move();
  };
  const startQuest = () => {
    setQuestion(0);
    setQuestScore(0);
    setFeedback("");
    setMode("quest");
  };
  const answer = (choice: string) => {
    if (feedback) return;
    const correct = choice === missions[question].answer;
    setFeedback(correct ? "Signal matched" : `Best match: ${missions[question].answer}`);
    if (correct) setQuestScore((value) => value + 1);
    window.setTimeout(() => {
      setQuestion((value) => value + 1);
      setFeedback("");
    }, 850);
  };
  const questDone = question >= missions.length;
  return (
    <div className="game-backdrop" role="dialog" aria-modal="true" aria-label="Portfolio arcade">
      <div className="game-panel">
        <button className="icon-button game-close" onClick={onClose} aria-label="Close game">
          <Icon name="x" />
        </button>
        <div className="eyebrow">Sindhuja OS / Portfolio arcade</div>
        {mode === "home" && (
          <>
            <h2>Choose a mission</h2>
            <p>Each game is wired into the same skills and systems behind my portfolio.</p>
            <div className="game-menu">
              <button onClick={() => setMode("signal")}>
                <span>01 / Reflex</span>
                <Icon name="spark" size={30} />
                <b>Signal Catch</b>
                <small>Capture unstable sensor packets.</small>
              </button>
              <button onClick={startQuest}>
                <span>02 / Knowledge</span>
                <Icon name="code" size={30} />
                <b>Project Protocol</b>
                <small>Match my projects to their core technology.</small>
              </button>
            </div>
          </>
        )}
        {mode === "signal" && (
          <>
            <button
              className="game-back"
              onClick={() => {
                setMode("home");
                setActive(false);
              }}
            >
              ← Arcade
            </button>
            <h2>Catch the signal</h2>
            <p>
              Capture sensor packets before the portal closes—just like catching real-world input in
              an embedded system.
            </p>
            <div className="game-stats">
              <span>
                Score <b>{score.toString().padStart(2, "0")}</b>
              </span>
              <span>
                Time <b>{time}s</b>
              </span>
            </div>
            <div className="game-field">
              <div className="game-grid" />
              {active && time > 0 && (
                <button
                  className="signal"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  onClick={() => {
                    setScore((value) => value + 1);
                    move();
                  }}
                  aria-label="Catch signal"
                >
                  <Icon name="spark" size={28} />
                </button>
              )}
              {(!active || time <= 0) && (
                <div className="game-center">
                  <span>{time <= 0 ? `Packet score: ${score}` : "Test your hardware reflex"}</span>
                  <button className="button primary" onClick={startSignal}>
                    <Icon name="play" size={17} />
                    {time <= 0 ? "Run again" : "Start system"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {mode === "quest" && (
          <>
            <button className="game-back" onClick={() => setMode("home")}>
              ← Arcade
            </button>
            {!questDone ? (
              <div className="quest-wrap">
                <div className="quest-progress">
                  <i style={{ width: `${((question + 1) / missions.length) * 100}%` }} />
                </div>
                <span className="quest-count">
                  Protocol {question + 1} / {missions.length}
                </span>
                <h2>{missions[question].project}</h2>
                <p>{missions[question].clue}</p>
                <div className="quest-options">
                  {missions[question].options.map((option) => (
                    <button key={option} onClick={() => answer(option)} disabled={!!feedback}>
                      {option}
                      <Icon name="arrow" size={17} />
                    </button>
                  ))}
                </div>
                <div className={feedback ? "quest-feedback show" : "quest-feedback"}>
                  {feedback}
                </div>
              </div>
            ) : (
              <div className="quest-result">
                <Icon name="award" size={48} />
                <span>Mission complete</span>
                <h2>
                  {questScore} / {missions.length}
                </h2>
                <p>
                  {questScore === missions.length
                    ? "Perfect match. You understand my builder DNA."
                    : "Systems improve through iteration. Ready for another run?"}
                </p>
                <button className="button primary" onClick={startQuest}>
                  Replay protocol
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    localStorage.getItem("theme") === "light" ? "light" : "dark",
  );
  const [menu, setMenu] = useState(false),
    [game, setGame] = useState(false),
    [speaking, setSpeaking] = useState(false),
    [mouse, setMouse] = useState({ x: 0, y: 0 }),
    [scroll, setScroll] = useState(0);
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: (e.clientX / innerWidth - 0.5) * 2, y: (e.clientY / innerHeight - 0.5) * 2 });
      if (cursor.current)
        cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    const onScroll = () => {
      const range = document.documentElement.scrollHeight - innerHeight;
      setScroll(range ? scrollY / range : 0);
    };
    addEventListener("mousemove", onMove);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("mousemove", onMove);
      removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in-view")),
      { threshold: 0.13 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const tilt = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
    e.currentTarget.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
  };
  const speakIntro = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const message = new SpeechSynthesisUtterance(
      "Hello, I’m Sindhuja Rajappan. I’m a software developer and electronics engineer, building intelligent technology with real-world impact. Welcome to my portfolio.",
    );
    message.rate = 0.92;
    message.pitch = 1.08;
    message.onstart = () => setSpeaking(true);
    message.onend = () => setSpeaking(false);
    message.onerror = () => setSpeaking(false);
    const voices = window.speechSynthesis.getVoices();
    message.voice =
      voices.find((voice) =>
        /female|samantha|zira|veena|google uk english female/i.test(voice.name),
      ) ??
      voices.find((voice) => voice.lang.startsWith("en")) ??
      null;
    window.speechSynthesis.speak(message);
  };
  useEffect(() => {
    const timer = window.setTimeout(speakIntro, 2100);
    return () => {
      window.clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, []);
  const stage =
    scroll < 0.18
      ? "Origin"
      : scroll < 0.45
        ? "Systems"
        : scroll < 0.72
          ? "Experiments"
          : "Open channel";
  return (
    <div
      className="site-shell"
      style={
        {
          "--page-scroll": scroll,
          "--mouse-x": mouse.x,
          "--mouse-y": mouse.y,
        } as CSSProperties
      }
    >
      <div className="cursor" ref={cursor}>
        <span />
      </div>
      <div className="film-grain" />
      <div className="cinematic-sky" style={{ transform: `translate3d(0, ${scroll * -220}px, 0)` }}>
        <i />
        <i />
        <i />
      </div>
      <div className="smoke smoke-a" />
      <div className="smoke smoke-b" />
      <div className="smoke smoke-c" />
      <div className="smoke smoke-d" />
      <div className="smoke-veil" />
      <div className="scene-status">
        <span>
          Scene{" "}
          {Math.min(4, Math.floor(scroll * 4) + 1)
            .toString()
            .padStart(2, "0")}
        </span>
        <i />
        <b>{stage}</b>
      </div>
      <div className="scroll-progress" style={{ transform: `scaleX(${scroll})` }} />
      <div className="intro-curtain">
        <div>
          <span>SR / 2026-2027</span>
          <i />
        </div>
      </div>
      <header className="nav-shell">
        <a href="#home" className="brand" aria-label="Sindhuja R home">
          <span className="brand-mark">S</span>
          <span>
            SINDHUJA<small>ENGINEER + CREATOR</small>
          </span>
        </a>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          {["About", "Work", "Journey", "Contact"].map((item, i) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>
              <b>0{i + 1}</b>
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle color theme"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <button
            className="icon-button menu-button"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle navigation"
          >
            <Icon name={menu ? "x" : "menu"} />
          </button>
        </div>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <div className="eyebrow reveal">
              <span className="pulse-dot" /> Available for internships · 2025
            </div>
            <p className="hero-pretitle reveal">
              Electronics engineer by study.
              <br />
              Creative technologist by instinct.
            </p>
            <h1 className="reveal">
              <span>Sindhuja</span>
              <strong>Rajappan</strong>
            </h1>
            <p className="hero-description reveal">
              I turn signals, software, and human needs into <em>technology that matters.</em>
            </p>
            <div className="hero-actions reveal">
              <a className="button primary" href="#work">
                Explore my work <Icon name="arrow" />
              </a>
              <button className="text-button" onClick={() => setGame(true)}>
                <span>
                  <Icon name="play" size={15} />
                </span>{" "}
                Enter portfolio arcade
              </button>
              <button
                className={speaking ? "voice-button speaking" : "voice-button"}
                onClick={speakIntro}
                aria-label="Play Sindhuja's voice introduction"
              >
                <Icon name="volume" size={17} />
                <span>{speaking ? "Introducing..." : "Hear my intro"}</span>
              </button>
            </div>
            <div className="hero-foot reveal">
              <div>
                <b>Based in</b>
                <span>Coimbatore, India</span>
              </div>
              <div>
                <b>Current signal</b>
                <span>ECE · SKCET</span>
              </div>
            </div>
          </div>
          <div className="hero-art reveal">
            <AnimeMuse mouse={mouse} scroll={scroll} />
          </div>
          <div className="vertical-word">CREATE / CONNECT / IMPACT</div>
          <a href="#about" className="scroll-cue">
            <span>Scroll to enter</span>
            <i />
          </a>
        </section>
        <div className="cinematic-bridge bridge-one" aria-hidden="true">
          <span>01</span>
          <b>Ideas become signals</b>
          <i />
        </div>
        <section id="about" className="section about-section">
          <div className="section-index reveal">
            <span>01</span>
            <i /> ORIGIN STORY
          </div>
          <div className="about-grid">
            <div className="statement reveal">
              <p className="mini-label">Not just circuits. Not just code.</p>
              <h2>
                I engineer with <span>empathy</span> at the center.
              </h2>
            </div>
            <div className="about-copy reveal">
              <p>
                I’m a third-year Electronics & Communication Engineering student fascinated by the
                moment a raw idea becomes something people can actually use.
              </p>
              <p>
                From safety-first mobile experiences to connected tools for farmers, I build across
                software and hardware with one mission: make technology feel more human.
              </p>
              <div className="fact-row">
                <div>
                  <strong>7.5</strong>
                  <span>Current CGPA</span>
                </div>
                <div>
                  <strong>09+</strong>
                  <span>Hackathons</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>Hackathon win</span>
                </div>
              </div>
            </div>
          </div>
          <div className="skills-panel reveal">
            {skills.map(([num, title, text, value]) => (
              <div className="skill-line" key={title as string}>
                <span className="skill-num">{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <div className="skill-meter">
                  <i style={{ "--value": `${value}%` } as CSSProperties} />
                </div>
                <strong>{value}%</strong>
              </div>
            ))}
          </div>
        </section>
        <div className="cinematic-bridge bridge-two" aria-hidden="true">
          <span>02</span>
          <b>Signals become systems</b>
          <i />
        </div>
        <section id="work" className="section work-section">
          <div className="section-index reveal">
            <span>02</span>
            <i /> SELECTED EXPERIMENTS
          </div>
          <div className="section-heading reveal">
            <h2>
              Work with a <em>pulse.</em>
            </h2>
            <p>Experiments across AI, people, connected devices and physical systems.</p>
          </div>
          <div className="projects">
            {projects.map((p) => (
              <article
                className={`project-card reveal ${p.tone}`}
                key={p.title}
                onPointerMove={tilt}
                onPointerLeave={(e) => {
                  e.currentTarget.style.setProperty("--rx", "0deg");
                  e.currentTarget.style.setProperty("--ry", "0deg");
                }}
              >
                <div className="project-image">
                  {p.image ? (
                    <img src={p.image} alt={`${p.title} project visual`} />
                  ) : (
                    <div className="project-console">
                      <span>SR / AI SYSTEM</span>
                      <b>{p.title === "TrustGuard AI" ? "RISK: 08%" : "NUTRITION: SYNCED"}</b>
                      <i />
                      <i />
                      <i />
                      <small>
                        {p.title === "TrustGuard AI" ? "Content verified" : "Smart guidance active"}
                      </small>
                    </div>
                  )}
                  <div className="scan-line" />
                  <span>{p.number}</span>
                </div>
                <div className="project-info">
                  <div className="project-top">
                    <span>{p.subtitle}</span>
                    <Icon name="external" />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="cinematic-bridge bridge-three" aria-hidden="true">
          <span>03</span>
          <b>Systems create impact</b>
          <i />
        </div>
        <section id="journey" className="section journey-section">
          <div className="section-index reveal">
            <span>03</span>
            <i /> TRANSMISSION LOG
          </div>
          <div className="journey-grid">
            <div className="journey-title reveal">
              <h2>
                Still learning.
                <br />
                <span>Always building.</span>
              </h2>
              <p>Every chapter adds a new frequency to the signal.</p>
              <a href="/assets/Sindhuja-R-Resume.pdf" download className="button outline">
                Download résumé <Icon name="download" size={18} />
              </a>
            </div>
            <div className="timeline">
              <article className="timeline-entry reveal">
                <div className="timeline-date">CURRENT</div>
                <div className="timeline-icon">
                  <Icon name="code" />
                </div>
                <div>
                  <h3>IoT Intern · Krishec Technologies</h3>
                  <p>Building home and industrial automation with connected-device monitoring.</p>
                </div>
              </article>
              <article className="timeline-entry reveal">
                <div className="timeline-date">2025 / NOW</div>
                <div className="timeline-icon">
                  <Icon name="briefcase" />
                </div>
                <div>
                  <h3>Industrial Intern · SAIL</h3>
                  <p>
                    Inside the systems, safety practices and plant operations of steel manufacturing
                    in Salem.
                  </p>
                </div>
              </article>
              <article className="timeline-entry reveal">
                <div className="timeline-date">2025</div>
                <div className="timeline-icon">
                  <Icon name="award" />
                </div>
                <div>
                  <h3>TECHATHON · First Prize</h3>
                  <p>
                    Won for Uzhavar Connect, a practical digital ecosystem designed around farmers
                    and their communities.
                  </p>
                </div>
              </article>
              <article className="timeline-entry reveal">
                <div className="timeline-date">2024—28</div>
                <div className="timeline-icon">
                  <Icon name="code" />
                </div>
                <div>
                  <h3>B.E. Electronics & Communication</h3>
                  <p>Sri Krishna College of Engineering and Technology · Coimbatore.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="contact-orbit orbit-a" />
          <div className="contact-orbit orbit-b" />
          <div className="contact-inner reveal">
            <div className="eyebrow">Open channel / ready to receive</div>
            <h2>
              Have an idea with
              <br />
              <span>real-world impact?</span>
            </h2>
            <p>Let’s turn it into a signal people can feel.</p>
            <a href="mailto:sindhuja58912@gmail.com" className="contact-mail">
              sindhuja58912@gmail.com <Icon name="arrow" size={28} />
            </a>
            <div className="socials">
              <a href="https://github.com/sindhuja196" target="_blank" rel="noreferrer">
                <Icon name="github" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sindhuja-rajappan-591465329"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="linkedin" /> LinkedIn
              </a>
              <a href="mailto:sindhuja58912@gmail.com">
                <Icon name="mail" /> Email
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <a href="#home" className="brand">
          <span className="brand-mark">S</span>
          <span>
            SINDHUJA<small>ENGINEER + CREATOR</small>
          </span>
        </a>
        <p>Engineering empathy through innovation.</p>
        <span>© {new Date().getFullYear()} · Crafted with intention</span>
      </footer>
      {game && <Game onClose={() => setGame(false)} />}
    </div>
  );
}
