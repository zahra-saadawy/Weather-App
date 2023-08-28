
document.addEventListener('DOMContentLoaded', function(){
    getUserInfo();
})

// view current user's info when website is first opened
async function getUserInfo(){
    const userResponse = await fetch('https://ipgeolocation.abstractapi.com/v1?api_key=aca286d212f541fcb2b2a39116ec7a8f');
    const userData = await userResponse.json();
    
    getInfo(userData.city);
}



// get the city name
async function getCity(inputCity ){
    var apiResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=8dc658786a1749fd9a2182830232708&q=${inputCity}`);
    var apiData = await apiResponse.json();
    console.log("**********");
    console.log(apiData);
    if(apiData.length !=0)
         getInfo(apiData[0].name);

    // getInfo(apiData.Location.name);
}

// get the city info
async function getInfo(cityName){
    var apiRes = await fetch(`http://api.weatherapi.com/v1/current.json?key=8dc658786a1749fd9a2182830232708&q=${cityName}`);
    var apiInfo = await apiRes.json();
    
    fillFirstCard(apiInfo);
    fillSecondAndThirdCards(cityName);
}


// add the event
let inputElement = document.getElementById("input-element");
inputElement.addEventListener('input', function(eventInfo){
    // console.log(eventInfo.target.value);
    if(eventInfo.target.value !="")
         getCity(eventInfo.target.value);
})

// fill first card
function fillFirstCard(cityInfo){
    // update weather status
    let state = cityInfo.current.condition.text;
    document.querySelector(".state").innerHTML=state;
    // update city name
    let cityName = cityInfo.location.name;
    document.querySelector(".city-name").innerHTML= cityName;
    // update the day
    let fullDate = cityInfo.current.last_updated;
    let dateObj = new Date(fullDate);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = daysOfWeek[dateObj.getDay()];
    document.querySelector(".day").innerHTML= dayName;
    // update day for card 2 and 3
    if(dateObj.getDay()+1>daysOfWeek.length-1){
        document.querySelector(".day2").innerHTML =daysOfWeek[0];
        document.querySelector(".day3").innerHTML =daysOfWeek[1];
    }
    else if(dateObj.getDay()+2>daysOfWeek.length-1)
        {
            document.querySelector(".day2").innerHTML =daysOfWeek[dateObj.getDay()+1];
            document.querySelector(".day3").innerHTML =daysOfWeek[0];
        }
    else{
        document.querySelector(".day2").innerHTML =daysOfWeek[dateObj.getDay()+1];
        document.querySelector(".day3").innerHTML =daysOfWeek[dateObj.getDay()+2];
    }
    // update the date
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const formattedDate = `${day}${month}`;
    document.querySelector(".date").innerHTML=formattedDate;
    // update tempreature
    const temp = cityInfo.current.feelslike_c;
    document.querySelector(".num").innerHTML=temp;
    // update icon
    const iconUrl = cityInfo.current.condition.icon;
    document.querySelector(".icon-first").src= iconUrl;

    }
// fill sec and 3rd cards
async function fillSecondAndThirdCards(code){
    var forecastResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8dc658786a1749fd9a2182830232708&q=${code}&days=7`);
    var forecastData = await forecastResponse.json();
   document.querySelector(".min2").innerHTML= forecastData.forecast.forecastday[2].day.mintemp_c;
   document.querySelector(".max2").innerHTML= forecastData.forecast.forecastday[2].day.maxtemp_c;
   document.querySelector(".icon2").src =forecastData.forecast.forecastday[2].day.condition.icon;
   document.querySelector(".state2").innerHTML=forecastData.forecast.forecastday[2].day.condition.text;
// update 3rd card
    document.querySelector(".min3").innerHTML= forecastData.forecast.forecastday[3].day.mintemp_c;
    document.querySelector(".max3").innerHTML= forecastData.forecast.forecastday[3].day.maxtemp_c;
    document.querySelector(".icon3").src =forecastData.forecast.forecastday[3].day.condition.icon;
    document.querySelector(".state3").innerHTML=forecastData.forecast.forecastday[3].day.condition.text;

}