import { useEffect, useState } from "react";
import { useAppContext } from "../../appContext/CatWikiProvider"
import { getBreedImage } from "../../api/CatWikiAPI";

interface ImageCat {
    id: string;
    url: string;
}
export default function CatDetail() {
    const { mode, selectedCat } = useAppContext()
    const [listImg, setListImg] = useState<ImageCat[]>([])

    const getOtherPhoto = async (id: string) => {
        try {
            const breedImg = await getBreedImage(id)
            // console.log(breedImg)
            setListImg(breedImg)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (selectedCat)
            getOtherPhoto(selectedCat.id)
        return () => {
            setListImg([])
            console.log("clear")
        }
    }, [selectedCat])
    const ratingBar = (level: number = 0) => {
        const arr = Array.from({ length: 5 }, (_, i) => i + 1)
        return (
            <div className="flex space-x-2 items-center">
                {arr.map((el, index) => (
                    <div key={index} className={`${el <= level ? 'bg-[#544439]' : 'bg-[#E0E0E0]'} bg-[#544439] w-[30px] md:w-[50px] h-[8px] md:h-[12px] rounded-[8px]`}></div>
                ))}
            </div>
        )
    }
    return (
        mode === "detail" ?
            <div className="flex flex-col pt-8 w-[95%]  md:w-[85%]">
                <div className="flex w-full md:flex-row flex-col justify-center md:space-x-20 md:space-y-0 space-y-10  ">
                    <img className="md:w-[35%] w-[50%]  md:max-h-[350px]  rounded-[24px]" src={listImg.length ? listImg[0].url : ""}></img>
                    <div className="flex flex-col w-full md:w-[60%] space-y-4 font-montserrat  text-[#291507]">
                        <p className="font-[600]  text-[24px] md:text-[36px] capitalize">{selectedCat?.name}</p>
                        <p className="font-[500] text-[14px] md:text-[18px]">{selectedCat?.description}</p>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] ">
                                Temperament:
                            </p>
                            <p className="font-[500]">
                                {selectedCat?.temperament}
                            </p>
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] ">
                                Origin:
                            </p>
                            <p className="font-[500]">
                                {selectedCat?.origin}
                            </p>
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] ">
                                Life Span:
                            </p>
                            <p className="font-[500]">
                                {selectedCat?.life_span} years
                            </p>
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] w-[175px]">
                                Adaptability:
                            </p>
                            {ratingBar(selectedCat?.adaptability)}
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] w-[175px]">
                                Affection level:
                            </p>
                            {ratingBar(selectedCat?.affection_level)}
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] w-[175px]">
                                Child Friendly:
                            </p>
                            {ratingBar(selectedCat?.child_friendly)}
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] w-[175px]">
                                Grooming:
                            </p>
                            {ratingBar(selectedCat?.grooming)}
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] w-[175px]">
                                Intelligence:
                            </p>
                            {ratingBar(selectedCat?.intelligence)}
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] w-[175px]">
                                Health issues:
                            </p>
                            {ratingBar(selectedCat?.health_issues)}
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] w-[175px]">
                                Social needs:
                            </p>
                            {ratingBar(selectedCat?.social_needs)}
                        </div>
                        <div className="text-[16px] flex space-x-1">
                            <p className="font-[700] w-[175px]">
                                Stranger friendly:
                            </p>
                            {ratingBar(selectedCat?.stranger_friendly)}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full md:pt-16 pt-6 space-y-10">
                    <p className="font-montserrat font-[600] text-[20px] md:text-[32px] text-[#291507]">Other photo</p>
                    <div className="grid justify-items-center gap-y-4 grid-cols-2 md:gap-y-8 md:grid-cols-4  w-full">
                        {listImg && listImg.map((img) => <img className="w-[90%] rounded-[24px] h-[185px] md:h-[225px]" key={img.id} src={img.url} />)}
                    </div>
                </div>

            </div> : <></>
    )

}