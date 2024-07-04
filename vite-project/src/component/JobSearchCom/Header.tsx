import { useAppContext } from "../../appContext/JobSearchProvider"
function Header() {
    const { setIsDetail } = useAppContext()
    return (
        <button onClick={() => setIsDetail(false)} className="flex place-self-start items-center  text-[24px] text-center space-x-2 text-[#282538]">
            <h1 className="font-poppins font-[700]">Github</h1>
            <h1 className="font-poppins font-[300]">Jobs</h1>
        </button>
    )
}

export default Header