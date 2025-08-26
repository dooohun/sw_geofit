import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatBot from '@/pages/Chatbot';
import ChatBotHome from '@/pages/Chatbot/Home';
import Home from '@/pages/Home';
import './App.css';
import Analysis from '@/pages/Analysis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBotHome />} />
        <Route path="/chatbot/:id" element={<ChatBot />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
