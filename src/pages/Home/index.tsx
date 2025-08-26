import Footer from '@/components/Footer';
import FirstSection from './components/FirstSection';
import FourthSection from './components/FourthSection';
import Header from '@/components/Header';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';

export default function Home() {
  return (
    <div className="bg-[#dde2eecc]">
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </div>
  );
}
