import React from 'react'

import './QuestGiverList.scss'
import editIcon from '../../assets/editing.png'

const columns = [
  {
    header: 'Display Name',
    key: 'name'
  },
  {
    header: 'VS ID',
    key: 'id',
  },
  {
    header: 'Quests',
    key: 'quests',
  },
  {
    header: 'Damage',
    key: 'damage',
  },
  {
    header: 'Health',
    key: 'health',
  },
  {
    header: 'Revive Hours',
    key: 'reviveHours',
  },
  {
    header: 'Character Names',
    key: 'randomizedName',
  },
  {
    header: 'Entity Shape',
    key: 'shape',
  },
  {
    header: '',
    key: 'edit'
  }
]

export const QuestGiverList = ({ 
  data, 
  entityShapes,
  setFormIsOpen,
  setSelectedQuestGiver, 
}) => {
  return data?.length > 0 ? (
    <table className="quest-givers-list">
      <thead>
        <tr>
          {columns?.map(column => (
            <th key={`column-header-${column.header.split(" ").join("")}`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.map(row => (
          <tr key={`row-${row.id.split(" ").join("")}`}>
            <td>
              {row?.name || ''}
            </td>

            <td>
              {row?.id || ''}
            </td>

            <td>
              {row?.quests?.length > 0 && (
                <ul>
                  {row?.quests?.map(quest => (
                    <li key={`quest-${quest}`}>
                      {quest}
                    </li>
                  ))}
                </ul>
              )}
            </td>

            <td>
              {row?.damage || ''}
            </td>

            <td>
              {row?.health ? `${row.health}/${row.health}` : ''}
            </td>

            <td>
              {row?.reviveHours || ''} hour{row?.reviveHours > 1 && 's'}
            </td>

            <td>
              {row?.randomizedNames?.length > 0 && (
                <ul>
                  {row.randomizedNames?.map(name => (
                    <li key={`npcnames-${name}`}>
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </td>

            <td>
              {row?.shape && entityShapes?.length > 0 && (entityShapes.find(shape => shape.id === row?.shape)?.displayName || '')}
            </td>

            <td>
              <button
                className="edit-button"
                onClick={() => {
                  setSelectedQuestGiver(row)
                  setFormIsOpen(true)
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                }}
              >
                <img
                  alt="edit quest giver"
                  title="edit quest giver"
                  src={editIcon}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h2>No Quest Givers Found</h2>
  )
}
