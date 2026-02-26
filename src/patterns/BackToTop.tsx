import { useState, useEffect } from 'react'
import Icon from '../primitives/Icon.tsx'

interface Props {
  offsetRatio?: number
}

function BackToTop({ offsetRatio = 0 }: Props) {
  const [isShown, setIsShown] = useState(false)

  // ボタン操作
  const backToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  // ボタン表示制御
  const updateVisibility = () => {
    setIsShown(window.innerHeight * offsetRatio < window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateVisibility, { passive: true })
    updateVisibility()
  
    return () => {
      window.removeEventListener('scroll', updateVisibility)
    }
  }, [])

  return (
    <Icon
      className={isShown ? 'is-active' : ''}
      role="button"
      tabIndex={0}
      aria-label="トップへ戻る"
      name="back-to-top"
      icon="chevron-up"
      color="sky"
      size="large"
      rounded={true}
      onClick={backToTop}
    ></Icon>
  )
}

export default BackToTop
