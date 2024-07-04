import { AppProvider } from "../../appContext/JobSearchProvider";
import JobDetail from "../../component/JobSearchCom/JobDetail";
import SearchPage from "../../component/JobSearchCom/SearchPage";
import SpinnerLoader from "../../component/SpinnerLoader";
import Header from "../../component/JobSearchCom/Header";
import ScrollButton from "../../component/ScrollButton";
export default function JobSearchApp() {
    return (
        <AppProvider>
            <SpinnerLoader />
            <div className="flex flex-1 items-center flex-col font-raleway min-h-[1080px] pt-10 space-y-10 md:px-[8%] px-[3%] bg-[#F6F7FB]">
                <Header />
                <SearchPage />
                <JobDetail />
            </div>
            <ScrollButton />
        </AppProvider>

    )
}