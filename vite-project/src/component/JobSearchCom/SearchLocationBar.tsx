import { useState, useEffect, useRef } from "react";
import { ChevronRight, Public } from "@mui/icons-material";
import { SearchBar } from "../SearchBar";
import { useAppContext } from "../../appContext/JobSearchProvider";
import listLocation from "../../assets/location.json"

export default function SearchLocationBar() {
    const [inputText, setInputText] = useState<string>("");
    const [result, setResult] = useState<string[]>([])
    const [focus, setFocus] = useState<boolean>(false)
    const { setSelectedLocation, setActive } = useAppContext()
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null)
    const handleClickOutside = (event: Event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            inputRef.current &&
            !inputRef.current.contains(event.target as Node)
        ) {
            setFocus(false);
        }
    };
    const Capitalize = (Str: string) => {
        return Str.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }
    const handleClickLocation = (result: string) => {
        const foundLocation = listLocation.find((loc) => loc.name === result)?.value;
        if (foundLocation) {
            setSelectedLocation({ name: result, value: foundLocation });
            setInputText(Capitalize(result));
            setResult([result])
            setActive(1)
        }
        setFocus(false)

    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="relative flex flex-col w-[80%] ">
            <label className="text-[#B9BDCF] text-[14px] font-roboto bg-white px-4 focus:outline-none flex items-center min-h-[48px]
            rounded-[4px] drop-shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
                <div className="text-[#B9BDCF]">
                    <Public />
                </div>
                <div className="w-[90%]" onFocus={() => setFocus(true)} ref={inputRef} >
                    <SearchBar placeholder="City, state, zip code or country"
                        inputText={inputText} setInputText={setInputText} listdata={listLocation.map((loc) => loc.name)} setResults={setResult} />
                </div>
            </label>

            <div ref={dropdownRef} className="absolute top-[60px] overflow-y-auto max-h-[300px] bg-white z-50 flex items-center flex-col justify-start w-[100%]">

                {focus && result.slice(0, 10).map((result, index) => (
                    <button key={index}
                        onClick={() =>
                            handleClickLocation(result)}
                        className="flex justify-between items-center px-4 w-full min-h-[55px] 
                font-[500] text-[16px] hover:border-2 hover:border-[#616475]">
                        <p className="text-[#333333]  capitalize">{result}</p>
                        <ChevronRight />
                    </button>
                ))}
            </div>

        </div>
    )
}