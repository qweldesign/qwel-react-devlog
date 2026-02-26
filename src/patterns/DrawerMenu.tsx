import { useState, useEffect } from "react"
import { sections, socials } from '../types/navigation'
import Icon from '../primitives/Icon'
import XIcon from '../assets/icons/icon-x.svg?react'
import FacebookIcon from '../assets/icons/icon-facebook.svg?react'
import InstagramIcon from '../assets/icons/icon-instagram.svg?react'

function DrawerMenu() {
  const [isShown, setIsShown] = useState(false) // 初期表示
  const [isActive, setIsActive] = useState(false) // 開閉状態

  // 開閉
  const toggle = () => {
    setIsActive(!isActive)
  }

  // スクロール時にメニューを非表示
  const windowScrollHandler = () => {
    if (isActive) toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true)
    }, 1000)

    window.addEventListener('scroll', windowScrollHandler)

    return () => {
      window.removeEventListener('scroll', windowScrollHandler)
    }
  }, [])

  const componentsMap = {
    x: XIcon,
    facebook: FacebookIcon,
    instagram: InstagramIcon
  }

  return (
    <>
      <Icon
        className={isShown && !isActive ? 'is-active' : ''}
        role="button"
        tabIndex={0}
        aria-label="メニューを開く"
        name="drawer-navicon"
        icon="menu"
        color="sky"
        size="large"
        rounded={false}
        onClick={toggle}
      ></Icon>
      <Icon
        className={isShown && isActive ? 'is-active': ''}
        role="button"
        tabIndex={0}
        aria-label="メニューを閉じる"
        name="drawer-close"
        icon="close"
        color="sky"
        size="large"
        rounded={false}
        onClick={toggle}
      ></Icon>
      <div className={`drawer-menu ${!isActive ? 'is-collapsed' : ''}`}>
        <div className={`drawer-menu__inner ${!isActive ? 'is-hidden' : ''}`}>
          <div className="drawer-menu__sitebrand">
            <img src="/images/logo.svg" alt="QWEL in Action" />
          </div>
          <ul className="drawer-menu__list is-primary-menu">
            {sections.map(name => (
              <li key={name} className="drawer-menu__item">
                <a href={`#${name}`}>{name}</a>
              </li>
            ))}
          </ul>
          <ul className="drawer-menu__list is-social-menu">
            {socials.map(name => {
              const SocialIcon = componentsMap[name]
              return (
                <li key={name} className="drawer-menu__item">
                  <a href={`https://${name}.com/qweldesign`} target="_blank" rel="noopener">
                    <SocialIcon />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className={`drawer-menu-overlay ${!isActive ? 'is-collapsed' : ''}`} onClick={toggle}></div>
    </>
  )
}

export default DrawerMenu
