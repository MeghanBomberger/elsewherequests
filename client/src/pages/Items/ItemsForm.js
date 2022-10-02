import axios from 'axios'
import { 
  useCallback,
  useEffect, 
  useState, 
} from 'react'

import './ItemsForm.scss'
import closeIcon from '../../assets/cancel.png'

export const ItemsForm = ({
  items, 
  mods,
  selectedItem,
  setErrorMessage,
  refetchData,
  setFormIsOpen,
}) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [mod, setMod] = useState('game')
  const [primary, setPrimary] = useState('')
  const [secondary, setSecondary] = useState('')
  const [primaryAttributes, setPrimaryAttributes] = useState([])
  const [secondaryAttributes, setSecondaryAttributes] = useState([])

  const updateForm = useCallback(() => {
    setId(selectedItem.id)
    setName(selectedItem.name)
    setMod(selectedItem.mod)
    setPrimaryAttributes(selectedItem.primaryAttributes)
    setSecondaryAttributes(selectedItem.secondaryAttributes)
  }, [selectedItem])

  const validateId = useCallback(
    () => !!items?.length && items?.map(item => item.id).includes(id), [
      id,
      items
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
      const newItem = {
        id,
        name,
        mod,
        primaryAttributes,
        secondaryAttributes,
      }
      await axios.post('http://localhost:5000/api/items', newItem)
        .then(() => {
          refetchData()
          setId('')
          setName('')
          setMod('game')
          setPrimary('')
          setSecondary('')
          setPrimaryAttributes([])
          setSecondaryAttributes([])
          setFormIsOpen(false)
        })
        .catch(err => !!err && setErrorMessage("ERROR SAVING ITEM"))
    },
    [
      id,
      name,
      mod,
      primaryAttributes,
      secondaryAttributes,
      setErrorMessage,
      refetchData,
      setFormIsOpen
    ]
  )

  const addPrimaryAttribute = (e, id) => {
    e.preventDefault()
    setPrimaryAttributes([...primaryAttributes, id])
    setPrimary("")
  }

  const removePrimaryAttribute = (e, id) => {
    e.preventDefault()
    setPrimaryAttributes(primaryAttributes?.filter(attr => attr !== id))
  }

  const addSecondaryAttribute = (e, id) => {
    e.preventDefault()
    setSecondaryAttributes([...secondaryAttributes, id])
    setSecondary("")
  }

  const removeSecondaryAttribute = (e, id) => {
    e.preventDefault()
    setSecondaryAttributes(secondaryAttributes?.filter(attr => attr !== id))
  }

  useEffect(() => {
    if (!!selectedItem?.id) {
      updateForm()
    }
  }, [selectedItem, updateForm])

  return (
    <form className="item-form">
      {!!selectedItem?.id
        ? (
          <p>VS ID: {selectedItem.id}</p>
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
            {validateId() && !selectedItem?.id && (
              <i className="id-error">item ID must be unique.</i>
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

      <label for="primaryAttribute">
        Primary Attribute:
        <input
          name="primaryAttribute"
          value={primary}
          onChange={e => setPrimary(e.target.value)}
        />
        <button
          className="add-attribute"
          onClick={(e) => addPrimaryAttribute(e, primary)}
        >
          Add
        </button>
      </label>

      {!!primaryAttributes?.length && (
        <section className="attributes-list">
          {primaryAttributes?.map(attr => (
            <div key={attr}>
              <p>{attr}</p>
              <button 
                className="remove-attribute"
                onClick={e => removePrimaryAttribute(e, attr)}
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

      <label for="secondaryAttribute">
        Secondary Attribute:
        <input
          name="secondaryAttribute"
          value={secondary}
          onChange={e => setSecondary(e.target.value)}
        />
        <button
          className="add-attribute"
          onClick={(e) => {
            addSecondaryAttribute(e, secondary)
          }}
        >
          Add
        </button>
      </label>

      {!!secondaryAttributes?.length && (
        <section className="attributes-list">
          {secondaryAttributes?.map(attr => (
            <div key={attr}>
              <p>{attr}</p>
              <button 
                className="remove-attribute"
                onClick={e => removeSecondaryAttribute(e, attr)}
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
          console.log("save?")
          e.preventDefault()
          console.log(disableSave)
          !disableSave() ? setErrorMessage("Form is incomplete") : handleSave()
        }}
      >
        {!!selectedItem?.id ? 'Edit' : 'Create'} Item
      </button>
    </form>
  )
}
