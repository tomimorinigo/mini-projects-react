const CAT_ENDPOINT_FACT_URL = 'https://catfact.ninja/fact'

export const getNewFact = async () => {
    const response = await fetch(CAT_ENDPOINT_FACT_URL);
    const data = await response.json();
    const { fact } = data;
    return fact;
};