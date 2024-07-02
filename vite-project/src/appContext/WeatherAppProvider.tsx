import { ReactNode, createContext, useCallback, useEffect, useContext, useState } from 'react';
import { getWeatherByLocation } from "../api/WeatherAppAPI"

interface AppContextProps {
    locationName: string; setLocationName: React.Dispatch<React.SetStateAction<string>>;
    dataList: WeatherData[] | null; setDataList: React.Dispatch<React.SetStateAction<WeatherData[] | null>>;
    modal: boolean; setModal: React.Dispatch<React.SetStateAction<boolean>>;
    weatherToday: WeatherToday | null; setWeatherToday: React.Dispatch<React.SetStateAction<WeatherToday | null>>;
    getCurrentWeather: () => void;
    isFahrenheit: boolean; setIsFahrenheit: React.Dispatch<React.SetStateAction<boolean>>;
    weather4Days: weather4Days[];
}
const AppContext = createContext<AppContextProps | undefined>(undefined);
interface WeatherData {
    dt: number;
    main: {
        temp: number; feels_like: number; temp_min: number;
        temp_max: number; pressure: number; sea_level: number;
        grnd_level: number; humidity: number; temp_kf: number;
    };
    weather: Array<{ id: number; main: string; description: string; icon: string; }>;
    clouds: { all: number; };
    wind: { speed: number; deg: number; gust: number; };
    visibility: number;
    pop: number;
    rain: { '3h': number; };
    sys: { pod: string; };
    dt_txt: string;
}
interface weather4Days extends WeatherData {
    tempRange: number[]
}
interface WeatherToday {
    weather: string; temp: number; windSpeed: number;
    windDeg: number; humidity: number; visibility: number; airPressure: number;
}
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locationName, setLocationName] = useState<string>('Unknown')
    const [dataList, setDataList] = useState<WeatherData[] | null>(null)
    const [weatherToday, setWeatherToday] = useState<WeatherToday | null>(null)
    const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [weather4Days, setWeather4Days] = useState<weather4Days[]>([])

    const getCurrentWeather = useCallback(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const newWeather = await getWeatherByLocation(position.coords.latitude, position.coords.longitude)
                setLocationName(newWeather.city.name)
                setDataList(newWeather.list)
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, [])
    const getData = useCallback(() => {
        const weatherNext4Day = dataList?.filter((_, index) => { if (index % 8 === 0 && index !== 0) return true; return false })
        let tempRange4Day: { [key: string]: any } = {}
        // get num of weather each day
        dataList?.forEach(ele => {
            if (tempRange4Day[ele.dt_txt.slice(0, 11)]) {
                tempRange4Day[ele.dt_txt.slice(0, 11)] += 1;
            } else {
                tempRange4Day[ele.dt_txt.slice(0, 11)] = 1;
            }
        });
        let index = 0
        for (let i in tempRange4Day) {
            // skip tempRange4Day[0] : today
            if (index === 0) {
                index = tempRange4Day[i]
                delete tempRange4Day[i]
                // assign list of temp during next 4 day one by one
            } else {
                let temp = index
                index = tempRange4Day[i] + temp
                tempRange4Day[i] = dataList?.slice(temp, index).map((weather) => weather.main.temp)
            }
        }
        tempRange4Day = Object.values(tempRange4Day)
        const returnArr: weather4Days[] = weatherNext4Day ? weatherNext4Day.map((weather, index) => { return { ...weather, tempRange: tempRange4Day[index] } }) : []
        setWeather4Days(returnArr)
        const weather = dataList ? dataList[0] : null
        if (weather)
            setWeatherToday(
                {
                    weather: weather.weather[0].description,
                    temp: Math.floor(weather.main.temp),
                    windSpeed: Math.ceil(weather.wind.speed * 2.23693629),
                    windDeg: weather.wind.deg,
                    humidity: weather.main.humidity,
                    visibility: parseFloat((weather.visibility * 0.000621371192).toFixed(1)),
                    airPressure: weather.main.pressure
                }
            )
    }, [dataList])

    useEffect(() => {
        if (dataList)
            getData()
    }, [dataList, getData])

    useEffect(() => {
        getCurrentWeather()
    }, []);
    return (
        <AppContext.Provider
            value={{
                locationName, setLocationName,
                dataList, setDataList,
                modal, setModal,
                weatherToday, setWeatherToday, getCurrentWeather,
                isFahrenheit, setIsFahrenheit,
                weather4Days
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be in a AppProvider');
    }
    return context;
};