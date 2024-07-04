const BASE_URL = "https://www.themuse.com/api"

export const getJob = async (level: string[], company: string, location: string) => {
    const levelStr = level.length ? level.reduce((acc, curr) => `${acc}level=${curr.replaceAll(' ', '%20')}&`, '') : ''
    const companyStr = company.length ? `company=${(company[0].toUpperCase() + company.slice(1)).replaceAll(' ', '%20')}&` : ''

    const fetchJob = async (value: number): Promise<[number, any[]]> => {
        try {
            const response = await fetch(
                `${BASE_URL}/public/jobs?${levelStr}${companyStr}location=${location.replaceAll(' ', '%20').replace(',', '%2C')}&page=${value}`
            );
            const json = await response.json();
            return [json.page_count, json.results];
        }
        catch (error) {
            console.error(error);
            return [0, []];
        }
    }
    const fetchPromises = [];
    for (let i = 1; i <= 99; i++) {
        fetchPromises.push(fetchJob(i));
    }

    const results = await Promise.all(fetchPromises);

    const pg_count = results[0][0]
    let data: any[] = [];
    for (let i = 0; i < results.length; i++) {
        const [_, pg_result] = results[i];
        data = data.concat(pg_result);
        if (pg_count === i + 1) {
            break;
        }
    }
    return data;
}


export const getCompany = async (location: string) => {
    let newListCompany = []
    const fetchCompany = async (value: number) => {
        try {
            const response = await fetch(
                `${BASE_URL}/public/companies?page=${value}&location=${location.replaceAll(' ', '%20').replace(',', '%2C')}`
            );
            const json = await response.json();
            return [json.page_count, json.results]
        }
        catch (error) {
            console.error(error);
            return [0, []]
        }
    }
    for (let i = 1; i < 10; i++) {
        const [pg_count, pg_result] = await fetchCompany(i)
        newListCompany[i - 1] = { key: i, value: pg_result }
        if (pg_count === i + 1) {
            const temp = newListCompany.reduce((acc, curr) => acc.concat(curr.value), [])
            return temp
        }
    }
    return []
}