import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatBot from '@/pages/Chatbot';
import ChatBotHome from '@/pages/Chatbot/Home';
import Home from '@/pages/Home';
import Analysis from '@/pages/Analysis';
import PropertyRegistration from '@/pages/PropertyRegistration';
import './App.css';
import Layout from './components/Layout';
import PropertySearchPage from './pages/PropertySearch';
import KakaoMap from '@/pages/KakaoMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/property-registration" element={<PropertyRegistration />} />
          <Route path="/property-search" element={<PropertySearchPage />} />
        </Route>
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/chatbot" element={<ChatBotHome />} />
        <Route path="/chatbot/:id" element={<ChatBot />} />
        <Route path="/kakao-map" element={<KakaoMap />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
