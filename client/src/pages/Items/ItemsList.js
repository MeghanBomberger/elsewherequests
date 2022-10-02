import './ItemsList.scss'
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
    header: 'Primary Attributes',
    key: 'primaryAttributes'
  },
  {
    header: 'Secondary Attributes',
    key: 'secondaryAttributes'
  },
  {
    header: "",
    key: "edit"
  }
]

export const ItemsList = ({
  items,
  setSelectedItem,
  setFormIsOpen
}) => {
  return items?.length > 0 ? (
    <table className="items-list">
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
        {items.map(row => (
          <tr key={`row-${row.id.split(" ").join("")}`}>
            <td>{row?.id}</td>
            <td>{row?.name}</td>
            <td>{row?.mod}</td>
            <td>{row?.primaryAttributes?.join(", ")}</td>
            <td>{row?.secondaryAttributes?.join(", ")}</td>
            <td>
              <button 
                className="edit-item"
                onClick={() => {
                  setSelectedItem(row)
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
  ) : (
    <h2>No Items Found</h2>
  )
}
