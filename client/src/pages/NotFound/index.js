import React from "react";

import './styles.scss'
import { Header } from '../../components/Header'

export const NotFound = () => {
  return (
    <>
      <Header title="Oh no..."/>
      <main className="not-found">
        <h2>404</h2>
        <h3>Page Not Found</h3>
      </main>
    </>
  )
}
