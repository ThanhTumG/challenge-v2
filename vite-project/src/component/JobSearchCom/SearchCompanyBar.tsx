import { useState, useEffect, useRef } from "react";
import { ChevronRight, WorkOutline } from "@mui/icons-material";
import { SearchBar } from "../SearchBar";
import { getCompany } from "../../api/JobSearchAPI"
import { useAppContext } from "../../appContext/JobSearchProvider";

interface Company {
    name: string;
}
export default function SearchCompanyBar() {
    const [inputText, setInputText] = useState<string>("");
    const [listCompany, setListCompany] = useState<string[]>([])
    const [result, setResult] = useState([])
    const [focus, setFocus] = useState(false)
    const { setSelectedCompany, selectedLocation } = useAppContext()

    const handleGetCompany = async () => {
        try {
            const results: Company[] = await getCompany(selectedLocation.value)
            console.log(results)
            setListCompany(results.map((company) => company.name.toLowerCase()))

        }
        catch (error) {
            setListCompany([])
            console.log(error)
        }
    }
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

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        handleGetCompany()
    }, [selectedLocation])
    return (
        <div className="relative flex flex-col md:w-[60%] w-[90%] h-[55px] ">
            <label className="text-[#B9BDCF] font-roboto bg-white space-x-2 justify-between px-4 focus:outline-none flex items-center h-full
rounded-[4px] drop-shadow-[0px_2px_8px_rgba(0,0,0,0.1)]">
                <div className="flex w-[80%]">
                    <div className="text-[#B9BDCF]">
                        <WorkOutline />
                    </div>
                    <div className="w-[90%]" onFocus={() => setFocus(true)} ref={inputRef} >
                        <SearchBar setSelect={setSelectedCompany} placeholder="Title, companies, expertise or benefits"
                            inputText={inputText} setInputText={setInputText} listdata={listCompany} setResults={setResult} />
                    </div>
                </div>

                <button onClick={(e) => { e.currentTarget.blur(); }}
                    className="flex  justify-center  items-center bg-[#1E86FF] w-[25%] h-[47px] 
hover:bg-[#0039CB] focus:bg-[#0039CB] rounded-[4px] text-[16px]
text-white">
                    Search
                </button>
            </label>


            {focus && (
                <div ref={dropdownRef} className="absolute top-[60px] bg-white z-50 flex items-center flex-col space-y-2 overflow-y-auto  justify-start w-[100%]">
                    <button onClick={() => { setResult([]); setSelectedCompany(''); setInputText(''); setFocus(false) }} className="flex justify-between items-center px-4 w-full h-[55px] text-[#333333] 
                 font-[500] text-[16px] hover:border-2 hover:border-[#616475]">
                        <text className="capitalize">Get all companies</text>
                        <ChevronRight />
                    </button>

                    {result.slice(0, 10).map((result, index) => (
                        <button key={index} onClick={() => { setSelectedCompany(result); setInputText(result); setFocus(false) }} className="flex justify-between items-center px-4 w-full h-[55px] text-[#333333] 
    font-[500] text-[16px] hover:border-2 hover:border-[#616475]">
                            <text className="capitalize">{result}</text>
                            <ChevronRight />
                        </button>))}
                </div>
            )}
        </div>
    )
}