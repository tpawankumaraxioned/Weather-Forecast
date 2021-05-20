// OnClick search function starts here
var findBtn = document.querySelector('.findBtn');

findBtn.addEventListener('click',ev => {
  ev.preventDefault();
  var find_location = document.querySelector('#city-in').value;
  let b = find_location.split(',');   
  document.querySelector('.weather-list').innerHTML= '';

  get_data(b);
});
// OnClick search function ends here
// Weather api function starts here
function get_data(cities){
  cities.map(city => {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city +'&units=metric&appid=43812e2ef7977461689b72c7cb246c21';
  
    fetch(url)
    .then(response => response.json())
    .then(data => {
      document.querySelector('#errorMsg').style.display = "none";
      let list = data.list;
      let i = 0;
      list.map(li => {
        if(i % 8 == 0){
          let icon = `https://openweathermap.org/img/wn/${li.weather[0]["icon"]}@2x.png`;

          let li1 = document.createElement("li");
          li1.classList.add("city");
          let markup = `
            <h2 class="city-name">
              <span>${city}</span>
            </h2>
            <span class="curr-Time">${li.dt_txt.slice(0, -3)}</span>
            <span class="curr-Temp">${li.main.temp}<sup>o</sup>C</span>
            <figure>
              <img class="city-icon" src=${icon} alt=${li.weather[0]["main"]}>
              <figcaption>${li.weather[0]["description"]}</figcaption>
            </figure>
          `;
          li1.innerHTML = markup;
          document.querySelector('.weather-list').appendChild(li1);
        }
        i++;
      })
    })
    .catch(() => {
      document.querySelector('#errorMsg').style.display = "block";
    });
  });
}
// Weather api function ends here