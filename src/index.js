import "./css/styles.css";
import { Currency } from "./js/currencyExchange";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("converted").addEventListener("submit", handleFormSubmission);
});

async function handleFormSubmission(e) {
    e.preventDefault();
    const currency1Element = document.getElementById("currency1");
    const currency1 = currency1Element.value;

    const currency2Element = document.getElementById("currency2");
    const currency2 = currency2Element.value;

    const ammount = document.getElementById("ammount").value;

    if (!isNumeric(ammount) || ammount <= 0) {
        showError("Please enter a valid ammount greater than 0.");
        return;
    }

    try {
        const { result, error } = await Currency.converted(currency1, currency2, ammount);

        const results = document.getElementById("results");
        results.innerHTML = "";

        if (error) {
            showError(`Your request resulted in an error: ${error.message}`);
        } else if (result.conversion_result !== undefined) {
            showConversion(`${ammount} ${currency1} is equal to ${result.conversion_result}${currency2}.`);

        } else {
            showEmpty("Please enter an input ammount.");
        }

        results.classList.remove("hidden");
    } catch (error) {

        showError("An unexpected error occurred.");
    }
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function showError(message) {
    const results = document.getElementById("results");
    const errorElement = document.createElement("p");
    errorElement.textContent = message;
    results.appendChild(errorElement);
}

function showConversion(message) {
    const results = document.getElementById("results");
    const conversionElement = document.createElement("p");
    conversionElement.textContent = message;
    results.appendChild(conversionElement);
}

function showEmpty(message) {
    const results = document.getElementById("results");
    const emptyElement = document.createElement("p");
    emptyElement.textContent = message;
    results.appendChild(emptyElement);
}