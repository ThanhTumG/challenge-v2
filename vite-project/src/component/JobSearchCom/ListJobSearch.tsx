import React from "react";
import { useAppContext } from "../../appContext/JobSearchProvider";
import { Public, Schedule, ChevronLeft, ChevronRight } from "@mui/icons-material";
interface JobType {
    contents: string;
    name: string;
    type: string;
    publication_date: string;
    id: number;
    locations: Array<{ name: string }>
    categories: Array<{ name: string }>;
    levels: Array<{ name: string; short_name: string }>;
    tags: Array<{ name: string }>;
    refs: { landing_page: string };
    company: {
        id: number;
        short_name: string;
        name: string;
    }
}
export default function ListJobSearch() {
    const { listJob, setSelectedJob, setIsDetail } = useAppContext()
    const [active, setActive] = React.useState(1);
    const handleDetail = (job: JobType) => {
        window.scrollTo(0, 0);
        setSelectedJob(job)
        setIsDetail(true)
    }
    const calculateDaysSincePublication = (publicDate: string) => {
        const date = new Date(publicDate);
        const today = new Date();
        const differenceInTime: number = today.getTime() - date.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    }
    return (
        <div className="flex md:w-[70%] md:pt-0 pt-10 w-full flex-col items-center justify-center md:pl-10 pl-0 space-y-5">
            {listJob && listJob.slice((active - 1) * 5, active * 5).map((job, index) => {
                return (
                    <button key={index} onClick={() => handleDetail(job)} className="relative flex p-3 space-x-5 items-start md:h-[114px] h-[200px] w-full rounded-[4px] border-1 border-[#334680] bg-white
                         drop-shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:drop-shadow-none
                        ">
                        <div className="flex text-[#BDBDBD]  items-center justify-center h-[95px] min-w-[95px] bg-[#F2F2F2]">
                            <img className="w-[80px]" src={`https://assets.themuse.com/uploaded/companies/${job.company.id}/small_logo.png`} alt="Company logo"></img>
                        </div>
                        <div className="flex flex-col font-roboto h-[95%] items-start justify-between md:pb-0 pb-10 text-[#334680] text-start">
                            <text className="font-[700] text-[12px]">{job.company.name}</text>
                            <p className="font-[400] text-[18px]">{job.name}</p>
                            <div className="flex space-x-3">
                                {job.levels.map((level, index) => {
                                    return (
                                        <div key={index} className="flex items-center w-[90px] h-[26px] rounded-[4px]
                                    border-[1.5px] border-[#334680] justify-center font-[700] text-[12px] text-center">
                                            {level.name}
                                        </div>)
                                })}
                            </div>
                        </div>
                        <div className="absolute flex space-x-6 bottom-2 right-4 text-[12px] text-roboto font-[500]">

                            <div className="flex space-x-1 items-center text-[#B9BDCF]">
                                <Public sx={{ fontSize: 14 }} />
                                <text className=" ">
                                    {job.locations.map((loc) => loc.name).slice(0, 2).join(' or ')}
                                </text>
                            </div>
                            <div className="flex space-x-1 items-center text-[#B9BDCF]">
                                <Schedule sx={{ fontSize: 14 }} />
                                <text className=" ">
                                    {calculateDaysSincePublication(job.publication_date.slice(0, 10))} days ago
                                </text>
                            </div>
                        </div>
                    </button>)
            })}
            <div className="flex space-x-2 items-center pt-6 font-roboto place-self-end text-[12px] font-[400]">
                <button onClick={() => setActive((prev) => {
                    if (prev === 1) return prev
                    return prev - 1
                })} className="w-[36px] hover:border-[#1E86FF] hover:text-[#1E86FF] text-[#B9BDCF] h-[36px] border-[1.5px] border-[#B7BCCE] rounded-[4px]">
                    <ChevronLeft />
                </button>
                {Array.from({ length: Math.ceil(listJob.length / 5) }, (_, i) => i + 1).map((index) => {

                    return (
                        (index === 1 || index === 2 || index === Math.ceil(listJob.length / 5) || Math.abs(index - active) <= 1) ?
                            <button key={index} onClick={() => setActive(index)}
                                className={`w-[36px] ${active === index ? 'bg-[#1E86FF] border-[#1E86FF] hover:text-white text-white' : ''} hover:border-[#1E86FF] hover:text-[#1E86FF] text-[#B9BDCF] 
                        h-[36px] border-[1.5px] border-[#B7BCCE] rounded-[4px]`}>
                                {index}
                            </button>
                            : Math.abs(index - active) === 3 ? <div className="text-center">...</div> : <></>
                    )
                })}
                <button onClick={() => setActive((prev) => {
                    if (prev === 12) return prev
                    return prev + 1
                })} className="w-[36px] text-[#B9BDCF] h-[36px] hover:border-[#1E86FF] hover:text-[#1E86FF] border-[1.5px] border-[#B7BCCE] rounded-[4px]">
                    <ChevronRight />
                </button>
            </div>
        </div>
    )

}