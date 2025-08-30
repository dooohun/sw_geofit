/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import ConclusionPage from './components/Conclusion';
import DataSourcePage from './components/DataSource';
import BusinessDetailPage from './components/FifthPage';
import CoverPage from './components/FirstPage';
import ScoreSummaryPage from './components/FourthPage';
import ExecutiveSummaryPage from './components/SecondPage';
import RentAnalysisPage from './components/SeventhPage';
import Top3ComparisonPage from './components/SixthPage';
import LocationMapPage from './components/ThirdPage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { filesApi } from '@/api/files';

interface ReportGeneratorProps {
  reportRef: React.RefObject<HTMLDivElement | null>;
  reportData: any;
  shouldGeneratePDF: boolean;
  onPDFGenerated: (pdfKey: string) => void;
}

export default function ReportGenerator({
  reportRef,
  reportData,
  shouldGeneratePDF,
  onPDFGenerated,
}: ReportGeneratorProps) {
  const isGeneratingRef = useRef(false); // 중복 실행 방지를 위한 ref

  useEffect(() => {
    if (shouldGeneratePDF && reportData && reportRef.current && onPDFGenerated && !isGeneratingRef.current) {
      isGeneratingRef.current = true;
      const generatePDF = async () => {
        try {
          // PDF 생성 로직
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [794, 1123],
          });

          const pages = reportRef.current!.querySelectorAll('[data-page]');

          for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            const canvas = await html2canvas(page, {
              scale: 3,
              useCORS: true,
              allowTaint: false,
              backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.9);

            if (i > 0) {
              pdf.addPage();
            }

            pdf.addImage(imgData, 'JPEG', 0, 0, 794, 1123);
          }

          const pdfBlob = pdf.output('blob');
          const currentDate = new Date().toISOString().split('T')[0];
          const fileName = `상권분석리포트_세종시소담동_${currentDate}.pdf`;
          const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

          // S3 업로드
          const { getPresignedUrl, uploadFile } = filesApi;
          const presignedResponse = await getPresignedUrl(pdfFile);
          const { url: presignedUrl, key } = presignedResponse;

          await uploadFile(presignedUrl, pdfFile);

          onPDFGenerated(key);
        } catch (error) {
          console.error('PDF 생성 오류:', error);
        } finally {
          isGeneratingRef.current = false; // 완료 후 플래그 리셋
        }
      };

      generatePDF();
    }
  }, [shouldGeneratePDF, reportData, onPDFGenerated]);
  return (
    <div className="absolute top-[100000px] flex justify-center">
      <div className="space-y-8">
        <div ref={reportRef}>
          {reportData.pages.map((page: any) => (
            <div data-page={`page-${page.id}`} key={page.id} className="flex flex-col items-center">
              {page.title === '표지' && <CoverPage data={page} />}
              {page.title === 'Executive Summary' && <ExecutiveSummaryPage data={page} />}
              {page.title === '공실 위치 맵' && <LocationMapPage data={page} />}
              {page.title === '상권 종합 점수 요약' && <ScoreSummaryPage data={page} />}
              {page.title.includes('업종 상세') && <BusinessDetailPage data={page} />}
              {page.title === 'Top3 비교' && <Top3ComparisonPage data={page} />}
              {page.title === '임대료 분석' && <RentAnalysisPage data={page} />}
              {page.title === '결론' && <ConclusionPage data={page} />}
              {page.title === '데이터 출처/산식' && <DataSourcePage data={page} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
