import { useAppContext } from "../../appContext/CatWikiProvider"
import Logo from "../../assets/images/chickaWhite.svg"
import { ArrowRightAlt } from "@mui/icons-material";
import cat1 from "../../assets/images/cat1.png"
import cat2 from "../../assets/images/cat2.png"
import cat3 from "../../assets/images/cat3.png"
import SearchCat from "./SearchBar";
export default function MainPage() {
    const { mode, setMode, mostSearch, listCat } = useAppContext()

    return (
        mode === "main" ?
            <>
                <div className="flex flex-col w-full my-10">
                    <div className="flex w-full rounded-t-[20px] md:rounded-t-[40px] justify-center pl-6 md:pl-20 flex-col bg-[url('./assets/images/CatBackground.png')] bg-cover h-[140px] md:h-[450px]">
                        <div className="flex flex-col w-[40%]">
                            <div className="flex md:space-x-4 space-x-1 items-center ">
                                <h1 className="font-mysteryquest text-[14px] md:text-[64px] font-[400] text-white">CatWiki</h1>
                                <img className="md:w-[90px] w-[30px]" src={Logo} alt="Logo" ></img>
                            </div>
                            <p className="text-white font-[500] md:text-[24px] text-[10px] font-montserrat">Get to know more about your cat breed</p>
                            <SearchCat />
                        </div>
                    </div>
                    <div className="flex flex-col bg-[#E3E1DC] h-[620px]  space-y-10 py-6 px-[7%] rounded-b-[20px] md:rounded-b-[40px]">
                        <p className="relative font-montserrat text-[12px] md:text-[18px] font-[500] text-left text-[#291507]">Most Search Breeds
                            <span
                                className="absolute bottom-[-6px] block h-1 w-[60px] bg-[#4D270C] rounded-[77px]  transition-all duration-300" />
                        </p>

                        <div className="flex w-full justify-between">
                            <p className="w-[50%] font-montserrat text-[18px] md:text-[44px] font-[700] text-left text-[#291507]">66+ Breeds For you to discover</p>
                            <button onClick={() => { setMode("top"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="place-self-end font-montserrat text-[10px] md:text-[18px] font-[700] text-left text-[#291507]/[.6]">SEE MORE
                                <ArrowRightAlt />
                            </button>
                        </div>
                        <div className="md:flex grid grid-cols-2 gap-y-6 justify-items-center justify-between pt-4">
                            {mostSearch && mostSearch.slice(0, 4).map((cat, index) => {
                                const returnCat = listCat.find((ele) => ele.reference_image_id === cat.image.id)
                                if (returnCat) {
                                    return (<div key={index} className="flex flex-col md:w-[22%] w-[80%] space-y-2">
                                        <img className="w-full md:h-[175px] h-[125px] rounded-[24px]" src={cat.image.url} alt="cat"></img>
                                        <p className="capitalize font-montserrat text-[10px] md:text-[18px] text-[#291507] font-[600] text-left">{returnCat.name}</p>
                                    </div>)
                                } return null
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col w-full items-center md:space-y-0 space-y-10 justify-center md:space-x-14">
                    <div className="flex relative flex-col space-y-5 text-[#291507] w-full md:w-[40%]">
                        <span
                            className="absolute top-0 block h-1 bg-[#4D270C] rounded-[77px]  transition-all duration-300"
                            style={{ left: 0, width: 70 }}
                        />
                        <p className="font-montserrat text-[32px] md:text-[40px] font-[700] text-left">Why should you have a cat?</p>
                        <p className="font-montserrat text-[16px] font-[500] text-left">Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety leves</p>
                    </div>
                    <div className="flex space-x-4 md:w-[50%] w-full">
                        <div className="flex flex-col w-[50%] items-end space-y-4">
                            <img className="w-[full]" alt="cat1" src={cat1}></img>
                            <img className="w-[50%]" alt="cat2" src={cat2}></img>
                        </div>
                        <img className="w-[40%]" alt="cat3" src={cat3}></img>
                    </div>
                </div>
            </> : <></>
    )
}