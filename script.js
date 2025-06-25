let currentLocation;
let currentWeather;
let myLatitude;
let myLongitude;
const searchBtn = document.getElementById("find-weather-btn");
const usersCity = document.getElementById("location");
const weatherText = document.getElementById("weather-text");
const weatherTemp = document.getElementById("temp");
const body = document.querySelector("body");
const weatherCardContainer = document.getElementById("weather-card-container");
const weatherCardWrapper = document.getElementById("weather-card-wrapper")
const imageArr = ["./Images/Blue Square.png", "./Images/Heart.png", "./Images/Octagon.png", "./Images/Oval.png", "./Images/Purple Triangle.png", "./Images/Rhombus.png", "./Images/Star.png", ]


imageArr.forEach(item => {
    const backgroundImg = document.createElement("img")
    backgroundImg.style.width = `${Math.floor(Math.random() * 100) + 200}px`
    backgroundImg.style.position = "absolute"
    backgroundImg.style.top = `${Math.floor(Math.random() * 100) - 20}%`
    backgroundImg.style.left = `${Math.floor(Math.random() * 80) + 1}%`
    backgroundImg.style.zIndex = -1
    backgroundImg.src = item
    body.appendChild(backgroundImg)
})

async function getLocation() {
    await fetch(`https://api.weather.gov/points/${myLatitude},${myLongitude}`)
    .then(response => response.json())
    .then(data => {
        currentLocation = data
        console.log(currentLocation)
    })
}

function displayData() {
    console.log(currentLocation)
    usersCity.innerText = currentLocation.properties.relativeLocation.properties.city
}


const findForecast = async () => {
    await fetch (`https://api.weather.gov/gridpoints/AKQ/${currentLocation.properties.gridX},${currentLocation.properties.gridY}/forecast?units=us`)
        .then(response => response.json())
        .then(data => {
            currentWeather = data
        })
}

const displayForecast = () => {
    // debugger
    console.log(currentWeather)
    currentWeather.properties.periods.forEach(time => {
        if (time.isDaytime) {
            const weatherCard = document.createElement("div");
            weatherCardContainer.classList.add("d-flex");
            weatherCard.classList.add("weather-card");
            weatherCard.classList.add("d-flex")
            weatherCard.classList.add("flex-column")
            const weatherName = document.createElement("h4");
            weatherName.classList.add("d-inline");
            weatherName.innerText = time.name;
            const weatherTemp = document.createElement("h3");
            weatherTemp.classList.add("d-inline");
            weatherTemp.innerText = time.temperature + "°F";
            const weatherDescription = document.createElement("p");
            weatherDescription.classList.add("d-inline");
            weatherDescription.classList.add("weather-text");
            weatherDescription.innerText = time.shortForecast;
            const weatherPrecipitation = document.createElement("p");
            weatherPrecipitation.classList.add("d-inline");
            weatherPrecipitation.innerText = time.probabilityOfPrecipitation.value + "%";
            weatherText.style.display = "block"
            weatherCardContainer.appendChild(weatherCard);
            weatherCard.appendChild(weatherName);
            weatherCard.appendChild(weatherTemp);
            weatherCard.appendChild(weatherPrecipitation);
            weatherCard.appendChild(weatherDescription);
        }

        console.log(time.name, time.probabilityOfPrecipitation)
    })
}



const findMe = async () => {
  const success = (position) => {
    console.log(position);
    status.textContent = "success";
    const { latitude, longitude } = position.coords;
    ;
    myLatitude = latitude
    myLongitude = longitude
    console.log(myLatitude)
  };
  const error = () => {
      console.log("error")
    };
    
    navigator.geolocation.getCurrentPosition(success, error);
    //   console.log(navigator.geolocation.getCurrentPosition(success))
}

findMe()

searchBtn.addEventListener("click", async () => {
    await getLocation()
    displayData()
    await findForecast()
    displayForecast()
    searchBtn.style.display = "none";
    weatherCardWrapper.style.display = "block"
});

