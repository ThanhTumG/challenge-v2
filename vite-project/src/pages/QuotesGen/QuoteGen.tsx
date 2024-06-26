import { useEffect, useState } from 'react';
import { Autorenew, ArrowRightAlt } from "@mui/icons-material";
import { getRandomQuote, getQuotesByAuthor } from '../../api/QuoteGenAPI';
import SingleQuote from '../../component/QuoteCom/SingleQuote';
function QuoteGen() {
    interface Quote {
        content: string;
    }
    const [quote, setQuote] = useState("")
    const [listQuote, setListQuote] = useState([])
    const [mode, setMode] = useState(false)
    const [author, setAuthor] = useState("")
    const [tag, setTag] = useState("")

    async function getQuote() {
        try {
            const randomQuote = await getRandomQuote()
            setQuote(randomQuote.content)
            setAuthor(randomQuote.author)
            setTag(randomQuote.tags.join(', '))
            setMode(false);
        } catch (error) {
            console.log(error)
        }

    }

    const handleGetAllQuote = async () => {
        const listQuote = await getQuotesByAuthor(author)
        setListQuote(listQuote.results.map((quote: Quote) => quote.content))
        setMode(true)
        return
    }
    const handleOnclick = () => {
        getQuote();
    }
    useEffect(() => {
        getQuote()
    }, [])
    return (
        <div className="flex flex-1 flex-col justify-center items-center min-h-screen mb-20 space-y-16 font-raleway">
            <div className="flex">
                <button onClick={() => handleOnclick()} className="flex fixed items-center space-x-1 top-6  right-12 ">
                    <text className=" text-[#4F4F4F] text-[18px] ">random</text>
                    <Autorenew className="text-[#4F4F4F]" />
                </button>
            </div>
            {mode ?
                <div className="flex flex-col space-y-24">
                    <text className="place-self-start text-[24px] font-[700] text-center text-[#4F4F4F] group-hover:text-[#F2F2F2]">{author}</text>
                    <div className="flex flex-col space-y-16">
                        {listQuote.map((quote) => <SingleQuote content={quote} />)}
                    </div>
                </div>
                :
                <div className="flex flex-col space-y-[100px]">
                    <SingleQuote content={quote} />
                    <button onClick={handleGetAllQuote} className="group flex items-center justify-between transition duration-200 hover:bg-[#333333] px-[30px] w-[624px] h-[151px]">
                        <div className="flex flex-col ">
                            <text className="place-self-start text-[24px] font-[700] text-center text-[#4F4F4F] group-hover:text-[#F2F2F2]">{author}</text>
                            <text className="place-self-start text-[14px] font-[500] text-center text-[#828282] ">{`${tag}`}</text>
                        </div>
                        <ArrowRightAlt className="text-white group-hover:text-[#F2F2F2] transition delay-150  duration-1000 hover:-translate-x-[-10px]" sx={{ fontSize: 40 }} />
                    </button>
                </div>
            }
        </div>
    );
}

export default QuoteGen