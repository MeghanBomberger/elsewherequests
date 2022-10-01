import axios from 'axios'
import { 
  useEffect, 
  useState, 
} from 'react'

import './index.scss'
import closeIcon from '../../assets/cancel.png'
import { Header } from '../../components/Header'
import ShapesForm from './ShapesForm'
import ShapesList from './ShapesList'

export const Shapes = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [shapes, setShapes] = useState([])
  const [selectedShape, setSelectedShape] = useState(null)
  const [formIsOpen, setFormIsOpen] = useState(false)

  const fetchShapesData = async () => {
    const res = await axios.get("http://localhost:5000/api/shapes")
    return res?.data || []
  }

  const refetchData = () => {
    fetchShapesData()
      .then(res => setShapes(res))
      .catch(err => {
        console.error(err)
        setErrorMessage("An error has occurred fetching the shapes data.")
      })
  }

  useEffect(() => {
    refetchData()
  }, [])

  return (
    <>
      <Header title="Shapes"/>

      <main className="shapes">
        {!!errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <section
          className={`shapes-form-action ${formIsOpen ? 'open' : 'closed'}`}
        >
          {!formIsOpen && (
            <button
              className="open-form"
              onClick={() => setFormIsOpen(true)}
            >
              Add Shape
            </button>
          )}

          {!!formIsOpen && (
            <div>
              <h2>
                { !!selectedShape 
                    ? `Edit ${selectedShape.name}` 
                    : 'Create New Shape'
                }
              </h2>

              <button
                className="close-form-button"
                onClick={() => {
                  setSelectedShape(null)
                  setFormIsOpen(false)
                }}
              >
                <img
                  alt="close form"
                  title="close form"
                  src={closeIcon}
                />
              </button>
            </div>
          )}
        </section>

        {!!formIsOpen && (
          <ShapesForm
            shapes={shapes}
            selectedShape={selectedShape}
            setShapes={setShapes}
          />
        )}

        <ShapesList 
          shapes={shapes}
          setSelectedShape={setSelectedShape}
        />
      </main>
    </>
  )
}
