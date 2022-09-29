import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

import './QuestForm.scss'
import closeIcon from '../../assets/cancel.png'

export const QuestForm = ({
  items,
  mobs,
  questGivers,
  quests,
  selectedQuest,
  setErrorMessage,
}) => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedQuestGiver, setSelectedQuestGiver] = useState('')
  const [selectedPreReqQuest, setSelectedPreReqQuest] = useState('')
  const [filteredGatherItems, setFilteredGatherItems] = useState([])
  const [selectedGatherItem, setSelectedGatherItem] = useState('')
  const [gatherObjectives, setGatherObjectives] = useState([])
  const [filteredKillMobs, setFilteredKillMobs] = useState([])
  const [selectedKillMob, setSelectedKillMob] = useState('')
  const [killObjectives, setKillObjectives] = useState([])
  const [filteredRewardItem, setFilteredRewardItem] = useState([])
  const [selectedRewardItem, setSelectedRewardItem] = useState('')
  const [rewardItems, setRewardItems] = useState([])
  const [perPlayer, setPerPlayer] = useState(false)
  const [cooldown, setCooldown] = useState(999999)

  const disableSave = useCallback(() => {
    return (
      !!id &&
      !!title &&
      !!description &&
      !!selectedQuestGiver &&
      !!selectedPreReqQuest &&
      !!perPlayer &&
      !!cooldown &&
      !!rewardItems?.length &&
      (
        !!gatherObjectives?.length || 
        !!killObjectives?.length
      )
    )
  }, [
    id,
    title,
    description,
    selectedQuestGiver,
    selectedPreReqQuest,
    perPlayer,
    cooldown,
    rewardItems,
    gatherObjectives,
    killObjectives
  ])

  const updateForm = useCallback(() => {
    setId(selectedQuest.id)
    setTitle(selectedQuest.title)
    setDescription(selectedQuest.description)
    setSelectedQuestGiver(selectedQuest.questGiver)
    setSelectedPreReqQuest(selectedQuest.preReqQuest)
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

  const addGatherItem = async (e) => {
    e.preventDefault()
    const itemId = e.target.value
    await setSelectedGatherItem(itemId)
    const selectedItem = items?.find(item => item.id === itemId)
    await setGatherObjectives([...gatherObjectives, selectedItem])
    const filteredItems = filteredGatherItems?.filter(item => item.id !== itemId)
    await setFilteredGatherItems(filteredItems)
    await setSelectedGatherItem('')
  }

  const removeGatherItem = async (e, selectedItem) => {
    e.preventDefault()
    const itemId = selectedItem.id
    await setGatherObjectives(gatherObjectives?.filter(item => item.id !== itemId))
    const filteredItems = [...filteredGatherItems, selectedItem]
    await setFilteredGatherItems(filteredItems)
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

  useEffect(() => {
    setFilteredGatherItems(items)
    setFilteredRewardItem(items)
  }, [items])

  useEffect(() => {
    setFilteredKillMobs(mobs)
  }, [mobs])

  // useEffect(() => {
  //   console.log({
  //     items,
  //     mobs,
  //     filteredGatherItems,
  //     filteredKillMobs,
  //     filteredRewardItem,
  //     selectedGatherItem,
  //     gatherObjectives,
  //     selectedQuestGiver
  //   })
  // }, [
  //   items,
  //   mobs,
  //   filteredGatherItems,
  //   filteredKillMobs,
  //   filteredRewardItem,
  //   selectedGatherItem,
  //   gatherObjectives, 
  //   selectedQuestGiver
  // ])

  return (
    <form className="quest-form">
      {!!selectedQuest?.id
        ? (
          <p>VS ID: {selectedQuest.id}</p>
        )
        : (
          <>
            <label for="id">
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

      <label for="title">
        Title:
        <input
          required
          value={title}
          type="text"
          onChange={e => setTitle(e.target.value)}
        />
      </label>

      <label for="description" className="quest-description">
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
            onChange={e => { 
              console.log(e.target.value) 
              setSelectedQuestGiver(e.target.value)
            }}
            value={selectedQuestGiver}
          >
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
        <label for="selectedPreReqQuest">
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

      <section className="objectives-section gather-items">
          <label for="gatherItems">
            Gather Objectives: 
            {!!filteredGatherItems?.length && (
              <select
                name="gatherItems"
                onChange={e => {
                  console.log(e.target.value)
                  addGatherItem(e)
                }}
                value={selectedGatherItem}
              >
                <option
                  key={"no-gatherobjective"}
                  value={""}
                >
                  NONE
                </option>
                {filteredGatherItems?.map(item => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}{item.mod !== "game" && ` (${item.mod})`}
                  </option>
                ))}
              </select>
            )}
          </label>
        
        {!!gatherObjectives?.length
          ? (
            <table className="objective-table">
              <tbody>
                {gatherObjectives?.map(item => (
                  <tr key={`gather-item-${item.id}`}>
                    <td>{item.name}</td>
                    <td>
                      <button
                        onClick={(e) => removeGatherItem(e, item)}
                      >
                        <img
                          alt="remove gather objective"
                          title="remove gather objective"
                          src={closeIcon}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          : (
            <p className="no-objective">No gather objectives selected</p>
          )
        }
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

      <button 
        disabled={!disableSave()}
        className="save-button"
        onClick={ e => {
          e.preventDefault()
          !disableSave() ? setErrorMessage("Form is incomplete") : handleSave()
        }}
      >
        {!!selectedQuest?.id ? 'Edit' : 'Create'} Quest Giver
      </button>
    </form>
  )
}