import { useRef, useState } from 'react';
import FirstSection from './components/FirstSection';
import FourthSection from './components/FourthSection';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';
import { crawlingApi } from '@/api/crawling';

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const secondSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionTitleRef = useRef<HTMLDivElement>(null);

  const handleClick = async () => {
    await crawlingApi.crawling(5);
  };

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
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}
