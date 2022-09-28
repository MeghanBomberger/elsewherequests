import React, { 
  useEffect, 
  useState, 
} from "react"
import axios from 'axios'

import "./index.scss"
import closeIcon from '../../assets/cancel.png'
import { Header } from '../../components/Header'
import { QuestGiverList } from './QuestGiverList'
import { QuestGiverForm } from './QuestGiverForm'

export const QuestGiver = () => {
  const [questGivers, setQuestGivers] = useState([])
  const [entityShapes, setEntityShapes] = useState([])
  const [selectedQuestGiver, setSelectedQuestGiver] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formIsOpen, setFormIsOpen] = useState(false)

  const fetchQuestGiverData = async () => {
    const res = await axios.get("http://localhost:5000/api/questgivers")
    return res.data
  }

  const refetchQuestGiverData = () => {
    fetchQuestGiverData()
      .then(res => {
        setQuestGivers(res.questGivers)
        setEntityShapes(res.questGiverShapes)
      })
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the quest giver data.")
      })
  }

  useEffect(() => {
    refetchQuestGiverData()
  }, [])

  return (
    <>
      <Header title="Quest Givers" titleOnly={false}/>

      <main className="quest-givers">
        {!!errorMessage && <p className="error-message">{errorMessage}</p>}

        <section
          className={`giver-form-action ${formIsOpen ? 'open' : 'closed'}`}
        >
          {!formIsOpen && (
            <button
              className="open-form"
              onClick={() => setFormIsOpen(true)}
            >
              Add Quest Giver
            </button>
          )}

          {!!formIsOpen && (
            <div>
              <h2>
                { !!selectedQuestGiver 
                    ? `Edit ${selectedQuestGiver.name}` 
                    : 'Create New Quest Giver'
                }
              </h2>

              <button
                className="close-form-button"
                onClick={() => {
                  setSelectedQuestGiver(null)
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
          <QuestGiverForm
            selectedQuestGiver={selectedQuestGiver}
            entityShapes={entityShapes}
            questGiverIds={questGivers?.map(giver => giver.id) || []}
            refetchQuestGiverData={refetchQuestGiverData}
          />
        )}
        
        <QuestGiverList 
          data={questGivers}
          entityShapes={entityShapes}
          setFormIsOpen={setFormIsOpen}
          setSelectedQuestGiver={setSelectedQuestGiver}
        />
      </main>
    </>
  )
}
