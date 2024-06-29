import { AppProvider } from "../../appContext/JobSearchProvider";
import JobDetail from "../../component/JobSearchCom/JobDetail";
import SearchPage from "../../component/JobSearchCom/SearchPage";
import SpinnerLoader from "../../component/SpinnerLoader";

export default function JobSearchApp() {
    return (
        <AppProvider>
            <SpinnerLoader />
            <div className="flex flex-1 items-center flex-col font-raleway min-h-[1080px] pt-10 space-y-10 md:px-[8%] px-[3%] bg-[#F6F7FB]">
                <div className="flex place-self-start items-center  text-[24px] text-center space-x-2 text-[#282538]">
                    <h1 className="font-poppins font-[700]">Github</h1>
                    <h1 className="font-poppins font-[300]">Jobs</h1>
                </div>
                <SearchPage />
                <JobDetail />
            </div>
        </AppProvider>

    )
}