/* eslint-disable @typescript-eslint/no-explicit-any */
export const crawlingApi = {
  allCrawling: async (address: string) =>
    await fetch(`${import.meta.env.VITE_CRAWLING}/crawl/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: address,
      }),
    }),
  crawling: async (data: any) =>
    await fetch(`${import.meta.env.VITE_AI_SERVER}/ai/report/build`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
};
