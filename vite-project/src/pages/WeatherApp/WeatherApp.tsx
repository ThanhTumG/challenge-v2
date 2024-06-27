import React from 'react'
import SearchLocation from '../../component/WeatherCom/SearchLocation'
import SideBar from '../../component/WeatherCom/SideBar'
import DetailWeather from '../../component/WeatherCom/DetailWeather'
import { AppProvider } from '../../appContext/WeatherAppProvider'
const WeatherApp: React.FC = () => {
    const apiWeather = import.meta.env.VITE_API_WEATHER;
    console.log(apiWeather)
    return (
        <AppProvider>
            <div className="flex flex-1 md:flex-row flex-col font-raleway min-h-screen">
                <div className="flex items-center min-h-screen justify-start relative  flex-col md:w-[30%] w-full bg-[#1E213A]">
                    <SearchLocation />
                    <SideBar />
                </div>
                <DetailWeather />
            </div>
        </AppProvider>
    )
}

export default WeatherApp