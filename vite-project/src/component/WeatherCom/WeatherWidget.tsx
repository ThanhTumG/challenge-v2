import WeatherIcon from "./WeatherIcon";
interface Weather {
    date: { today: Date, index: number };
    weather: string;
    temp: number[];
    isFahrenheit: boolean;
}

const WeatherWidget: React.FC<Weather> = ({ date, weather, temp, isFahrenheit }) => {
    const forecastDay = new Date(date.today)
    forecastDay.setUTCDate(forecastDay.getDate() + date.index + 1)
    const strDay = forecastDay.toDateString().split(' ')
    return (
        <div className="flex flex-col font-raleway bg-[#1E213A] w-[120px] h-[177px] items-center justify-between  py-3">
            <text className="text-[16px] text-[#E7E7EB]">{`${strDay[0]}, ${strDay[2]} ${strDay[1]}`}</text>
            <div className="items-center w-[56px]">
                <WeatherIcon name={weather} />
            </div>
            <div className="flex w-[70%] justify-between">

                <text className="text-[#E7E7EB] text-[16px]">{`${isFahrenheit ? `${Math.floor(temp[0] * (9 / 5) + 32.5)}ºF` : `${Math.floor(temp[0] + 0.5)}ºC`}`} </text>
                <text className="text-[#A09FB1] text-[16px]">{`${isFahrenheit ? `${Math.floor(temp[1] * (9 / 5) + 32.5)}ºF` : `${Math.floor(temp[1] + 0.5)}ºC`}`} </text>
            </div>

        </div>)
}

export default WeatherWidget