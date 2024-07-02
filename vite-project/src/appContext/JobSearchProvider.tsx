import { ReactNode, createContext, useEffect, useContext, useState } from 'react';
import { getJob } from '../api/JobSearchAPI';

interface AppContextProps {
    selectedLocation: Location; setSelectedLocation: React.Dispatch<React.SetStateAction<Location>>;
    selectedCompany: string; setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
    listJob: JobType[];
    selectedLevel: string[]; setSelectedLevel: React.Dispatch<React.SetStateAction<string[]>>;
    isDetail: boolean; setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
    selectedJob: JobType | null; setSelectedJob: React.Dispatch<React.SetStateAction<JobType | null>>;
    loading: boolean,
    inputText: string; setInputText: React.Dispatch<React.SetStateAction<string>>;
    result: any[]; setResult: React.Dispatch<React.SetStateAction<any[]>>;
    active: number, setActive: React.Dispatch<React.SetStateAction<number>>;
}
const AppContext = createContext<AppContextProps | undefined>(undefined);

interface Location {
    name: string;
    value: string;
}
interface JobType {
    contents: string;
    name: string;
    type: string;
    publication_date: string;
    id: number;
    locations: Array<{ name: string }>
    categories: Array<{ name: string }>;
    levels: Array<{ name: string; short_name: string }>;
    tags: Array<{ name: string }>;
    refs: { landing_page: string };
    company: {
        id: number;
        short_name: string;
        name: string;
    }
}
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedLocation, setSelectedLocation,] = useState<Location>({ name: 'London', value: 'London, United Kingdom' });
    const [selectedCompany, setSelectedCompany] = useState<string>('')
    const [selectedLevel, setSelectedLevel] = useState<string[]>([])
    const [listJob, setListJob] = useState<JobType[]>([])
    const [selectedJob, setSelectedJob] = useState<JobType | null>(null)
    const [isDetail, setIsDetail] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const [result, setResult] = useState<any[]>([])
    const [active, setActive] = useState<number>(1);

    const getListJob = async () => {
        setLoading(true)
        try {
            const newlistJob: JobType[] = await getJob(selectedLevel, selectedCompany, selectedLocation.value)
            setListJob(newlistJob)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getListJob()
    }, [selectedLocation, selectedLevel, selectedCompany])


    return (
        <AppContext.Provider
            value={{
                selectedLocation, setSelectedLocation, selectedCompany,
                setSelectedCompany, listJob, setSelectedLevel, selectedLevel,
                isDetail, setIsDetail, selectedJob, setSelectedJob, loading,
                inputText, setInputText, result, setResult, active, setActive
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be in a AppProvider');
    }
    return context;
};