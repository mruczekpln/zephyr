import { TableRow, TableCell } from "@/components/ui/table";
import { getConditionByID } from "@/lib/conditions";
import { DailyData, UserSettings } from "@/types/index";
import { roundToNearest5 } from "@/lib/utils/weather-data";
import {
  ArrowUpFromLine,
  ArrowDownFromLine,
  CloudRain,
  Wind,
} from "lucide-react";

type Props = { data: DailyData; unit: UserSettings["unit"] };
export default function DailyItem({ data, unit }: Props) {
  const condition = getConditionByID(data.conditions);

  function getDayName(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  console.log(unit);

  return (
    <TableRow>
      <TableCell className="font-semibold py-0 cursor-pointer">
        {getDayName(data.datetime)}{" "}
        <p className="text-xs font-light">{data.datetime}</p>
      </TableCell>
      <TableCell className="flex gap-2 items-center h-full">
        {condition?.icon}
        {condition?.desc}
      </TableCell>
      <TableCell>
        <ArrowUpFromLine className="inline-block mr-1" size={16} />
        {data.tempmax}
        <ArrowDownFromLine className="inline-block m-1" size={16} />
        {data.tempmin} {unit === "imperial" ? "Farenheit" : "Celsius"}
      </TableCell>
      <TableCell>
        <CloudRain className="inline-block mr-2 "></CloudRain>
        <p className="inline underline decoration-blue-400 decoration-double">
          {roundToNearest5(data.precipprob)}%
        </p>
      </TableCell>
      <TableCell>
        <Wind className="inline-block mr-2 "></Wind>
        <p className="underline decoration-double decoration-gray-500 inline">
          {data.windspeed}
        </p>{" "}
        {unit === "metric" ? "km/h" : "mph"}
      </TableCell>
    </TableRow>
  );
}
