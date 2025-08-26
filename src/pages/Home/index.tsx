import FirstSection from './components/FirstSection';
import FourthSection from './components/FourthSection';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';

export default function Home() {
  return (
    <div className="bg-[#dde2eecc]">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </div>
  );
}
