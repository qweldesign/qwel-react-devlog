import { useRef } from 'react'
import { sections, socials } from '../types/navigation'
import { useScrollToAnchor } from '../hooks/useScrollToAnchor'
import XIcon from '../assets/icons/icon-x.svg?react'
import FacebookIcon from '../assets/icons/icon-facebook.svg?react'
import InstagramIcon from '../assets/icons/icon-instagram.svg?react'

function Header() {
  const headerRef = useRef<HTMLElement | null>(null)

  const componentsMap = {
    x: XIcon,
    facebook: FacebookIcon,
    instagram: InstagramIcon
  }
  
  useScrollToAnchor(headerRef)

  return (
    <header className="header" ref={headerRef}>
      <div className="header__inner">
        <nav className="nav">
          <h1 className="sitebrand">
            <img src="/images/logo.svg" alt="QWEL in Action" />
          </h1>
          <ul className="primary-menu">
            {sections.map(name => (
              <li key={name} className="primary-menu__item">
                <a href={`#${name}`}>{name}</a>
              </li>
            ))}
          </ul>
          <ul className="social-menu">
            {socials.map(name => {
              const Icon = componentsMap[name]
              return (
                <li key={name} className="social-menu__item">
                  <a href={`https://${name}.com/qweldesign`} target="_blank" rel="noopener">
                    <Icon />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
