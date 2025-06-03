"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemperature() {
      try {
        const res = await fetch(
          "https://dataset.api.hub.geosphere.at/v1/station/current/tawes-v1-10min?parameters=TL&station_ids=11056"
        );
        const data = await res.json();
        const temp =
          data?.features?.[0]?.properties?.parameters?.TL?.data?.[0] ?? null;
        if (temp === null) {
          setError("Temperature not found in API response.");
        }
        setTemperature(temp);
      } catch (error) {
        setError("Failed to fetch temperature.");
        setTemperature(null);
      }
    }

    async function fetchHumidity() {
      try {
        const res = await fetch(
          "https://dataset.api.hub.geosphere.at/v1/station/current/tawes-v1-10min?parameters=RF&station_ids=11056"
        );
        const data = await res.json();
        const hum =
          data?.features?.[0]?.properties?.parameters?.RF?.data?.[0] ?? null;
        if (hum === null) {
          setError("Humidity not found in API response.");
        }
        setHumidity(hum);
      } catch (error) {
        setError("Failed to fetch humidity.");
        setHumidity(null);
      }
    }

    fetchTemperature();
    fetchHumidity();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold mb-8">Outside Vöcklabruck</h1>
      <div className="flex flex-col gap-6 items-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-xl">
          <span className="font-semibold">Humidity:</span>{" "}
          {error
            ? error
            : humidity !== null
            ? `${humidity}%`
            : "Loading..."}
        </div>
        <div className="text-xl">
          <span className="font-semibold">Temperature:</span>{" "}
          {error
            ? error
            : temperature !== null
            ? `${temperature}°C`
            : "Loading..."}
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-8">Inside your house</h1>
        <div className="flex flex-col gap-6 items-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="text-xl">
            <span className="font-semibold">Humidity:</span> 45%
          </div>
          <div className="text-xl">
            <span className="font-semibold">Temperature:</span> 21°C
          </div>
        </div>
    </div>
  );
}
