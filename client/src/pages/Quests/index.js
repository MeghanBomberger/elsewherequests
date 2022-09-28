import axios from 'axios'
import React, { 
  useEffect, 
  useState, 
} from "react"

import './index.scss'
import closeIcon from '../../assets/cancel.png'
import { Header } from '../../components/Header'
import { QuestsList } from './QuestsList'
import { QuestForm } from './QuestForm'

export const Quests = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [items, setItems] = useState([])
  const [mobs, setMobs] = useState([])
  const [quests, setQuests] = useState([])
  const [selectedQuest, setSelectedQuest] = useState(null)
  const [questGivers, setQuestGivers] = useState([])
  const [formIsOpen, setFormIsOpen] = useState(false)

  const fetchQuestsData = async () => {
    const res = await axios.get("http://localhost:5000/api/quests")
    return res?.data || []
  }

  const fetchQuestGiverData = async () => {
    const res = await axios.get("http://localhost:5000/api/questgivers")
    return res?.data?.questGivers || []
  }

  const fetchItemsData = async () => {
    // TODO route
    const res = await axios.get("http://localhost:5000/api/items")
    return res?.data || []
  }

  const fetchMobsData = async () => {
    // TODO route
    const res = await axios.get("http://localhost:5000/api/mobs")
    return res?.data || []
  }

  const refetchData = () => {
    fetchQuestsData()
      .then(res => {
        setQuests(res)
      })
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the quest data.")
      })
    fetchQuestGiverData()
      .then(res => {
        setQuestGivers(res)
      })
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the quest giver data.")
      })
    fetchItemsData()
      .then(res => {
        setItems(res)
      })
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the items data.")
      })
    fetchMobsData()
      .then(res => {
        setMobs(res)
      })
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the mobs data.")
      })
  }

  useEffect(() => {
    refetchData()
  }, [])

  return (
    <>
      <Header title="Quests"/>

      <main className="quests">
        {!!errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <section
          className={`quest-form-action ${formIsOpen ? 'open' : 'closed'}`}
        >
          {!formIsOpen && (
            <button
              className="open-form"
              onClick={() => setFormIsOpen(true)}
            >
              Add Quest
            </button>
          )}

          {!!formIsOpen && (
            <div>
              <h2>
                { !!selectedQuest 
                    ? `Edit ${selectedQuest.title}` 
                    : 'Create New Quest'
                }
              </h2>

              <button
                className="close-form-button"
                onClick={() => {
                  setSelectedQuest(null)
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
          <QuestForm
            items={items}
            mobs={mobs}
            questGivers={questGivers}
            quests={quests}
            selectedQuest={selectedQuest}
          />
        )}

        <QuestsList 
          quests={quests}
          setFormIsOpen={setFormIsOpen}
          setSelectedQuest={setSelectedQuest}
        />
      </main>
    </>
  )
}
