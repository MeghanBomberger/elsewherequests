import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import './QuestGiverForm.scss'
import { selectRandomNames } from '../../helpers/names'

export const QuestGiverForm = ({
  entityShapes,
  questGiverIds,
  selectedQuestGiver,
  setErrorMessage,
  setFormIsOpen,
  setQuestGivers,
}) => {
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [damage, setDamage] = useState(500)
  const [health, setHealth] = useState(1000)
  const [reviveHours, setReviveHours] = useState(1)
  const [randomizedNames, setRandomizedNames] = useState([])
  const [shapeId, setShapeId] = useState("trader")

  const updateForm = useCallback(() => {
    setName(selectedQuestGiver.name)
    setId(selectedQuestGiver.id)
    setDamage(selectedQuestGiver.damage)
    setHealth(selectedQuestGiver.health)
    setReviveHours(selectedQuestGiver.reviveHours)
    setRandomizedNames(selectedQuestGiver.randomizedNames)
    setShapeId(selectedQuestGiver.shape)
  }, [selectedQuestGiver])

  const validateId = useCallback(
    () => questGiverIds?.includes(id),
    [
      questGiverIds,
      id
    ]
  )

  const disableSave = useCallback(() => {
    return (
      !!id &&
      !!name &&
      !!damage &&
      !!health &&
      !!reviveHours &&
      !!randomizedNames?.length &&
      !!shapeId
    )
  }, [
    id,
    name,
    damage,
    health,
    reviveHours,
    randomizedNames,
    shapeId
  ])

  const handleSave = useCallback(async () => {
    const reqBody = {
      isEdit: selectedQuestGiver?.id,
      id,
      name,
      damage,
      health,
      reviveHours,
      randomizedNames,
      shapeId,
    }
    const res = await axios.post('http://localhost:5000/api/questgivers', reqBody)

    setQuestGivers(res)
    setFormIsOpen(false)

    return res
  }, [
    id,
    name,
    damage,
    health,
    reviveHours,
    randomizedNames,
    shapeId,
    selectedQuestGiver?.id,
    setFormIsOpen,
    setQuestGivers
  ])

  const rerollNames = () => setRandomizedNames(selectRandomNames())

  useEffect(() => {
    rerollNames()
  }, [])

  useEffect(() => {
    if (!!selectedQuestGiver?.id) {
      updateForm()
    }
  }, [selectedQuestGiver, updateForm])

  return (
    <form className="quest-giver-form">
      <label
        for="name"
      >
        Display Name:
        <input
          required
          value={name}
          type="text"
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label
        for="id"
      >
        VS ID:
        {!!selectedQuestGiver?.id 
        ? (
          <span>{selectedQuestGiver?.id}</span>
        )
        : (
          <input
            required
            pattern={'/[^a-z0-9]/'}
            value={id}
            type="text"
            onChange={e => setId(e.target.value)}
          />
          )
        }
      </label>
      {validateId() && !selectedQuestGiver?.id && (
        <i className="id-error">Quest Giver ID must be unique.</i>
      )}

      <label
        for="damage"
      >
        Damage:
        <input
          required
          value={damage}
          type="number"
          onChange={e => setDamage(e.target.value)}
        />
      </label>

      <label
        for="health"
      >
        Health:
        <input
          required
          value={health}
          type="number"
          onChange={e => setHealth(e.target.value)}
        />
      </label>

      <label
        for="reviveHours"
      >
        Revive Time (Hours):
        <input
          required
          value={reviveHours}
          type="number"
          onChange={e => setReviveHours(e.target.value)}
        />
      </label>

      {entityShapes?.length > 0 && (
        <label
          for="shape"
        >
          Entity Shape:
          <select
            required
            name='shape'
            onChange={e => setShapeId(e.target.value)}
            value={shapeId}
          >
            {entityShapes?.map(shape => (
              <option
                key={shape.id}
                value={shape.id}
              >
                {shape.displayName}
              </option>
            ))}
          </select>
        </label>
      )}

      <h3>Character Names</h3>
      <ul className='name-list'>
        {randomizedNames?.map(name => <li key={name}>{name}</li>)}
      </ul>
      <button 
        className="reroll-names"
        onClick={e => {
          e.preventDefault()
          rerollNames()
        }}
      >
        Pick New Names
      </button>
  
      <button 
        disabled={!disableSave()}
        className="save-button"
        onClick={ e => {
          e.preventDefault()
          !disableSave() ? setErrorMessage("Form is incomplete") : handleSave()
        }}
      >
        {!!selectedQuestGiver?.id ? 'Edit' : 'Create'} Quest Giver
      </button>
    </form>
  )
}
