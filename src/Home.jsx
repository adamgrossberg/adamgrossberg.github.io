import { useId, useLayoutEffect, useRef, useState } from 'react'
import Navigation from './Navigation.jsx'
import homePhoto from './assets/images/home-background-banff.jpeg'
import {
  WAVE_TEXT_COLUMN_GAP_PX,
  WAVE_EDGE_DEPTH_PX,
  WAVE_TEXT_SPEED_PX_PER_SECOND,
  WAVE_REST_INSET_PX,
  WAVE_HOVER_TRANSITION_MS,
  WAVE_MOBILE_BREAKPOINT_PX,
  waveTextPaths,
  waveEdgePath,
} from './wave-edges.js'
import quoteText from './home-text.txt?raw'
import './Home.css'

const quoteCycles = quoteText
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .map((quote) => quote + '\u2003\u2003\u2003')

export default function Home() {
  const clipId = useId()
  const imageRef = useRef(null)
  const pathRef = useRef(null)
  const textSvgRef = useRef(null)
  const leftTextPathRef = useRef(null)
  const rightTextPathRef = useRef(null)
  const leftTextRef = useRef([])
  const rightTextRef = useRef([])
  const textMeasureRef = useRef([])
  const [repeatCounts, setRepeatCounts] = useState(() => quoteCycles.map(() => 24))
  const [columnCount, setColumnCount] = useState(1)
  const leftPathId = `${clipId}-left-text`
  const rightPathId = `${clipId}-right-text`
  const leftRunId = `${clipId}-left-run`
  const rightRunId = `${clipId}-right-run`

  useLayoutEffect(() => {
    const image = imageRef.current
    const surface = image.parentElement
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileSize = window.matchMedia(`(max-width: ${WAVE_MOBILE_BREAKPOINT_PX - 1}px)`)
    let width = 0
    let height = 0
    let textPeriods = quoteCycles.map(() => 1)
    let animationFrame
    const startedAt = performance.now()
    let inset = WAVE_REST_INSET_PX
    let fromInset = inset
    let targetInset = inset
    let transitionStartedAt = startedAt
    let hovered = false
    let focused = false
    let isMobile = false

    const draw = (now) => {
      if (!width || !height) return
      if (isMobile) {
        pathRef.current.setAttribute('d', `M0,0 H${width} V${height} H0 Z`)
        return
      }
      const elapsed = motionPreference.matches ? 0 : now - startedAt
      const progress = motionPreference.matches || WAVE_HOVER_TRANSITION_MS <= 0
        ? 1
        : Math.min(1, Math.max(0, (now - transitionStartedAt) / WAVE_HOVER_TRANSITION_MS))
      const eased = (1 - Math.cos(progress * Math.PI)) / 2
      inset = fromInset + (targetInset - fromInset) * eased
      pathRef.current.setAttribute('d', waveEdgePath(width, height, elapsed, inset))
      const textPaths = waveTextPaths(width, height, elapsed, inset)
      leftTextPathRef.current.setAttribute('d', textPaths.left)
      rightTextPathRef.current.setAttribute('d', textPaths.right)
      textPeriods.forEach((period, index) => {
        const offset = -period + (elapsed / 1000 * WAVE_TEXT_SPEED_PX_PER_SECOND) % period
        leftTextRef.current[index].setAttribute('startOffset', offset)
        rightTextRef.current[index].setAttribute('startOffset', offset)
      })
    }
    const animate = (now) => {
      draw(now)
      if (!isMobile && !motionPreference.matches) animationFrame = requestAnimationFrame(animate)
    }
    const measure = () => {
      const bounds = image.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      // Measure each quote individually, including its repeating gap.
      textSvgRef.current.style.display = ''
      textPeriods = quoteCycles.map((_, index) => Math.max(1, textMeasureRef.current[index].getComputedTextLength()))
      // Repeat along the curves, then stack copies outward to fill the screen.
      setRepeatCounts(textPeriods.map((period) => Math.ceil(height * 6 / period) + 4))
      const sideMargin = Math.max(0, (surface.parentElement.clientWidth - width) / 2)
      setColumnCount(Math.ceil((sideMargin + WAVE_REST_INSET_PX + WAVE_EDGE_DEPTH_PX) / WAVE_TEXT_COLUMN_GAP_PX) + 2)
      const nextIsMobile = mobileSize.matches
      if (nextIsMobile !== isMobile) {
        isMobile = nextIsMobile
        inset = WAVE_REST_INSET_PX
        fromInset = inset
        targetInset = !isMobile && (hovered || focused) ? 0 : WAVE_REST_INSET_PX
        transitionStartedAt = performance.now()
      }
      textSvgRef.current.style.display = isMobile || !quoteText.trim() ? 'none' : ''
      surface.tabIndex = isMobile ? -1 : 0
      surface.setAttribute('aria-label', isMobile ? 'Banff photo' : 'Banff photo; focus to expand its edges')
      updateAnimation()
    }
    const updateAnimation = () => {
      cancelAnimationFrame(animationFrame)
      draw(performance.now())
      if (!motionPreference.matches && !isMobile) animationFrame = requestAnimationFrame(animate)
    }

    const updateExpansion = () => {
      const now = performance.now()
      draw(now)
      fromInset = inset
      targetInset = !isMobile && (hovered || focused) ? 0 : WAVE_REST_INSET_PX
      transitionStartedAt = now
      draw(now)
    }
    const enter = (event) => {
      if (event.pointerType === 'touch') return
      hovered = true
      updateExpansion()
    }
    const leave = () => { hovered = false; updateExpansion() }
    const focus = () => { focused = true; updateExpansion() }
    const blur = () => { focused = false; updateExpansion() }
    surface.addEventListener('pointerenter', enter)
    surface.addEventListener('pointerleave', leave)
    surface.addEventListener('focus', focus)
    surface.addEventListener('blur', blur)
    const observer = new ResizeObserver(measure)
    observer.observe(image)
    observer.observe(surface.parentElement)
    image.addEventListener('load', measure)
    motionPreference.addEventListener('change', updateAnimation)
    mobileSize.addEventListener('change', measure)
    measure()
    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      surface.removeEventListener('pointerenter', enter)
      surface.removeEventListener('pointerleave', leave)
      surface.removeEventListener('focus', focus)
      surface.removeEventListener('blur', blur)
      image.removeEventListener('load', measure)
      motionPreference.removeEventListener('change', updateAnimation)
      mobileSize.removeEventListener('change', measure)
    }
  }, [])

  return (
    <main id="home" className="home" aria-label="Home">
      <svg className="wave-edge-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path ref={pathRef} />
          </clipPath>
        </defs>
      </svg>
      <div className="wave-photo" tabIndex={0} role="group" aria-label="Banff photo; focus to expand its edges">
        <img
          ref={imageRef}
          src={homePhoto}
          style={{ clipPath: `url(#${clipId})` }}
          alt="Hikers on a rocky ridge overlooking the mountains of Banff."
        />
        <svg ref={textSvgRef} className="wave-quotes" aria-hidden="true">
          <defs>
            <path id={leftPathId} ref={leftTextPathRef} />
            <path id={rightPathId} ref={rightTextPathRef} />
            {quoteCycles.map((quote, index) => (
              <g key={index}>
                <text id={`${leftRunId}-${index}`} xmlSpace="preserve">
                  <textPath ref={(node) => { leftTextRef.current[index] = node }} href={`#${leftPathId}`}>{quote.repeat(repeatCounts[index])}</textPath>
                </text>
                <text id={`${rightRunId}-${index}`} xmlSpace="preserve">
                  <textPath ref={(node) => { rightTextRef.current[index] = node }} href={`#${rightPathId}`}>{quote.repeat(repeatCounts[index])}</textPath>
                </text>
              </g>
            ))}
          </defs>
          {quoteCycles.map((quote, index) => (
            <text key={index} ref={(node) => { textMeasureRef.current[index] = node }} className="wave-quote-measure" xmlSpace="preserve">{quote}</text>
          ))}
          {Array.from({ length: quoteCycles.length ? columnCount : 0 }, (_, column) => (
            <g key={column}>
              <use href={`#${leftRunId}-${column % quoteCycles.length}`} transform={`translate(${-column * WAVE_TEXT_COLUMN_GAP_PX}, 0)`} />
              <use href={`#${rightRunId}-${column % quoteCycles.length}`} transform={`translate(${column * WAVE_TEXT_COLUMN_GAP_PX}, 0)`} />
            </g>
          ))}
        </svg>
      </div>
      <h1 className="home-title">adam</h1>
      <div className="home-navigation">
        <Navigation current="#home" />
      </div>
    </main>
  )
}
