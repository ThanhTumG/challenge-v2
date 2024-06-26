const BASE_URL = "https://api.quotable.io"


export const getRandomQuote = async () => {
    const response = await fetch(`${BASE_URL}/quotes/random`);
    const data = await response.json();
    return data[0]
}

export const getQuotesByAuthor = async (author: string) => {
    const response = await fetch(`${BASE_URL}/quotes?author=${author.replace(" ", "%20")}`);
    const data = await response.json();
    return data
}