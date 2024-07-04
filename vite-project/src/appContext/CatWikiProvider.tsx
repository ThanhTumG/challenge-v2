import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getMostSearchList, fetchListCat } from '../api/CatWikiAPI'

interface AppContextProps {
    mode: string; setMode: React.Dispatch<React.SetStateAction<string>>;
    mostSearch: CatVote[]; setMostSearch: React.Dispatch<React.SetStateAction<CatVote[]>>;
    listCat: CatInfo[];
    selectedCat: CatInfo | null; setSelectedCat: React.Dispatch<React.SetStateAction<CatInfo | null>>;
}
interface CatInfo {
    weight: {
        imperial: string;
        metric: string;
    };
    id: string;
    name: string;
    temperament: string;
    origin: string;
    description: string;
    life_span: string;
    indoor: number;
    lap: number;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    cat_friendly: number;
    dog_friendly: number;
    energy_level: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    shedding_level: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;
    bidability: number;
    experimental: number;
    hairless: number;
    natural: number;
    rare: number;
    rex: number;
    suppressed_tail: number;
    short_legs: number;
    hypoallergenic: number;
    reference_image_id: string;

}
interface CatVote {
    id: number;
    image_id: string;
    sub_id: string;
    value: number;
    image: {
        id: string;
        url: string;
    }
}
const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<string>("main")
    const [mostSearch, setMostSearch] = useState<CatVote[]>([])
    const [listCat, setListCat] = useState<CatInfo[]>([])
    const [selectedCat, setSelectedCat] = useState<CatInfo | null>(null)
    const getAllCat = async () => {
        let newListCat: CatInfo[][] = [[]]
        const fetchPromise = []
        for (let i = 0; i <= 6; i++) {
            fetchPromise.push(fetchListCat(i))
        }
        const result = await Promise.all(fetchPromise)
        for (let i = 0; i < 6; i++) {
            newListCat[i] = result[i]
        }
        setListCat(newListCat.reduce((acc, curr) => acc.concat(curr), [] as CatInfo[]))
    }
    useEffect(() => {
        const getMostSearchCat = async () => {
            const results = await getMostSearchList()
            setMostSearch(results)
        }
        getAllCat()
        getMostSearchCat()
    }, [])

    return (
        <AppContext.Provider
            value={{
                mode, setMode,
                mostSearch, setMostSearch,
                listCat, setSelectedCat, selectedCat,
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be in a AppProvider")
    }
    return context
}