import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatBot from '@/pages/Chatbot';
import Home from '@/pages/Home';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chatbot/:id' element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
