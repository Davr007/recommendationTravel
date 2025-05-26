const searchInput = document.getElementById("search_input");
const submitButton = document.getElementById("submit_button");
const resetButton = document.getElementById("clear_button");
const resultDiv = document.querySelector(".result")
const submitContactButton = document.getElementById("submit_contact_button");

submitButton.addEventListener("click", findDestination);
resetButton.addEventListener("click", () => {
    searchInput.value = "";
})


function findDestination () {

    const value = searchInput.value.trim().toLowerCase();

    fetch ("./data.json")
    .then(response => response.json())
    .then(data => {
        const destination = checkDestination(value, data);
        if (destination) {
            displayRecommendations(destination)
        }
    })
    .catch(error => console.error(error));

}

function checkDestination (value, data) {
    if (value === 'beach') {
        return data.beaches
    } else if (value === 'temple') {
        return data.temples
    } else if (data.countries.find(country => country.name.toLowerCase() === value)) {
        return data.countries.find(country => country.name.toLowerCase() === value).cities
    } else {
        alert("Destination not found")
        return false
    }
}

function displayRecommendations (data) {
        data.forEach(item => {
            resultDiv.innerHTML += `
            <div class="result_card">
                <img src='${item.imageUrl}' alt="card">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
            </div>`;
        })
}