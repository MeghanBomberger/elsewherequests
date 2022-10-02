import axios from 'axios'
import { 
  useEffect, 
  useState, 
} from 'react'

import './index.scss'
import crystalIcon from '../../assets/crystal.png'
import { Header } from '../../components/Header'

export const Mods = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [mods, setMods] = useState([])

  const fetchModsData = async () => {
    const res = await axios.get("http://localhost:5000/api/mods")
    return res?.data || []
  }

  const refetchData = () => {
    fetchModsData()
      .then(res => setMods(Object.keys(res.mods)?.map(key => ({
        id: key,
        version: res.mods[key],
        inUse: !!res.modsInUse?.includes(key)
      }))))
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the mods data.")
      })
  }

  useEffect(() => {
    refetchData()
  }, [])

  return (
    <>
      <Header title="Mods"/>

      <main className="mods">
        {!!errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        {!!mods?.length
          ? (
            <table className="mods-list">
              <thead>
                <tr>
                  <th>Mod Id</th>
                  <th>Version</th>
                  <th>In Use</th>
                </tr>
              </thead>
              <tbody>
                {mods.map(mod => (
                  <tr key={mod.id}>
                    <td>{mod.id}</td>
                    <td>{mod.version}</td>
                    <td>
                      {!!mod.inUse && (
                        <img
                          className="crystal-icon"
                          alt={`${mod.id}-in-use`}
                          title={`${mod.id}-in-use`}
                          src={crystalIcon}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          : (
            <p>No mods found. Check game's mod's folder.</p>
          )
        }
      </main>
    </>
  )
}
