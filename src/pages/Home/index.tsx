import FirstSection from './components/FirstSection';
import Header from './components/Header';
import SecondSection from './components/SecondSection';

export default function Home() {
  return (
    <div className="bg-[#dde2eecc]">
      <Header />
      <FirstSection />
      <SecondSection />
    </div>
  );
}
