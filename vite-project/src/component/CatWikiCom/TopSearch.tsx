import { useAppContext } from "../../appContext/CatWikiProvider"


export default function TopSearch() {
    const { mostSearch, listCat, mode } = useAppContext()
    // console.log(mostSearch)
    return (
        mode === "top" ?
            <div className="flex flex-col pt-10 w-full font-montserrat text-[#291507] space-y-4 md:space-y-10">
                <p className=" font-[700] text-[24px] md:text-[32px] pb-10">Top 10 most searched breeds</p>
                <ul className="flex flex-col space-y-6 md:space-y-10 w-[90%] items-start">
                    {mostSearch && mostSearch.slice(0, 10).map((cat, index) => {
                        const catIf = listCat.find((ele) => ele.reference_image_id === cat.image.id)
                        return (<li key={index} className="flex items-start space-x-7 md:space-x-12">
                            <img className="min-w-[125px] h-[125px] rounded-[20px]" alt="image-cat" src={cat.image.url}></img>
                            <div className="flex flex-col items-start space-y-2 md:space-y-5">
                                <p className="font-[600] text-[14px] md:text-[26px] capitalize">{index + 1}. {catIf?.name}</p>
                                <p className="font-[500] text-[12px] md:text-[14px]">{catIf?.description}</p>
                                {/* {cat.value} */}
                            </div>
                        </li>)
                    }
                    )}
                </ul>
            </div> : <></>
    )
}