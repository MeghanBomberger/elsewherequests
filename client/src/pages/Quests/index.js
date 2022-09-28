import axios from 'axios'
import React, { 
  useEffect, 
  useState, 
} from "react"

import './index.scss'
import { Header } from '../../components/Header'
import { QuestsList } from './QuestsList'

export const Quests = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [quests, setQuests] = useState([])
  const [selectedQuest, setSelectedQuest] = useState(null)
  const [questGiverIds, setQuestGiverIds] = useState([])
  const [formIsOpen, setFormIsOpen] = useState(false)

  const fetchQuestsData = async () => {
    const res = await axios.get("http://localhost:5000/api/quests")
    return res?.data || []
  }

  const fetchQuestGiverData = async () => {
    const res = await axios.get("http://localhost:5000/api/questgivers")
    return res?.data?.questGivers?.map(giver => giver.id) || []
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
        setQuestGiverIds(res)
      })
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the quest giver data.")
      })
  }

  useEffect(() => {
    refetchData()
  }, [])

  return (
    <>
      <Header title="Quests"/>

      <main className="quests">
        <QuestsList quests={quests}/>
      </main>
    </>
  )
}
