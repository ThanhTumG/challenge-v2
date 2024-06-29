import SearchCompanyBar from "./SearchCompanyBar";
import ListJobSearch from "../../component/JobSearchCom/ListJobSearch"
import SideBar from "../../component/JobSearchCom/JobSideBar";
import { useAppContext } from "../../appContext/JobSearchProvider";
export default function SearchPage() {
    const { isDetail } = useAppContext()
    return (
        isDetail ? <></> :
            <>
                <div className="flex w-[100%] h-[138px] items-center justify-center
        md:bg-[center_bottom_15rem] rounded-[8px] bg-cover bg-[url('./assets/images/bg_Skycraper.jpg')]">
                    <SearchCompanyBar />
                </div>

                <div className="flex md:flex-row flex-col w-full  md:pb-16 pb-10">
                    <SideBar />
                    <ListJobSearch />
                </div>
            </>

    )
}