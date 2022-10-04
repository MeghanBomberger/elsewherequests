import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

import './QuestForm.scss'
import { ObjectivesForm } from './ObjectivesForm'

export const QuestForm = ({
  items,
  mobs,
  questGivers,
  quests,
  selectedQuest,
  setErrorMessage,
  setQuests,
  setFormIsOpen,
}) => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedQuestGiver, setSelectedQuestGiver] = useState('')
  const [selectedPreReqQuest, setSelectedPreReqQuest] = useState('')
  const [gatherObjectives, setGatherObjectives] = useState([])
  const [killObjectives, setKillObjectives] = useState([])
  const [rewardItems, setRewardItems] = useState([])
  const [perPlayer, setPerPlayer] = useState(true)
  const [cooldown, setCooldown] = useState(999999)

  const disableSave = useCallback(() => {
    return (
      !!id &&
      !!title &&
      !!description &&
      !!selectedQuestGiver &&
      !!perPlayer &&
      !!cooldown &&
      !!rewardItems?.length
    )
  }, [
    id,
    title,
    description,
    selectedQuestGiver,
    perPlayer,
    cooldown,
    rewardItems
  ])

  const updateForm = useCallback(() => {
    setId(selectedQuest.id)
    setTitle(selectedQuest.title)
    setDescription(selectedQuest.description)
    setSelectedQuestGiver(selectedQuest.questGiverId)
    setSelectedPreReqQuest(selectedQuest.preReqQuestId)
    setGatherObjectives(selectedQuest.gatherObjectives)
    setKillObjectives(selectedQuest.killObjectives)
    setRewardItems(selectedQuest.rewardItems)
    setPerPlayer(selectedQuest.perPlayer)
    setCooldown(selectedQuest.cooldown)
  }, [selectedQuest])

  const validateId = useCallback(
    () => quests?.map(quest => quest.id).includes(id), [
      id,
      quests
    ]
  )

  const handleSave = async () => {
    const newQuest = {
      id,
      title,
      description,
      perPlayer,
      cooldown,
      gatherObjectives,
      killObjectives,
      rewardItems,
      questGiverId: selectedQuestGiver,
      preReqQuestId: selectedPreReqQuest,
    }
    await axios.post("http://localhost:5000/api/quests", newQuest)
      .then(res => {
        setQuests(res)
        // setFormIsOpen(false)
      })
      .catch(err => !!err && setErrorMessage("Error saving quest"))
  }

  useEffect(() => {
    if (!!selectedQuest?.id) {
      updateForm()
    }
  }, [selectedQuest, updateForm])

  console.log("QUEST FORM", {
    selectedQuest,
    gatherObjectives,
    killObjectives,
    rewardItems
  })

  return (
    <form className="quest-form">
      {!!selectedQuest?.id
        ? (
          <p>VS ID: {selectedQuest.id}</p>
        )
        : (
          <>
            <label htmlFor="id">
              VS ID:
              <input
                required
                value={id}
                type="text"
                onChange={e => setId(e.target.value)}
              />
            </label>
            {validateId() && !selectedQuest?.id && (
              <i className="id-error">Quest ID must be unique.</i>
            )}
          </>
        )
      }

      <label htmlFor="title">
        Title:
        <input
          required
          value={title}
          type="text"
          onChange={e => setTitle(e.target.value)}
        />
      </label>

      <label htmlFor="description" className="quest-description">
        Description (VTML):
        <textarea
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>

      {questGivers?.length && (
        <label htmlFor="selectedQuestGiver">
          Quest Giver:
          <select
            required
            name="selectedQuestGiver"
            onChange={e => setSelectedQuestGiver(e.target.value)}
            value={selectedQuestGiver}
          >
            <option
                value={""}
              >
                SELECT QUEST GIVER
              </option>
            {questGivers?.map(giver => (
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
        <label htmlFor="selectedPreReqQuest">
          Pre Requisit Quest (optional):
          <select
            name="selectedPreReqQuest"
            onChange={e => setSelectedPreReqQuest(e.target.value)}
            value={selectedPreReqQuest}
          >
            <option
              key={"no-prereq"}
              value={""}
            >
              NONE
            </option>
            {quests?.map(quest => (
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

      <ObjectivesForm
        objectives={gatherObjectives}
        setObjectives={setGatherObjectives}
        objectiveType="Gather Objective"
        options={items}
        singleGroup={false}
        isEdit={!!selectedQuest ? true : false}
      />

      <ObjectivesForm
        objectives={killObjectives}
        setObjectives={setKillObjectives}
        objectiveType="Kill Objective"
        options={mobs}
        singleGroup={false}
        isEdit={!!selectedQuest ? true : false}
      />

      <ObjectivesForm
        objectives={rewardItems}
        setObjectives={setRewardItems}
        objectiveType="Item Reward"
        options={items}
        singleGroup={true}
        isEdit={!!selectedQuest ? true : false}
      />

      <label htmlFor="perPlayer" className="solo-quest">
        Solo Quest:
        <input
          type="checkbox"
          checked={perPlayer}
          onChange={() => setPerPlayer(!perPlayer)}
        />
      </label>

      <label htmlFor="cooldown">
        Cooldown in Hours:
        <input
          required
          value={cooldown}
          type="number"
          onChange={e => setCooldown(e.target.value)}
        />
      </label>

      <button 
        disabled={!disableSave()}
        className={disableSave() ? "save-button" : "save-button-disabled"}
        onClick={ e => {
          e.preventDefault()
          !disableSave() ? setErrorMessage("Form is incomplete") : handleSave()
        }}
      >
        {!!selectedQuest?.id ? 'Edit' : 'Create'} Quest
      </button>
    </form>
  )
}
