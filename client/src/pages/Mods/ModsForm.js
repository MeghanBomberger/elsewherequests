import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

import './ModsForm.scss'

export const ModsForm = ({
  mods,
  selectedMod,
  setErrorMessage,
  setMods
}) => {
  const [name, setName] = useState("")
  const [version, setVersion] = useState("")

  const disableSave = useCallback(() => {
    return (
      !!name && !!version
    )
  }, [name, version])

  const updateForm = useCallback(() => {
    setName(selectedMod.name)
    setVersion(selectedMod.version)
  }, [selectedMod])

  const validateName = useCallback(
    () => mods?.map(mod => mod.name).includes(name), 
    [name, mods]
  )

  const handleSave = useCallback(
    async () => {
      const newMod = {
        name,
        version
      }
      const res = await axios.post("http://localhost:5000/api/mods", newMod)
      setMods(res)
    },
    [
      name, 
      version,
      setMods
    ]
  )

  useEffect(() => {
    if (!!selectedMod?.name) {
      updateForm()
    }
  }, [selectedMod, updateForm])

  return (
    <form className="mod-form">
      {!!selectedMod?.name
        ? (
          <p>Mod Name: {selectedMod.name}</p>
        )
        : (
          <>
            <label for="name">
              Mod Name:
              <input
                required
                value={name}
                type="text"
                onChange={e => setName(e.target.value)}
              />
            </label>
            {validateName() && !selectedMod?.name && (
              <i className="name-error">Mod name must be unique.</i>
            )}
          </>
        )
      }

      <label for="version">
        Version Number:
        <input
          required
          value={version}
          type="text"
          onChange={e => setVersion(e.target.value)}
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
        {!!selectedMod?.id ? 'Edit' : 'Create'} Mod
      </button>
    </form>
  )
}