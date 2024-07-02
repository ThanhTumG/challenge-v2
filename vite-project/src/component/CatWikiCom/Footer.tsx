import Logo from "../../assets/images/chickaWhite.svg"

export default function Footer() {
    return (<div className="w-[90%] right-[5%] fixed bottom-0  md:h-[88px] py-6 flex md:flex-row flex-col bg-black justify-between px-[5%] items-start md:items-center rounded-t-[30px]">
        <div className="flex space-x-2 items-center ">
            <h1 className="font-mysteryquest text-[14px] md:text-[24px] font-[400] text-white">CatWiki</h1>
            <img className="w-[20px] md:w-[50px]" src={Logo} alt='logo'></img>
        </div>
        <div className="flex space-x-1 items-center font-montserrat text-[12px] md:text-[18px] font-[400] text-white text-centers">
            <p className="mt-[0.5px] text-[14px] md:text-[20px]">{"\u00A9"}</p>
            <p className=""> created by MeU Solutions - devChallenge.io 2021</p>

        </div>
    </div>)
}