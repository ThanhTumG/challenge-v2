import React from "react"

interface SearchProps {
    defaultValue?: any;
    placeholder?: string;
    inputText?: string;
    setInputText?: any;
    listdata?: any;
    setResults?: any;
    setSelect?: any
}

export const SearchBar: React.FC<SearchProps> = React.memo(({ defaultValue = '', placeholder = '', inputText = '',
    setInputText = null, listdata = [], setResults = null, setSelect = null }) => {
    const handleChange = (value: string) => {
        if (value === '') {
            if (setSelect)
                setSelect(defaultValue)
            if (setResults)
                setResults([])
        }

        else {
            const newResult = listdata.filter((data: any) => data.includes(value.toLowerCase()))
            if (setResults)
                setResults(newResult)
        }
        setInputText(value)
    }
    return (
        <input value={inputText} className="pl-3 w-[90%]  bg-transparent focus:outline-none" placeholder={placeholder}
            onChange={e => handleChange(e.target.value)}  >

        </input>
    );
})
