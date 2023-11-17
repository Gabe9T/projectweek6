export async function getCurrency(currency) {
    const apiKey = process.env.API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKEy}/latest/${currency}`;
    const options = {
        method: 'GET',

    };

    try {
        const response = await fetch(url);
        const resultText = await response.text();
        const result = JSON.parse(resultText);
        return result;
    } catch (error) {
        return error;
    }
}