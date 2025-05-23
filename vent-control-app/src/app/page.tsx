import Image from "next/image";

export default function Home() {
  // Dummy values
  const humidity = 55; // percent
  const temperature = 22; // Celsius

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold mb-8">Vent Control Dashboard</h1>
      <div className="flex flex-col gap-6 items-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-xl">
          <span className="font-semibold">Humidity:</span> {humidity}%
        </div>
        <div className="text-xl">
          <span className="font-semibold">Temperature:</span> {temperature}°C
        </div>
      </div>
    </div>
  );
}
