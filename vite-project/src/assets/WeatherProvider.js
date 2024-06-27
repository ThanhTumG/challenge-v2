import React, { createContext, useCallback, useEffect, useState } from 'react';
import { getWeatherByLocation } from '../api/WeatherAPI';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [locationName, setLocationName] = useState('Unknown')
    const [dataList, setDataList] = useState(null)
    const [weatherToday, setWeatherToday] = useState({})
    const [isFahrenheit, setIsFahrenheit] = useState(false)
    const [modal, setModal] = useState(false)
    const [weatherList, setWeatherList] = useState([])

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
        const weatherNext4Day = dataList.filter((value, index) => { if (index % 8 === 0 && index !== 0) return true; return false })
        let tempRange4Day = {}
        dataList.forEach(ele => {
            if (tempRange4Day[ele.dt_txt.slice(0, 11)]) {
                tempRange4Day[ele.dt_txt.slice(0, 11)] += 1;
            } else {
                tempRange4Day[ele.dt_txt.slice(0, 11)] = 1;
            }
        });
        let index = 0
        for (let i in tempRange4Day) {
            if (index === 0) {
                index = tempRange4Day[i]
                delete tempRange4Day[i]

            } else {
                let temp = index
                index = tempRange4Day[i] + temp
                tempRange4Day[i] = dataList.slice(temp, index).map((weather) => weather.main.temp)
            }
        }
        tempRange4Day = Object.values(tempRange4Day)
        setWeatherList(() => {
            return weatherNext4Day.map((weather, index) => { return { ...weather, tempRange: tempRange4Day[index] } })
        })
        const weather = dataList[0]
        setWeatherToday(prev => {
            return {
                ...prev,
                weather: weather.weather[0].description,
                temp: Math.floor(weather.main.temp),
                windSpeed: Math.ceil(weather.wind.speed * 2.23693629),
                windDeg: weather.wind.deg,
                humidity: weather.main.humidity,
                visibility: (weather.visibility * 0.000621371192).toFixed(1),
                airPressure: weather.main.pressure
            }
        })
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
                weatherList
            }}
        >
            {children}
        </AppContext.Provider>
    );
};