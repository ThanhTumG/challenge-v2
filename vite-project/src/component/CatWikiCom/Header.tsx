import { useAppContext } from "../../appContext/CatWikiProvider"
import Logo from "../../assets/images/chicka.svg"

export default function Header() {
    const { setMode } = useAppContext()
    return (<>
        <button onClick={() => setMode("main")} className="flex space-x-2 items-center place-self-start">
            <h1 className="font-mysteryquest text-[24px] font-[400] text-[#291507]">CatWiki</h1>
            {/* <Logo className="w-[50px] " fill="#291507" /> */}
            <img src={Logo} className="w-[50px]" alt='logo' />
        </button>
    </>)
}