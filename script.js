let currentLocation;
let currentWeather;
let myLatitude;
let myLongitude;

async function fetchData() {
    await fetch(`https://api.weather.gov/points/${myLatitude},${myLongitude}`)
    .then(response => response.json())
    .then(data => {
        currentLocation = data
        console.log(currentLocation)
    })
}


function displayData() {
    fetchData()
    console.log(currentLocation.properties.gridX, currentLocation.properties.gridY)
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
    displayData()
    findForecast()
    displayForecast()
//   console.log(navigator.geolocation.getCurrentPosition(success))
}


findMe()
