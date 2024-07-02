import { AppProvider } from "../../appContext/CatWikiProvider";
import Header from "../../component/CatWikiCom/Header";
import MainPage from "../../component/CatWikiCom/MainPage";
import CatDetail from "../../component/CatWikiCom/CatDetail";
import TopSearch from "../../component/CatWikiCom/TopSearch";
import Footer from "../../component/CatWikiCom/Footer";
export default function CatWikiApp() {
    return (
        <AppProvider>
            <div className="flex flex-1  flex-col min-h-screen items-center pt-6 pb-[150px] md:px-[10%] px-[5%] ">
                <Header />
                <MainPage />
                <CatDetail />
                <TopSearch />
                <Footer />
            </div>
        </AppProvider>
    )
}

