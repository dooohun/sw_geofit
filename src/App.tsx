import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home/Home';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/chatbot/:id' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
