export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <a href="#top" className="brand small">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mark"
          >
            <line
              x1="1"
              y1="16"
              x2="31"
              y2="16"
              stroke="#ECEAE0"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle
              cx="16"
              cy="16"
              r="8.5"
              fill="rgba(203,239,77,0.10)"
              stroke="#CBEF4D"
              strokeWidth="2.2"
            />
            <circle cx="16" cy="16" r="2.1" fill="#CBEF4D" />
          </svg>
          <span className="wordmark">Pipesight</span>
        </a>
        <span className="mid">Built for data engineers who&apos;ve had enough.</span>
        <span className="foot-links">
          <span>© 2026</span>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </span>
      </div>
    </footer>
  )
}
