import { Link } from 'react-router-dom'

import './Header.scss'
import arrowIcon from '../assets/arrow.png'

export const Header = ({ title }) => {
  return (
    <header>
      <Link
        className="go-back"
        to="/"
      >
        <img
          alt="go back arrow"
          title="Go Back"
          src={arrowIcon}
        />
      </Link>
      <h1>{title}</h1>
    </header>
  )
}
