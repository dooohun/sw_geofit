import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// 디버깅을 위한 이벤트 리스너
worker.events.on('request:start', ({ request }) => {
  console.log('🚀 MSW intercepting:', request.method, request.url);
});

worker.events.on('request:match', ({ request }) => {
  console.log('✅ MSW matched:', request.method, request.url);
});

worker.events.on('request:unhandled', ({ request }) => {
  console.log('❌ MSW unhandled:', request.method, request.url);
});