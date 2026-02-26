import { type TransitionEvent, useRef, useEffect } from 'react'
import { sections, socials } from '../types/navigation'
import { useScrollToAnchor } from '../providers/ScrollToAnchorProvider'
import { useActiveHeader } from '../providers/ActiveHeaderProvider'
import { useScrollSpy } from '../providers/ScrollSpyProvider'
import XIcon from '../assets/icons/icon-x.svg?react'
import FacebookIcon from '../assets/icons/icon-facebook.svg?react'
import InstagramIcon from '../assets/icons/icon-instagram.svg?react'

function Header() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const activeHeader = useActiveHeader()
  const scrollToAnchor = activeHeader ? null : useScrollToAnchor()
  const registerSentinel = activeHeader?.registerSentinel
  const registerHeader = activeHeader?.registerHeader ?? scrollToAnchor?.registerHeader
  const isActive = activeHeader?.isActive ?? true
  const updateOffset = activeHeader?.updateOffset
  const scrollSpy = useScrollSpy()
  const currentId = scrollSpy?.currentId

  useEffect(() => {
    registerSentinel?.(sentinelRef.current)
    registerHeader?.(headerRef.current)
  }, [])

  const handleTransitionEnd = (e: TransitionEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return
    updateOffset?.()
  }

  const componentsMap = {
    x: XIcon,
    facebook: FacebookIcon,
    instagram: InstagramIcon
  }

  return (
    <>
      <div ref={sentinelRef}></div>
      <header className={`header ${isActive ? 'is-active' : ''}`} ref={headerRef} onTransitionEnd={handleTransitionEnd}>
        <div className="header__inner">
          <nav className="nav">
            <h1 className="sitebrand">
              <img src="/images/logo.svg" alt="QWEL in Action" />
            </h1>
            <ul className="primary-menu">
              {sections.map(name => (
                <li key={name} className={`primary-menu__item ${currentId === name ? 'is-current' : ''}`}>
                  <a href={`#${name}`}>{name}</a>
                </li>
              ))}
            </ul>
            <ul className="social-menu">
              {socials.map(name => {
                const SocialIcon = componentsMap[name]
                return (
                  <li key={name} className="social-menu__item">
                    <a href={`https://${name}.com/qweldesign`} target="_blank" rel="noopener">
                      <SocialIcon />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
