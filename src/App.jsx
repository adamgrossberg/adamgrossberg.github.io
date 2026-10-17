import { useId, useLayoutEffect, useRef, useState } from 'react'
import homeBackground from './assets/images/home-background-banff.jpeg'
import quoteText from './home-text.txt?raw'
import './App.css'

const quotes = quoteText.split(/\r?\n/).map((quote) => quote.trim()).filter(Boolean)

function QuoteRow({ quote }) {
  const rowRef = useRef(null)
  const unitRef = useRef(null)
  const [layout, setLayout] = useState({ copies: 1, duration: 30 })

  useLayoutEffect(() => {
    const measure = () => {
      const width = unitRef.current.getBoundingClientRect().width
      if (!width) return
      const copies = Math.ceil(rowRef.current.clientWidth / width) + 1
      setLayout({ copies, duration: (copies * width) / 35 })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(rowRef.current)
    observer.observe(unitRef.current)
    measure()
    return () => observer.disconnect()
  }, [])

  return (
    <div className="quote-row" ref={rowRef}>
      <div className="quote-track" style={{ '--scroll-duration': `${layout.duration}s` }}>
        {[0, 1].map((group) => (
          <div className="quote-group" key={group}>
            {Array.from({ length: layout.copies }, (_, index) => (
              <span className="quote-unit" key={index} ref={group === 0 && index === 0 ? unitRef : null}>
                {quote}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function HomeImage() {
  const borderMaskId = useId()
  const imageRef = useRef(null)
  const [outline, setOutline] = useState(null)

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (!width || !height) return
      const depth = Math.min(10, width / 8, height / 8)
      const corner = depth
      const points = []
      // Adjacent edges share the same inset trough at each sharp corner.
      // Keep the teeth close to 32px wide as the image changes size.
      const edges = [
        [[corner, 0], [width - corner, 0], [0, depth], width - 2 * corner],
        [[width, corner], [width, height - corner], [-depth, 0], height - 2 * corner],
        [[width - corner, height], [corner, height], [0, -depth], width - 2 * corner],
        [[0, height - corner], [0, corner], [depth, 0], height - 2 * corner],
      ]
      for (const [start, end, inset, length] of edges) {
        const teeth = Math.max(1, Math.round(length / 20))
        for (let step = 0; step <= teeth * 2; step++) {
          const fraction = step / (teeth * 2)
          const inward = step % 2 === 0 ? 1 : 0
          const x = start[0] + (end[0] - start[0]) * fraction + inset[0] * inward
          const y = start[1] + (end[1] - start[1]) * fraction + inset[1] * inward
          points.push(`${x}px ${y}px`)

        }
      }
      setOutline({
        width,
        height,
        photo: `polygon(${points.join(', ')})`,
        borderPoints: points.join(' ').replaceAll('px', ''),
      })
    })
    observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="home-image"
      style={outline ? { '--photo-width': `${outline.width}px`, '--photo-half-height': `${outline.height / 2}px` } : undefined}
    >
      <nav className="home-nav" aria-label="Main navigation">
        <span className="nav-dot" aria-hidden="true">·</span>
        <a href="#home" aria-current="page">home</a>
        <span className="nav-dot" aria-hidden="true">·</span>
        <a href="#stuff">stuff</a>
        <span className="nav-dot" aria-hidden="true">·</span>
        <a href="#other-stuff">other stuff</a>
        <span className="nav-dot" aria-hidden="true">·</span>
        <a href="#things">things</a>
        <span className="nav-dot" aria-hidden="true">·</span>
      </nav>
      <img ref={imageRef} src={homeBackground} alt="" style={{ clipPath: outline?.photo }} />
      {outline && (
        <svg
          className="image-border"
          width={outline.width}
          height={outline.height}
          viewBox={`0 0 ${outline.width} ${outline.height}`}
          aria-hidden="true"
        >
          <defs>
            <mask
              id={borderMaskId}
              maskUnits="userSpaceOnUse"
              x={-outline.width}
              y={-outline.height}
              width={outline.width * 3}
              height={outline.height * 3}
              style={{ maskType: 'luminance' }}
            >
              <rect
                x={-outline.width}
                y={-outline.height}
                width={outline.width * 3}
                height={outline.height * 3}
                fill="white"
              />
              <polygon points={outline.borderPoints} fill="black" />
            </mask>
          </defs>
          <g mask={`url(#${borderMaskId})`}>
            <polygon className="image-border-outline" points={outline.borderPoints} />
          </g>
        </svg>
      )}
    </div>
  )
}

function App() {
  return (
    <main id="home" className="home" aria-label="Home">
      <div className="quote-background" aria-hidden="true">
        {quotes.map((quote, index) => <QuoteRow key={`${index}-${quote}`} quote={quote} />)}
      </div>
      <HomeImage />
    </main>
  )
}

export default App
