import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { worker } from '@/mocks/browser';

// async function enableMocking() {
//   if (import.meta.env.MODE !== 'development') {
//     return
//   }

//   console.log('🔧 Attempting to start MSW...');
  
//   // Service Worker 지원 확인
//   if (!('serviceWorker' in navigator)) {
//     console.error('🔴 Service Worker is not supported in this browser');
//     return;
//   }

//   try {
//     const { worker } = await import('@/mocks/browser')
    
//     console.log('🔧 MSW worker imported successfully');
    
//     // MSW 시작
//     await worker.start({
//       onUnhandledRequest: (request, print) => {
//         const url = new URL(request.url);
//         console.log('🔴 Unhandled request:', request.method, url.pathname);
        
//         // API 요청만 로깅
//         if (url.pathname.startsWith('/api/')) {
//           console.error('🔴 API request not intercepted:', request.method, request.url);
//           print.warning();
//         }
//       },
//       serviceWorker: {
//         url: '/mockServiceWorker.js'
//       },
//       waitUntilReady: true
//     });

//     console.log('🎉 MSW started successfully!');
    
//     // 서비스 워커 등록 상태 확인
//     const registrations = await navigator.serviceWorker.getRegistrations();
//     console.log('🔧 Service Worker registrations:', registrations.length);
    
//     if (registrations.length > 0) {
//       console.log('🔧 Active service worker found:', registrations[0].active?.scriptURL);
//     }
    
//     return true;
//   } catch (error) {
//     console.error('🔴 MSW failed to start:', error);
//     return false;
//   }
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})
// enableMocking()
//   .then(() => {
    
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
)
  // })
  // .catch((error) => {
  //   console.error('🔴 Failed to start app:', error);
  //   createRoot(document.getElementById('root')!).render(
  //     <QueryClientProvider client={queryClient}>
  //       <StrictMode>
  //         <App />
  //       </StrictMode>
  //     </QueryClientProvider>,
  //   )
  // });
