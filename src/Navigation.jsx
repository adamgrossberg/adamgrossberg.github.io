const links = [
  ['home', '#home'],
  ['stuff', '#stuff'],
  ['other stuff', '#other-stuff'],
  ['things', '#things'],
]

export default function Navigation({ current = '#home' }) {
  return (
    <nav className="home-nav" aria-label="Main navigation">
      <span className="nav-dot" aria-hidden="true">·</span>
      {links.map(([label, href]) => (
        <span className="nav-item" key={href}>
          <a href={href} aria-current={href === current ? 'page' : undefined}>{label}</a>
          <span className="nav-dot" aria-hidden="true">·</span>
        </span>
      ))}
    </nav>
  )
}
