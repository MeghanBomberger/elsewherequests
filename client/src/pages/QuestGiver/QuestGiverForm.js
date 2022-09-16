import { useCallback, useEffect, useState } from 'react'

import './QuestGiverForm.scss'
import { names, selectRandomNames } from '../../helpers/names'

export const QuestGiverForm = ({
  selectedQuestGiver,
  entityShapes,
  questGiverIds,
}) => {
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [damage, setDamage] = useState(500)
  const [health, setHealth] = useState(1000)
  const [reviveHours, setReviveHours] = useState(1)
  const [randomizedNames, setRandomizedNames] = useState([])
  const [shapeId, setShapeId] = useState("trader")

  // TODO - check for duplicate id
  // TODO - handle save

  const updateForm = useCallback(() => {
    setName(selectedQuestGiver.name)
    setId(selectedQuestGiver.id)
    setDamage(selectedQuestGiver.damage)
    setHealth(selectedQuestGiver.health)
    setReviveHours(selectedQuestGiver.reviveHours)
    setRandomizedNames(selectedQuestGiver.randomizedName)
    setShapeId(selectedQuestGiver.shape)
  }, [selectedQuestGiver])

  const rerollNames = () => setRandomizedNames(selectRandomNames())

  useEffect(() => {
    rerollNames()
  }, [])

  useEffect(() => {
    if (!!selectedQuestGiver) {
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
        <input
          required
          pattern={'/[^a-z0-9]/'}
          value={id}
          type="text"
          onChange={e => setId(e.target.value)}
        />
      </label>

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
            {entityShapes.map(shape => (
              <option
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
        {randomizedNames.map(name => <li>{name}</li>)}
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
        className="save-button"
        onClick={ e => {
          e.preventDefault()
          console.log({
            id,
            name,
            damage,
            health,
            reviveHours,
            randomizedNames,
            shapeId
          })
        }}
      >
        {selectedQuestGiver?.length > 0 ? 'Edit' : 'Create'} Quest Giver
      </button>
    </form>
  )
}
