import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss';
import { Home } from './pages/Home'
import { Items } from './pages/Items'
import { Mobs } from './pages/Mobs';
import { Mods } from './pages/Mods'
import { NotFound } from './pages/NotFound'
import { QuestGiver } from './pages/QuestGiver'
import { Quests } from './pages/Quests'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/items" element={<Items />} />
        <Route path="/mobs" element={<Mobs />} />
        <Route path="/mods" element={<Mods />} />
        <Route path="/questgivers" element={<QuestGiver />}/>
        <Route path="/quests" element={<Quests />} />
      </Routes>
    </div>
  );
}

export default App;
