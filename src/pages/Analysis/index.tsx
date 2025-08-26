export default function Analysis() {
  const apiUrl = `https://bigdata.sbiz.or.kr/#/openApi/detail?certKey=${import.meta.env.VITE_ANALYSIS}`;

  return <iframe src={apiUrl} className="h-screen w-full" />;
}
