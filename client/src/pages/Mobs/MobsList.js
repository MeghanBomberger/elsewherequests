import './MobsList.scss'
import editIcon from '../../assets/editing.png'

const columns = [
  {
    header: 'VS ID',
    key: 'id'
  },
  {
    header: 'Name',
    key: 'name'
  },
  {
    header: 'Source Mod',
    key: 'mod'
  },
  {
    header: 'Attributes',
    key: 'attributes'
  },
  {
    header: "",
    key: "edit"
  }
]

export const MobsList = ({
  mobs,
  setSelectedMob,
  setFormIsOpen
}) => {
  return mobs?.length > 0 
    ? (
      <table className="mobs-list">
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
          {mobs.map(row => (
            <tr key={`row-${row.id.split(" ").join("")}`}>
              <td>{row?.id}</td>
              <td>{row?.name}</td>
              <td>{row?.mod}</td>
              <td>{row?.attributes?.join(", ")}</td>
              <td>
                <button 
                  className="edit-mob"
                  onClick={() => {
                    setSelectedMob(row)
                    setFormIsOpen(true)
                  }}
                >
                  <img
                    alt={`edit ${row?.name}`}
                    title={`edit ${row?.name}`}
                    src={editIcon}
                    
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
    : (
      <h2>No Mobs Found</h2>
    )
}