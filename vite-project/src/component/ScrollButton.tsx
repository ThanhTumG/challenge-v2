import { useEffect, useState } from "react"
import { ArrowUpward } from "@mui/icons-material";
function ScrollButton() {
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const toggleVisibility = () => {
        if (window.scrollY > 300) setIsVisible(true)
        else setIsVisible(false)
    }
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => { window.removeEventListener('scolll', toggleVisibility) }
    }, [])
    return (
        <div className={`hidden ${isVisible ? 'md:flex' : ''} w-fit group fixed bottom-[5.5rem] right-[3.5rem]
                        justify-center`} >
            <div className="absolute rounded-[4px] w-[100px] h-[30px] flex group-hover:opacity-100 opacity-0
             transition-all duration-200 ease-in
            justify-center items-center  bg-[#334680]/[.85] drop-shadow-none top-[-37px]">
                <p className="text-[15px] text-white font-roboto text-center">Return to top</p>
            </div>
            <button onClick={() => scrollToTop()}
                className='p-3 w-[55px] h-[55px] items-center drop-shadow-lg  justify-center
                    rounded-full bg-[#1E86FF]/[.85]'>
                <ArrowUpward className="text-white" />
            </button>
        </div>

    )
}

export default ScrollButton