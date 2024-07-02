import { useAppContext } from "../../appContext/JobSearchProvider";
import { Public, Schedule, ArrowRightAlt } from "@mui/icons-material";
import parse from 'html-react-parser';



export default function JobDetail() {
    const { isDetail, setIsDetail, selectedJob } = useAppContext()

    const calculateDaysSincePublication = (publicDate: string) => {
        if (publicDate === "")
            return undefined
        const date = new Date(publicDate);
        const today = new Date();
        const differenceInTime = today.getTime() - date.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    }
    return (
        isDetail ?
            <>
                <div className="flex w-full md:flex-row flex-col md:pb-16 md-space-y-0 space-y-10 pb-10">
                    <div className="flex flex-col md:w-[25%] w-full items-start space-y-10">
                        <button onClick={() => setIsDetail(false)} className="px-2 flex hover:bg-[#2962FF]/[0.1] focus:bg-[#2962FF]/[0.1] w-[145px] items-center justify-between
                         text-[#1E86FF] h-[36px] rounded-[6px]">
                            <ArrowRightAlt className="rotate-180" /> <p className="font-poppins font-[500] text-[14px]">Back to search</p>
                        </button>

                        <div className="flex flex-col w-full space-y-6 text-wrap ">
                            <p className="font-poppins text-[#B9BDCF] text-[14px] font-[700]">HOW TO APPLY</p>
                            <div className="text-[14px] flex  space-x-1 font-poppins font-[500] text-[#334680]">
                                <p>Apply your resume or cv</p>
                                <a href={selectedJob?.refs.landing_page} className="font-[700]">Here</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:w-[75%] w-full items-start space-y-6">
                        <div className="flex flex-col w-full space-y-3">
                            <div className="flex md:space-x-6 md:flex-row md:space-y-0 space-y-2 flex-col md:items-center items-start font-roboto text-[#334680]">
                                <p className="font-[700] text-[24px] ">{selectedJob?.name}</p>
                                <div className="flex space-x-3 items-start">
                                    {selectedJob?.levels.map((level, index) => {
                                        return (
                                            <div key={index} className="flex items-center w-[90px] h-[26px] rounded-[4px]
                                            border-[1.5px] border-[#334680] justify-center font-[700] text-[12px] text-center">
                                                {level.name}
                                            </div>)
                                    })}
                                </div>

                            </div>
                            <div className="flex space-x-1 items-center text-[#B9BDCF]">
                                <Schedule sx={{ fontSize: 14 }} />
                                <p className="text-[12px]">
                                    {calculateDaysSincePublication(selectedJob ? selectedJob.publication_date.slice(0, 10) : "")} days ago
                                </p>
                            </div>

                        </div>
                        <div className="flex space-x-4 h-[70px]">
                            <div className="flex text-[#BDBDBD]  items-center justify-center h-[70px] min-w-[70px] bg-[#F2F2F2]">
                                <img className="w-[60px]" src={`https://assets.themuse.com/uploaded/companies/${selectedJob?.company.id}/small_logo.png`} alt="Company logo"></img>
                            </div>
                            <div className="flex flex-col font-roboto h-[90%] items-start justify-between text-[#334680] text-start">
                                <p className="font-[700] text-[18px]">{selectedJob?.company.name}</p>
                                <div className="flex space-x-1 items-center text-[#B9BDCF]">
                                    <Public sx={{ fontSize: 16 }} />
                                    <p className="text-[12px] ">
                                        {selectedJob?.locations.map((loc) => loc.name).slice(0, 2).join(' or ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="font-roboto text-[#334680] space-y-4">
                            {parse(selectedJob ? selectedJob.contents : "")}
                        </div>

                    </div>
                </div>

            </> : <></>

    )
}