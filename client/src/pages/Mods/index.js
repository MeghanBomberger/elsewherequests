import axios from 'axios'
import { 
  useEffect, 
  useState, 
} from 'react'

import './index.scss'
import closeIcon from '../../assets/cancel.png'
import { Header } from '../../components/Header'
import { ModsForm } from './ModsForm'
import { ModsList } from './ModsList'

export const Mods = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [mods, setMods] = useState([])
  const [selectedMod, setSelectedMod] = useState(null)
  const [formIsOpen, setFormIsOpen] = useState(false)

  const fetchModsData = async () => {
    const res = await axios.get("http://localhost:5000/api/mods")
    return res?.data || []
  }

  const refetchData = () => {
    fetchModsData()
      .then(res => setMods(res))
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

        <section
          className={`mods-form-action ${formIsOpen ? 'open' : 'closed'}`}
        >
          {!formIsOpen && (
            <button
              className="open-form"
              onClick={() => setFormIsOpen(true)}
            >
              Add Mod
            </button>
          )}

          {!!formIsOpen && (
            <div>
              <h2>
                { !!selectedMod 
                    ? `Edit ${selectedMod.name}` 
                    : 'Create New Mod'
                }
              </h2>

              <button
                className="close-form-button"
                onClick={() => {
                  setSelectedMod(null)
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
          <ModsForm
            mods={mods}
            selectedMod={selectedMod}
            setMods={setMods}
            setErrorMessage={setErrorMessage}
          />
        )}

        <ModsList 
          mods={mods}
          setSelectedMod={setSelectedMod}
        />
      </main>
    </>
  )
}
