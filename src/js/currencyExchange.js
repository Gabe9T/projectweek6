
export class Currency {

    static async getCurrency(url) {
        try {
            const response = await fetch(url);
            const resultTxt = await response.text();
            const result = JSON.parse(resultTxt);
            if (!response.ok) {
                throw new Error('Request failed with status: ' + response.status + " " + result["error-type"]);
            }
            return { result };
        } catch (error) {
            return { error };
        }
    }

    static async converted(currency1, currency2, ammount) {
        const key = process.env.API_KEY;
        const url = `https://v6.exchangerate-api.com/v6/${key}/pair/${currency1}/${currency2}/${ammount}`;
        return await this.getCurrency(url);
    }
}
