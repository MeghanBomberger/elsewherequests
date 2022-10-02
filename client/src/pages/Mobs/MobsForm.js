import axios from 'axios'
import { 
  useCallback,
  useEffect, 
  useState, 
} from 'react'

import './MobsForm.scss'
import closeIcon from '../../assets/cancel.png'

export const MobsForm = ({
  mobs,
  mods,
  selectedMob,
  setErrorMessage,
  refetchData,
  setFormIsOpen,
}) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [mod, setMod] = useState('game')
  const [selectedAttribute, setSelectedAttribute] = useState('')
  const [attributes, setAttributes] = useState([])

  const updateForm = useCallback(() => {
    setId(selectedMob.id)
    setName(selectedMob.name)
    setMod(selectedMob.mod)
    setAttributes(selectedMob.attributes)
  }, [selectedMob])

  const validateId = useCallback(
    () => !!mobs?.length && mobs?.map(mob => mob.id).includes(id), [
      id,
      mobs
    ]
  )

  const disableSave = useCallback(() => {
    return (
      !validateId() &&
      !!id &&
      !!name &&
      !!mod
    )
  }, [
    id,
    name,
    mod,
    validateId
  ])

  const handleSave = useCallback(
    async () => {
      const newMob = {
        id,
        name,
        mod,
        attributes
      }
      
      await axios.post('http://localhost:5000/api/mobs', newMob)
        .then(() => {
          refetchData()
          setId('')
          setName('')
          setMod('game')
          setSelectedAttribute('')
          setAttributes([])
          setFormIsOpen(false)
        })
        .catch(err => !!err && setErrorMessage("ERROR SAVING MOB"))
    },
    [
      id,
      name,
      mod,
      attributes,
      setFormIsOpen,
      refetchData,
      setErrorMessage
    ]
  )

  const addAttribute = (e, id) => {
    e.preventDefault()
    setAttributes([...attributes, id])
    setSelectedAttribute("")
  }

  const removeAttribute = (e, id) => {
    e.preventDefault()
    setAttributes(attributes?.filter(attr => attr !== id))
  }

  useEffect(() => {
    if (!!selectedMob?.id) {
      updateForm()
    }
  }, [selectedMob, updateForm])

  return (
    <form className="mobs-form">
      {!!selectedMob?.id
        ? (
          <p>VS ID: {selectedMob.id}</p>
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
            {validateId() && !selectedMob?.id && (
              <i className="id-error">Mob ID must be unique.</i>
            )}
          </>
        )
      }

      <label for="name">
        Name:
        <input
          required
          value={name}
          type="text"
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label for="mod">
        Source Mod:
        <select
          required
          name="mod"
          onChange={e => setMod(e.target.value)}
          value={mod}
        >
          <option
            value="game"
          >
            Base Game
          </option>
          {!!mods?.length && mods?.map(mod => (
            <option
              key={mod.id}
              value={mod.id}
            >
              {mod.id} ({mod.version})
            </option>
          ))}
        </select>
      </label>

      <label for="attribute">
        Primary Attribute:
        <input
          name="attribute"
          value={selectedAttribute}
          onChange={e => setSelectedAttribute(e.target.value)}
        />
        <button
          className="add-attribute"
          onClick={(e) => addAttribute(e, selectedAttribute)}
        >
          Add
        </button>
      </label>

      {!!attributes?.length && (
        <section className="attributes-list">
          {attributes?.map(attr => (
            <div key={attr}>
              <p>{attr}</p>
              <button 
                className="remove-attribute"
                onClick={e => removeAttribute(e, attr)}
              >
                <img
                  alt={`remove-${attr}`}
                  title={`remove-${attr}`}
                  src={closeIcon}
                />
              </button>
            </div>
          ))}
        </section>
      )}

      <button 
        disabled={!disableSave()}
        className={disableSave() ? "save-button" : "save-button-disabled"}
        onClick={ e => {
          e.preventDefault()
          !disableSave() ? setErrorMessage("Form is incomplete") : handleSave()
        }}
      >
        {!!selectedMob?.id ? 'Edit' : 'Create'} Mob
      </button>
    </form>
  )
}