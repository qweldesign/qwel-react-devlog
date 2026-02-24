import GitHubIcon from '../assets/icons/icon-github.svg?react'
import SendIcon from '../assets/icons/icon-send.svg?react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a className="footer-link" href="https://github.com/qweldesign" target="_blank" rel="noopener">
          <GitHubIcon />
          <span>GitHub</span>
        </a>
        <a className="footer-link" href="https://qwel.design/tools/contact-form/" target="_blank" rel="noopener">
          <SendIcon />
          <span>Contact Me</span>
        </a>
        <small>&copy; 2019 - { new Date().getFullYear() } QWEL.DESIGN</small>
      </div>
    </footer>
  )
}

export default Footer
