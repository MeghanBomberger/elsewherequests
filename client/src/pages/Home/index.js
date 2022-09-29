import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'
import { navIcons } from '../../helpers/navIcons'
import { Header } from '../../components/Header'

export const Home = () => {
  const [status, setStatus] = useState(null)
  
  const generateModFiles = async () => {
    const res = await axios.get("http://localhost:5000/api/writemod")
    setStatus(res.data)
  }

  return (
    <>
      <Header 
        title="Elsewhere Quest Maker"
        titleOnly={true}
      />

      <main className="main home">
        {navIcons?.map(navIcon => (
          <Link 
            className="home-link"
            to={navIcon.path}
          >
            <img
              alt={navIcon.title}
              title={navIcon.title}
              src={navIcon.icon}
              className="home-icons"
            />
            <p>{navIcon.title}</p>
          </Link>
        ))}

        <div className="button-bar">
          <button
            onClick={generateModFiles}
          >
            Generate Mod Files
          </button>
        </div>

        {!!status && (
          <div className="gen-status">
            <p>Mod Info File Status: <i>{status.modInfoFile || "UNKNOWN"}</i></p>
            <p>Quest Config File Status: <i>{status.questConfig || "UNKNOWN"}</i></p>
            <p>Quest Giver Entity Files Status: <i>{status.questGiverEntities || "UNKNOWN"}</i></p>
            <p>Creatures Item File Status: <i>{status.creatureItems || "UNKNOWN"}</i></p>
            <p>En Lang File Status: <i>{status.enLang || "UNKNOWN"}</i></p>
          </div>
        )}
      </main>
    </>
  )
}
