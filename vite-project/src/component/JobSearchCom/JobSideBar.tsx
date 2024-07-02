import { useAppContext } from "../../appContext/JobSearchProvider";
import SearchLocationBar from "./SearchLocationBar";
export default function SideBar() {
    const jobType = ["Entry Level", "Mid Level", "Senior Level", "Internship", "management"]
    const locations = [
        { name: 'London', value: 'London, United Kingdom' },
        { name: 'New York', value: 'New York, NY' },
        { name: 'Amsterdam', value: 'Amsterdam, Netherlands' },
        { name: 'Berlin', value: 'Berlin, Germany' },
        { name: 'Ho Chi Minh', value: 'Ho Chi Minh City, Vietnam' }
    ]
    const { selectedLevel, setSelectedLevel, selectedLocation, setSelectedLocation, setSelectedCompany, setInputText, setResult, setActive } = useAppContext()
    function debounce(func: (...args: any[]) => void, delay: number) {
        let timeout: ReturnType<typeof setTimeout> | null;

        return function executedFunc(...args: any[]) {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                func(...args);
                timeout = null;
            }, delay);
        };
    }
    const handleLevel = (type: string) => {
        setSelectedLevel((prev) => {
            return prev.includes(type) ? prev.filter(el => el !== type) : [...prev, type]
        })
        setActive(1)
    }
    const handleOnchange = (location: { name: string; value: string }) => {
        setSelectedLocation(location);
        setSelectedCompany('');
        setInputText('');
        setActive(1);
        setResult([])
    }
    const dHandle = debounce(handleLevel, 150)
    return (
        <div className="flex flex-col md:w-[30%] w-full px-4 space-y-10">
            <ul className="flex flex-col space-y-4">
                {jobType.map((type, index) => (
                    <li className="flex items-center space-x-2" key={index}>
                        <input checked={selectedLevel.includes(type)} onChange={() => dHandle(type, index)} className="w-[18px] h-[18px] border-[#B9BDCF]" type="checkbox"
                        />
                        <p className={`font-poppins text-[14px] text-[#334680] font-[500]`}>{type}</p>
                    </li>
                ))}
            </ul>
            <div className="flex flex-col items-start space-y-6">
                <p className="font-poppins text-[#B9BDCF] text-[14px] font-[700]">LOCATION</p>
                <SearchLocationBar />
                <div className="flex flex-col space-y-4">
                    {locations.map((location, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input className="w-[18px] h-[18px]" type="radio" id={location.name} value={location.name}
                                checked={selectedLocation.name === location.name}
                                onChange={() => handleOnchange(location)}
                            />
                            <label className="text-[#334680] text-center text-[14px] font-poppins font-[500]" htmlFor={location.name}>
                                {location.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}