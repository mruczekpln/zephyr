import TitleInfo from "@/components/title-info";
import { env } from "process";

import { WeatherData } from "@/lib/types";
import DetailsGrid from "@/components/details-grid";
import { redirect } from "next/navigation";

async function getWeatherData(location: string) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&key=${env.WEATHER_API_KEY}&include=current,hours&lang=id&contentType=json`,
    { next: { revalidate: 60 } }
  );

  if (response.status === 400)
    return {
      ok: "false",
    };

  const data = await response.json();

  return data;
}

type Params = { params: { location: string } };
export default async function InLocation({ params }: Params) {
  const data = await getWeatherData(params.location);

  if (data["ok"] && !!data["ok"]) redirect("/?invalid-location=true");

  const weatherData: WeatherData = data;

  const current = weatherData.currentConditions;
  const today = weatherData.days[0];

  const maxTemps = weatherData.days
    .map((day) => Math.round(day.tempmax))
    .join(",");
  const minTemps = weatherData.days
    .map((day) => Math.round(day.tempmin))
    .join(",");

  return (
    <div
      className="min-h-screen bg-opacity-30 bg-no-repeat"
      style={{
        backgroundImage: `url(https://quickchart.io/chart/render/zm-08a22020-3937-410b-a00b-ca8ba00a20a4?${maxTemps}&data2=${minTemps})`,
        backgroundPosition: "right 0px top -80px",
      }}
    >
      <TitleInfo
        location={params.location}
        data={{
          temp: current.temp,
          chance_of_rain:
            today.preciptype !== null && today.preciptype.includes("rain")
              ? today.precipprob
              : 0,
          chance_of_snow: today.snow ? today.precipprob : 0,
          maxtemp: today.tempmax,
          mintemp: today.tempmin,
          wind: { kph: current.windspeed, direction: current.winddir },
        }}
      ></TitleInfo>
      <DetailsGrid
        weatherData={weatherData}
        location={params.location}
      ></DetailsGrid>
    </div>
  );
}
