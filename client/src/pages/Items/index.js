import axios from 'axios'
import { 
  useEffect, 
  useState, 
} from 'react'

import './index.scss'
import closeIcon from '../../assets/cancel.png'
import { Header } from '../../components/Header'
import { ItemsForm } from './ItemsForm'
import { ItemsList } from './ItemsList'

export const Items = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [items, setItems] = useState([])
  const [mods, setMods] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [formIsOpen, setFormIsOpen] = useState(false)

  const fetchItemsData = async () => {
    const res = await axios.get("http://localhost:5000/api/items")
    return res?.data || []
  }

  const fetchModsData = async () => {
    const res = await axios.get("http://localhost:5000/api/mods")
    return res?.data || []
  }

  const refetchData = () => {
    fetchItemsData()
      .then(res => setItems(res))
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the items data.")
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
      <Header title="Items"/>

      <main className="items">
        {!!errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <section
          className={`item-form-action ${formIsOpen ? 'open' : 'closed'}`}
        >
          {!formIsOpen && (
            <button
              className="open-form"
              onClick={() => setFormIsOpen(true)}
            >
              Add Item
            </button>
          )}

          {!!formIsOpen && (
            <div>
              <h2>
                { !!selectedItem 
                    ? `Edit ${selectedItem.name}` 
                    : 'Create New Item'
                }
              </h2>

              <button
                className="close-form-button"
                onClick={() => {
                  setSelectedItem(null)
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
          <ItemsForm
            items={items}
            mods={mods}
            selectedItem={selectedItem}
            setItems={setItems}
            refetchData={refetchData}
            setFormIsOpen={setFormIsOpen}
          />
        )}

        <ItemsList 
          items={items}
          setSelectedItem={setSelectedItem}
          setFormIsOpen={setFormIsOpen}
        />
      </main>
    </>
  )
}
