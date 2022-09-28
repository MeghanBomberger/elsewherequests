import { Link } from 'react-router-dom'

import './Header.scss'
import arrowIcon from '../assets/arrow.png'
import { navIcons } from '../helpers/navIcons'

export const Header = ({ title, titleOnly }) => {
  return (
    <header>
      {!titleOnly && (
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
      )}

      <h1 className={!!titleOnly ? 'title-only' : 'title'}>{title}</h1>
    
      {!titleOnly && (
        <nav className="nav-bar">
          {navIcons?.filter(navIcon => navIcon.title !== title)?.map(navIcon => (
            <Link 
              className="header-link"
              to={navIcon.path}
              key={navIcon.title}
            >
              <img
                alt={navIcon.title}
                title={navIcon.title}
                src={navIcon.icon}
                className="header-icon"
              />
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
