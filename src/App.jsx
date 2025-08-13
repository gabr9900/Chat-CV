
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChatCv } from './components/ChatCv'
import Homepage from './components/Homepage'
import Notfound from './components/Notfound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chatcv" element={<ChatCv />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
