import axios from 'axios'
import { 
  useEffect, 
  useState, 
} from 'react'

import './index.scss'
import closeIcon from '../../assets/cancel.png'
import { Header } from '../../components/Header'
import { MobsForm } from './MobsForm'
import { MobsList } from './MobsList'

export const Mobs = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [mobs, setMobs] = useState([])
  const [mods, setMods] = useState([])
  const [selectedMob, setSelectedMob] = useState(null)
  const [formIsOpen, setFormIsOpen] = useState(false)

  const fetchMobsData = async () => {
    const res = await axios.get("http://localhost:5000/api/mobs")
    return res?.data || []
  }

  const fetchModsData = async () => {
    const res = await axios.get("http://localhost:5000/api/mods")
    return res?.data || []
  }

  const refetchData = () => {
    fetchMobsData()
      .then(res => setMobs(res))
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the mobs data.")
      })
    fetchModsData()
      .then(res => {
        const modsData = Object.keys(res.mods)?.map(key => ({
          id: key,
          version: res.mods[key],
          isUsed: !!res.modsInUse?.includes(key)
        }))
        setMods(modsData)
      })
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
      <Header title="Mobs"/>

      <main className="mobs">
        {!!errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <section
          className={`mobs-form-action ${formIsOpen ? 'open' : 'closed'}`}
        >
          {!formIsOpen && (
            <button
              className="open-form"
              onClick={() => setFormIsOpen(true)}
            >
              Add Mob
            </button>
          )}

          {!!formIsOpen && (
            <div>
              <h2>
                { !!selectedMob 
                    ? `Edit ${selectedMob.name}` 
                    : 'Create New Mob'
                }
              </h2>

              <button
                className="close-form-button"
                onClick={() => {
                  setSelectedMob(null)
                  setFormIsOpen(false)
                }}
              >
                <img
                  alt="close form"
                  title="close form"
                  src={closeIcon}
                />
              </button>
            </div>
          )}
        </section>

        {!!formIsOpen && (
          <MobsForm
            mobs={mobs}
            mods={mods}
            selectedMob={selectedMob}
            setMobs={setMobs}
            refetchData={refetchData}
            setFormIsOpen={setFormIsOpen}
          />
        )}

        <MobsList 
          mobs={mobs}
          setSelectedMob={setSelectedMob}
          setFormIsOpen={setFormIsOpen}
        />
      </main>
    </>
  )
}
