import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

import './QuestForm.scss'

export const QuestForm = ({
  items,
  mobs,
  questGivers,
  quests,
  selectedQuest,
}) => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedQuestGiver, setSelectedQuestGiver] = useState('')
  const [selectedPreReqQuest, setSelectedPreReqQuest] = useState('')
  const [selectedGatherItem, setSelectedGatherItem] = useState('')
  const [gatherObjectives, setGatherObjectives] = useState([])
  const [selectedKillMob, setSelectedKillMob] = useState('')
  const [killObjectives, setKillObjectives] = useState([])
  const [selectedRewardItem, setSelectedRewardItem] = useState('')
  const [rewardItems, setRewardItems] = useState([])
  const [perPlayer, setPerPlayer] = useState(false)
  const [cooldown, setCooldown] = useState(999999)

  const updateForm = () => {
    // TODO
  }

  const validateId = () => {
    // TODO
  }

  const addGatherItem = () => {
    //TODO
  }

  const removeGatherItem = () => {
    //TODO
  }

  const addKillMob = () => {
    //TODO
  }

  const removeKillMob = () => {
    //TODO
  }

  const handleSave = () => {
    // TODO
  }

  useEffect(() => {
    if (!!selectedQuest?.id) {
      updateForm()
    }
  }, [selectedQuest, updateForm])

  return (
    <form>
      {!!selectedQuest?.id
        ? (
          <p>VS ID: {selectedQuest.id}</p>
        )
        : (
          <label for="id">
            VS ID:
            <input
              required
              value={id}
              type="text"
              onChange={e => setId(e.target.value)}
            />
          </label>
        )
      }

      <label for="title">
        Title:
        <input
          required
          value={title}
          type="text"
          onChange={e => setTitle(e.target.value)}
        />
      </label>

      <label for="description">
        Description (VTML):
        <textarea
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>

      {questGivers?.length && (
        <label for="selectedQuestGiver">
          Quest Giver:
          <select
            required
            name="selectedQuestGiver"
            onChange={e => setSelectedQuestGiver(e.target.value)}
            value={selectedQuestGiver}
          >
            {questGivers.map(giver => (
              <option
                key={giver.id}
                value={giver.id}
              >
                {giver.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {quests?.length && (
        <label for="selectedPreReqQuest">
          Pre Requisit Quest (optional):
          <select
            name="selectedPreReqQuest"
            onChange={e => setSelectedPreReqQuest(e.target.value)}
            value={selectedPreReqQuest}
          >
            {quests.map(quest => (
              <option
                key={quest.id}
                value={quest.id}
              >
                {quest.title}
              </option>
            ))}
          </select>
        </label>
      )}

      <section className="gather-items">
        {/* TODO dropdown */}
        {/* TODO list with delete buttons */}
      </section>

      <section className="kill-mobs">
        {/* TODO dropdown */}
        {/* TODO list with delete buttons */}
      </section>

      <section className="reward-items">
        {/* TODO dropdown */}
        {/* TODO list with delete buttons */}
      </section>

      <label for="perPlayer">
        Solo Quest:
        {/* checkbox input */}
      </label>

      <label for="cooldown">
        Cooldown in Hours:
        <input
          required
          value={cooldown}
          type="number"
          onChange={e => setCooldown(e.target.value)}
        />
      </label>

    </form>
  )
}