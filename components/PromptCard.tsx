export default function PromptCard({ prompt }: { prompt: any }) {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">{prompt.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{prompt.summaryZh}</p>
      <div className="bg-gray-100 p-4 rounded mb-3">
        <pre className="text-sm whitespace-pre-wrap">{prompt.promptEn}</pre>
      </div>
      {prompt.tips?.length > 0 && (
        <ul className="list-disc ml-5 text-sm text-gray-700 mb-2">
          {prompt.tips.map((tip: string, i: number) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
