import { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar";
import { useAppContext } from "../../appContext/CatWikiProvider"
import { Search } from "@mui/icons-material";
import { increaseVoteBreed } from "../../api/CatWikiAPI";
import { getMostSearchList } from "../../api/CatWikiAPI";

export default function SearchCat() {
    const { listCat, setMode, setSelectedCat, mostSearch, setMostSearch } = useAppContext();
    const [placeholder, setPlaceholder] = useState('Enter your breed');
    const [inputText, setInputText] = useState("");
    const [results, setResults] = useState([])

    const updatePlaceholder = () => {
        if (window.innerWidth < 768) {
            setPlaceholder('Search');
        } else {
            setPlaceholder('Enter your breed');
        }
    };
    const handleOnclickCat = async (result: string) => {
        const theChosenCat = listCat.find((cat) => cat.name === result)
        if (theChosenCat) {
            setSelectedCat(theChosenCat);
            const respone = await increaseVoteBreed(theChosenCat.reference_image_id, mostSearch);
            if (respone) {
                const newList = await getMostSearchList()
                setMostSearch(newList)
            }
            setInputText('')
            setResults([])
            setMode("detail")
            window.scrollTo(0, 0);
        }
    }
    useEffect(() => {
        updatePlaceholder();
        window.addEventListener('resize', updatePlaceholder);
        return () => window.removeEventListener('resize', updatePlaceholder);
    }, [])

    return (
        <div className="relative flex flex-col mt-3 md:mt-10 w-[90%] h-[30px] md:h-[60px] ">
            <label className="text-[#291507] font-montserrat font-[500] text-[12px] md:text-[18px]  bg-white px-4 focus:outline-none flex items-center h-full
                rounded-[59px] ">

                <SearchBar placeholder={placeholder} inputText={inputText} setInputText={setInputText} listdata={listCat.map((cat) => cat.name)}
                    setResults={setResults} />
                <div className="flex text-[#291507]/[.76]">
                    <div className="md:hidden">
                        <Search sx={{ fontSize: 14 }} />
                    </div>
                    <div className="md:block hidden">
                        <Search sx={{ fontSize: 24 }} />
                    </div>
                </div>
            </label>
            <div className="absolute rounded-[14px] md:rounded-l-[24px] max-h-[220px] top-[80px] bg-white z-50 flex items-center flex-col overflow-y-auto  justify-start w-[100%]">

                {results.map((result, index) => (
                    <button key={index} onClick={() => handleOnclickCat(result)}
                        className="flex justify-between items-center px-6 w-full min-h-[55px] text-[#333333] 
                    font-[500] text-[16px] hover:bg-[#979797]/[.2]">
                        <p className="capitalize font-montserrat font-[500] text-start text-[12px] md:text-[18px]">{result}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}