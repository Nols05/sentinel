interface WeeklySummaryProps {
  summary: string;
}

export function WeeklySummary({ summary }: WeeklySummaryProps) {
  return (
    <div className="w-full border rounded-lg p-6 bg-white">
      <h2 className="font-bold">Resumen de la Semana</h2>
      <p className="text-gray-500 max-w-4xl my-4">
        {summary}
      </p>
    </div>
  );
}
