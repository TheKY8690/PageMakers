'use client'

import { useEffect, useRef } from 'react'
import * as s from '@/styles/wara/cursor.css'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100
    let my = -100
    let rx = -100
    let ry = -100
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [data-cursor-hover]')) {
        ring.classList.add(s.ringHover)
      }
    }

    const onLeave = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [data-cursor-hover]')) {
        ring.classList.remove(s.ringHover)
      }
    }

    const loop = () => {
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`

      // lerp ring
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`

      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.body.style.cursor = 'none'
    raf = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.body.style.cursor = ''
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={s.dot} />
      <div ref={ringRef} className={s.ring} />
    </>
  )
}
