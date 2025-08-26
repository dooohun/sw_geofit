import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col bg-[#F5F6FA]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
