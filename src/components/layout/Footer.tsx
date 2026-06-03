export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <span>Pipesight © {new Date().getFullYear()}</span>
        <span className="mid">Built for data engineers who&apos;ve had enough.</span>
        <span className="foot-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </span>
      </div>
    </footer>
  )
}
