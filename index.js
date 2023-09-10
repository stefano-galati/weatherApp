function changeText(){
    const target = document.getElementById("target");

    target.innerHTML = "bau bau micio micio";
}

function getData(){

    const city = "Turin";
    const target = document.getElementById("target");
    
    target.innerHTML='<i class="fa-solid fa-spinner fa-spin fa-lg icon white"></i>'

    fetch("https://api.open-meteo.com/v1/forecast?latitude=45.0705&longitude=7.6868&hourly=temperature_2m,precipitation&forecast_days=1")
    .then(response => {
        if (response.ok) {
        return response.json(); // Parse the response data as JSON
    } else {
        alert("API request failed")
        throw new Error('API request failed');
    }
    })
    .then(data => {
        // Process the response data here
        console.log(data); // Example: Logging the data to the console
        //target.innerHTML = JSON.stringify(data.hourly);

        target.innerHTML="";
        
        let precipitation = data.hourly.precipitation;
        let temperature = data.hourly.temperature_2m;
        let totalPrecipitation = precipitation.reduce((sum, elem) => sum+=elem, 0);
        let averageTemperature = (temperature.reduce((sum, elem) => sum+=elem, 0))/temperature.length;
        //target.innerHTML = totalPrecipitation;

        if(totalPrecipitation > 0){
            //it rains
            target.innerHTML=`<i class="fa-solid fa-cloud-rain fa-lg icon"></i>`;
        }
        else{
            //no rain
            target.innerHTML=`<div class="iconContainer"><i class="fa-solid fa-sun fa-lg icon yellow"></i></div><div class="stylingBox"><div class="iconContainer">Turin</div><div class="iconContainer">${averageTemperature.toFixed(0)}°</div></div>`;
        }


    })
    .catch(error => {
        // Handle any errors here
        console.error(error); // Example: Logging the error to the console
    });
}
