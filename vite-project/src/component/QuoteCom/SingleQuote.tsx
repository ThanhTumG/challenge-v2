import { useEffect, useRef, useState } from 'react';

function SingleQuote({ content }: { content: string }) {
    const quoteRef = useRef<HTMLDivElement>(null)
    const [tabHeight, setTabHeight] = useState<number>(0)
    useEffect(() => {
        setTabHeight(quoteRef.current?.offsetHeight ?? 0)
        return () => {
            setTabHeight(0)
        }
    }, [content])
    return (
        <div className="relative w-[614px] text-[36px] text-black font-[500]">
            <p ref={quoteRef}>{`"${content}"`} </p>
            <span
                className="absolute rounded-[4px] top-0 left-[-40px]   block  bg-[#F7DF94]   transition-all duration-300"
                style={{ height: tabHeight, width: 8 }}
            />
        </div>
    )
}

export default SingleQuote