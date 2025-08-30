import { useRef, useState } from 'react';
import FirstSection from './components/FirstSection';
import FourthSection from './components/FourthSection';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const secondSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionTitleRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#dde2eecc]">
      <FirstSection
        secondSectionRef={secondSectionRef}
        secondSectionTitleRef={secondSectionTitleRef}
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
      />
      <SecondSection ref={secondSectionRef} titleRef={secondSectionTitleRef} isVideoPlaying={isVideoPlaying} />
      <ThirdSection />
      <FourthSection />
    </div>
  );
}
