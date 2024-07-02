const BASE_URL = "https://api.thecatapi.com/v1"
const apikey = import.meta.env.VITE_API_CAT
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

export const fetchListCat = async (page: number) => {
    try {
        const response = await fetch(

            `${BASE_URL}/breeds?limit=10&page=${page}`
        );
        const json: CatInfo[] = await response.json();
        json.forEach(cat => cat.name = cat.name.toLowerCase());
        return json
    } catch (error) {
        console.error(error);
    }
    return []
}

export const getMostSearchList = async () => {
    try {
        const response = await fetch(

            `${BASE_URL}/votes?limit=70&order=DESC`
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': `${apikey}`
                },
            });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
    }
    return []
}

export const getBreedImage = async (id: string) => {
    try {
        const response = await fetch(
            `${BASE_URL}/images/search?limit=8&breed_ids=${id}`
        );
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
    }
}

export const increaseVoteBreed = async (id: string, mostSearch: CatVote[]) => {
    const breed = mostSearch.find((cat) => cat.image_id === id)
    // const vote = await getVoteBreed()
    console.log(breed)
    let vote: number;
    if (breed) {
        vote = breed.value;
    } else vote = 0;
    try {
        const response = await fetch(

            `${BASE_URL}/votes`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': `${apikey}`
                },
                body: JSON.stringify({
                    "image_id": `${id}`,
                    "sub_id": "tung",
                    "value": vote + 1
                })
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
    }
}