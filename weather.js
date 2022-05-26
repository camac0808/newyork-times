
const WEATHER_API_KEY = "eb6c8809dedfcbd1ebcf399d86e92683";
const weather = document.getElementById("weather");
const temp = document.getElementById("temp")

// geolocation 사용하기
navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`)
  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  weather.innerHTML = `${data.name}  ${Math.round(data.main.temp - 273.15)}℃`;
  let iconCode = data.weather[0].icon;
  let iconUrl = `<img src="http://openweathermap.org/img/w/${iconCode}.png">`;
  document.getElementById("icon").innerHTML = `${iconUrl} ${data.weather[0].main}`;
}

function error() {
  alert('위치 정보를 불러올 수 없습니다.');
}
// weather url 부르기
// header 부르기
// 데이터 가져오기 (response fetch)
// 데이터 보여주기 (response.json)
const getWeather = async () => {};
