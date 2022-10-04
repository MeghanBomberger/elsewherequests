import { 
  useCallback,
  useEffect,
  useState,
} from 'react'

import './ObjectivesForm.scss'
import closeIcon from '../../assets/cancel.png'

export const ObjectivesForm = ({
  objectives,
  setObjectives,
  objectiveType,
  options,
  singleGroup,
  isEdit,
}) => {
  const [groupIndex, setGroupIndex] = useState(0)
  const [groups, setGroups] = useState({})
  const [selectedObjectives, setSelectedObjectives] = useState({})
  const [filteredOptions, setFilteredOptions] = useState([])

  const parseFormIsEdit = useCallback(async () => {
    if (!!isEdit) {
      const newGroups = {}
      await objectives.forEach((objective, i) => {
        newGroups[i] = {
          ids: singleGroup ? [objective.itemCode] : objective.ids,
          quantity: singleGroup ? objective.amount : objective.demand,
          description: singleGroup ? "" : objective.description
        }
      })
      return setGroups(newGroups)
    } else if (!!singleGroup) {
      const newGroups = {}
      newGroups[0] = {
        ids: [],
        quantity: 1,
        description: ""
      }
      return newGroups
    }
    return {}
  }, [
    isEdit,
    singleGroup,
    objectives
  ])

  const updateForm = useCallback(async () => {
    const newGroups = objectives?.length > 0 ? await parseFormIsEdit() : {}
    setGroups(newGroups)
    setGroupIndex(Object.keys(newGroups)?.length + 1)
  }, [
    parseFormIsEdit,
    objectives
  ])

  const addObjectiveGroup = useCallback(
    e => {
      e?.preventDefault()
      setGroups({...groups, [groupIndex + 1]: {
        ids: [],
        quantity: 1,
        description: ''
      }})
      setSelectedObjectives({
        ...selectedObjectives,
        [groupIndex + 1]: ''
      })
      setGroupIndex(groupIndex + 1)
    },
    [
      groupIndex,
      groups, 
      selectedObjectives, 
    ]
  )

  const removeObjectiveGroup = useCallback(
    (e, key) => {
      e?.preventDefault()
      const newObjectiveGroups = {...groups}
      delete newObjectiveGroups[key]
      const newSelectedObjectives = {...selectedObjectives}
      delete newSelectedObjectives[key]
      setGroups(newObjectiveGroups)
      setSelectedObjectives(newSelectedObjectives)
    },
    [
      groups, 
      selectedObjectives
    ]
  )

  const addObjective = useCallback(
    (
      e,
      groupKey
    ) => {
      e?.preventDefault()
      const newGroups = {...groups}
      newGroups[groupKey].ids = [...newGroups[groupKey].ids, e.target.value]
      const newFilteredOptions = filteredOptions?.filter(option => option.id !== e.target.value)
      setGroups(newGroups)
      setFilteredOptions(newFilteredOptions)
    },
    [
      filteredOptions,
      groups,
    ]
  )

  const removeObjective = useCallback(
    (
      e,
      groupKey,
      optionId
    ) => {
      e?.preventDefault()
      const newGroups = {...groups}
      newGroups[groupKey].ids = newGroups[groupKey].ids?.filter(option => option !== optionId)
      const newFilteredOptions = [...filteredOptions, optionId]
      setGroups(newGroups)
      setFilteredOptions(newFilteredOptions)
    },
    [
      filteredOptions,
      groups,
    ]
  )

  const setObjectiveGroupQuantity = useCallback(
    (e, groupKey) => {
      e?.preventDefault()
      const newGroups = {...groups}
      newGroups[groupKey].quantity = parseInt(e.target.value)
      setGroups(newGroups)
    },
    [groups]
  )

  const setObjectiveGroupDescription = useCallback(
    (e, groupKey) => {
      e?.preventDefault()
      const newGroups = {...groups}
      newGroups[groupKey].description = e.target.value
      setGroups(newGroups)
    },
    [groups]
  )

  const formatObjectives = useCallback(
    () => {
      const formatedGroups = Object.keys(groups)?.map(group => {
        const newGroup = {}
        if (isEdit) {
          newGroup.itemCode = group.ids[0]
          newGroup.amount = group.quantity
        } else {
          newGroup.ids = group.ids
          newGroup.demand = group.quantity
          newGroup.description = group.description
        }
        return newGroup
      })
      return formatedGroups
    },
    [
      groups,
      isEdit
    ]
  )

  useEffect(() => {
    console.log("OBJECTIVE FORM", {
      objectiveType,
      objectives,
      groups,
      isEdit,
      singleGroup
    })
    updateForm()
  }, [])

  useEffect(() => {
    console.log({groups})
    setObjectives(formatObjectives())
  }, [groups])

  return (
    <>
      <h4 className="objective-header">{objectiveType}s</h4>
    
      {Object.keys(groups)?.length === 0
        ? (<p className="no-objective-text">No {objectiveType}s added</p>)
        : ( Object.keys(groups).map(groupKey => (
            <section 
              key={`objective-group-${groupKey}`}
              className="objective-group"
            >
              {((singleGroup && groups[groupKey].ids?.length < 1) || !singleGroup) && (
                <select
                  name={`optionGroup${groupKey}`}
                  onChange={e => addObjective(e, groupKey)}
                  value={singleGroup ? groups[groupKey].ids : selectedObjectives[groupKey]}
                >
                  <option
                    key={`no-objective-group-${groupKey}`}
                  >
                    NONE
                  </option>
                  {filteredOptions?.map(option => (
                    <option
                      key={`${groupKey}-option-${option.id}`}
                      value={option.id}
                    >
                      {option.name}{option?.mod !== "game" && ` (${option.mod})`}
                    </option>
                  ))}
                </select>
              )}

              {groups[groupKey]?.ids?.length === 0
                ? (
                  <p className="no-objective-text">No options added to objective.</p>
                )
                : (
                  <div className="selected-options">
                    {groups?.[groupKey]?.ids?.map(id => (
                      <button
                        className="remove-option"
                        onClick={e => removeObjective(e, groupKey, id)}
                      >
                        {id}
                        <img
                          alt={`remove ${id} from objective group ${groupKey}`}
                          title={`remove ${id} from objective group ${groupKey}`}
                          src={closeIcon}
                        />
                      </button>
                    ))}
                  </div>
                )
              }

              <label htmlFor={`${groupKey}-quantity`}>
                Quantity:
                <input
                  required
                  type="number"
                  value={groups[groupKey].quantity}
                  onChange={e => setObjectiveGroupQuantity(e, groupKey)}
                />
              </label>

              {!singleGroup && (
                <label htmlFor={`${groupKey}-description`}>
                  Description:
                  <textarea
                    required
                    value={groups[groupKey].description}
                    onChange={e => setObjectiveGroupDescription(e, groupKey)}
                  />
                </label>
              )}
              
              <button 
                className="remove-objective-group"
                onClick={e => removeObjectiveGroup(e, groupKey)}
              >
                Remove {objectiveType} Group
              </button>
            </section>
          ))
        )
      }

      <button 
        className="add-objective-group"
        onClick={e => addObjectiveGroup(e)}
      >
        Add {objectiveType} Group
      </button>

      <hr/>
    </>
  )
}
