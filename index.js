const weatherApi = "https://api.weather.gov/alerts/active?area="

function fetchWeatherAlerts(state) {
    const errorDiv = document.getElementById("error-message")

    fetch(weatherApi + state)
        .then((response) => { return response.json() })
        .then((data) => { 
            displayAlerts(data)
            textField.value = ""
            errorDiv.textContent = ""
            errorDiv.classList.add("hidden")
        })
        .catch((err) => { 
            console.log(err.message)
            errorDiv.textContent = err.message
            errorDiv.classList.remove("hidden")
        })
}

function displayAlerts(data) {
    const alertsDisplay = document.getElementById("alerts-display")
    alertsDisplay.textContent = `${data.title}: ${data.features.length}`

    const alertsList = document.createElement("ul")
    data.features.forEach(alert => {
        const listItem = document.createElement("li")
        listItem.textContent = alert.properties.headline
        alertsList.appendChild(listItem)
    });
    alertsDisplay.appendChild(alertsList)
}

const textField = document.getElementById("state-input")

document.getElementById("fetch-alerts").addEventListener("click", () => { fetchWeatherAlerts(textField.value) })