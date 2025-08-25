// mocks/handlers.ts - 데모용 간단한 대화 플로우
import { http, HttpResponse } from 'msw';
import type { ChatbotSessionResponse, ChatMessageResponse, CreateChatBotSessionResponse } from '@/api/chatbot/entity';

// 초기 세션 데이터 (빈 세션들)
const sessions: ChatbotSessionResponse[] = [
  { id: 1, title: '수원시 영통구 치킨집 분석' },
  { id: 2, title: '새로운 상담' },
];

// 빈 메시지로 시작 (실제 통신으로만 대화 진행)
const messages: Record<number, ChatMessageResponse[]> = {
  1: [], // 빈 배열로 시작
  2: []
};

let nextMessageId = 1;

// 대화 상태 추적
const conversationStates: Record<number, {
  step: 'start' | 'asked_rent' | 'completed';
}> = {
  1: { step: 'start' },
  2: { step: 'start' }
};

export const handlers = [
  // 세션 목록 조회
  http.get('http://localhost:3000/api/chatbot/session', () => {
    console.log('🔵 MSW: GET sessions intercepted');
    return HttpResponse.json(sessions, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // 메시지 조회 (처음에는 빈 배열)
  http.get('http://localhost:3000/api/chatbot/:sessionId', ({ params }) => {
    console.log('🔵 MSW: GET messages intercepted for session', params.sessionId);
    const sessionId = parseInt(params.sessionId as string);
    const sessionMessages = messages[sessionId] || [];
    
    return HttpResponse.json(sessionMessages, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // 새 세션 생성
  http.post('http://localhost:3000/api/chatbot/session', async () => {
    console.log('🔵 MSW: POST create session intercepted');
    
    const newSession: CreateChatBotSessionResponse = {
      id: sessions.length + 1,
      title: `새로운 상담 ${sessions.length + 1}`
    };
    
    sessions.push(newSession);
    messages[newSession.id] = []; // 빈 배열로 시작
    conversationStates[newSession.id] = { step: 'start' };
    
    return HttpResponse.json(newSession, {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // 메시지 전송 - 실제 대화 플로우
  http.post('http://localhost:3000/api/chatbot/:sessionId', async ({ params, request }) => {
    console.log('🔵 MSW: POST message intercepted for session', params.sessionId);
    const sessionId = parseInt(params.sessionId as string);
    
    let body;
    try {
      body = await request.json() as { content: string };
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    
    if (!messages[sessionId]) {
      messages[sessionId] = [];
    }
    
    if (!conversationStates[sessionId]) {
      conversationStates[sessionId] = { step: 'start' };
    }
    
    // 사용자 메시지 추가
    const userMessage: ChatMessageResponse = {
      id: nextMessageId++,
      isUser: true,
      content: body.content
    };
    messages[sessionId].push(userMessage);
    
    // 봇 응답 생성 (즉시)
    const botResponse = generateDemoResponse(sessionId, body.content);
    if (botResponse) {
      const botMessage: ChatMessageResponse = {
        id: nextMessageId++,
        isUser: false,
        content: botResponse
      };
      
      // 실제 챗봇처럼 약간의 지연 후 응답
      setTimeout(() => {
        messages[sessionId].push(botMessage);
        console.log('🤖 Bot response added:', botMessage);
      }, 800 + Math.random() * 400);
    }
    
    return HttpResponse.json({ 
      success: true,
      message: userMessage
    }, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // 백업 상대 경로 핸들러들
  http.get('/api/chatbot/session', () => {
    return HttpResponse.json(sessions);
  }),

  http.get('/api/chatbot/:sessionId', ({ params }) => {
    const sessionId = parseInt(params.sessionId as string);
    return HttpResponse.json(messages[sessionId] || []);
  }),

  http.post('/api/chatbot/session', async () => {
    const newSession = {
      id: sessions.length + 1,
      title: `새로운 상담 ${sessions.length + 1}`
    };
    sessions.push(newSession);
    messages[newSession.id] = [];
    conversationStates[newSession.id] = { step: 'start' };
    return HttpResponse.json(newSession);
  }),

  http.post('/api/chatbot/:sessionId', async ({ params, request }) => {
    const sessionId = parseInt(params.sessionId as string);
    const body = await request.json() as { content: string };
    
    if (!messages[sessionId]) messages[sessionId] = [];
    if (!conversationStates[sessionId]) conversationStates[sessionId] = { step: 'start' };
    
    const userMessage = {
      id: nextMessageId++,
      isUser: true,
      content: body.content
    };
    messages[sessionId].push(userMessage);
    
    const botResponse = generateDemoResponse(sessionId, body.content);
    if (botResponse) {
      setTimeout(() => {
        const botMessage = {
          id: nextMessageId++,
          isUser: false,
          content: botResponse
        };
        messages[sessionId].push(botMessage);
      }, 1000);
    }
    
    return HttpResponse.json({ success: true, message: userMessage });
  })
];

// 데모용 응답 생성 함수 - 정확한 시나리오 따라하기
function generateDemoResponse(sessionId: number, userMessage: string): string | null {
  const message = userMessage.toLowerCase();
  const state = conversationStates[sessionId];
  
  console.log(`🎭 Demo conversation state for session ${sessionId}:`, state.step);
  console.log(`🎭 User message:`, userMessage);
  
  // 1단계: 치킨집 + 수원/영통 언급 시
  if (state.step === 'start' && 
      (message.includes('치킨') || message.includes('닭')) && 
      (message.includes('수원') || message.includes('영통'))) {
    
    state.step = 'asked_rent';
    console.log('🎭 Moving to step: asked_rent');
    return '안녕하세요! 수원시 영통구 치킨집 창업에 대해 상담해드리겠습니다. 영통구는 젊은 직장인과 대학생이 많아 치킨 소비가 활발한 지역입니다. 먼저 예상하시는 월 임대료 범위가 어느 정도인지 알려주시겠어요?';
  }
  
  // 2단계: 임대료 답변 시
  if (state.step === 'asked_rent' && 
      (message.includes('만원') || message.includes('원') || /\d+/.test(message))) {
    
    state.step = 'completed';
    console.log('🎭 Moving to step: completed');
    
    // 300-400만원 케이스 (데모의 정확한 시나리오)
    if (message.includes('300') || message.includes('400')) {
      return '월 임대료 300-400만원이면 영통구에서 적정한 수준입니다. 해당 예산으로는 역세권이나 대학가 근처의 좋은 입지를 확보할 수 있을 것 같습니다. 현재 영통구 치킨집 시장 분석과 최적 입지를 포함한 구체적인 분석 결과를 공유해드리겠습니다.';
    }
    // 다른 임대료 케이스들
    else if (message.includes('200') || message.includes('250')) {
      return '월 임대료 200-250만원 예산이시군요. 영통구에서는 조금 더 신중한 입지 선택이 필요하지만, 충분히 좋은 자리를 찾을 수 있습니다. 구체적인 분석 결과를 공유해드리겠습니다.';
    }
    else if (message.includes('500') || message.includes('600')) {
      return '월 임대료 500-600만원이면 영통구 프리미엄 입지 확보가 가능합니다. 주요 상권이나 대형 단지 근처의 최고 입지를 노려볼 수 있겠네요. 구체적인 분석 결과를 공유해드리겠습니다.';
    }
    else {
      return '말씀해주신 임대료 범위를 바탕으로 영통구 내 최적의 입지를 분석해보겠습니다. 구체적인 분석 결과를 공유해드리겠습니다.';
    }
  }
  
  // 대화 완료 후 추가 질문들
  if (state.step === 'completed') {
    console.log('🎭 Conversation completed, providing additional info');
    
    if (message.includes('경쟁') || message.includes('경쟁업체')) {
      return '영통구 치킨집 경쟁 현황을 말씀드리면, 반경 500m 내 약 8-10개의 치킨 전문점이 있습니다. 하지만 차별화된 메뉴나 독특한 컨셉으로 충분히 경쟁력을 확보할 수 있습니다.';
    }
    if (message.includes('유동인구') || message.includes('고객')) {
      return '영통구는 평일 점심시간과 저녁시간, 주말에 유동인구가 특히 많습니다. 주 고객층은 20-30대 직장인과 대학생으로, 치킨 소비 패턴이 매우 활발한 지역입니다.';
    }
    if (message.includes('매출') || message.includes('수익')) {
      return '영통구 치킨집 평균 월매출은 3,000-5,000만원 수준입니다. 좋은 입지와 마케팅 전략으로 월 6,000만원 이상도 충분히 가능합니다.';
    }
    
    return '추가로 궁금한 사항이 있으시면 언제든 말씀해주세요. 경쟁업체 현황, 유동인구 분석, 예상 매출 등에 대해 더 자세히 안내해드릴 수 있습니다.';
  }
  
  // 첫 메시지가 치킨집 관련이 아닌 경우
  if (state.step === 'start') {
    console.log('🎭 Generic startup consultation');
    return '안녕하세요! 창업 입지 분석 상담을 도와드리겠습니다. 어떤 업종과 지역에 창업을 고려하고 계신가요?';
  }
  
  // 예상치 못한 응답
  console.log('🎭 Unexpected response case');
  return '죄송합니다. 다시 한 번 말씀해주시겠어요?';
}