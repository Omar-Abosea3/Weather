let thisDay=document.getElementById("thisDay");
let forecast=document.getElementById("forecast");
let searsh1 =document.getElementById("searsh")

// http://api.weatherapi.com/v1/search.json?key=c5a1af1c05f74f248a2112731232402&q=lond

// https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam


async function search(a) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7ce0e38b39534ffbac3141401232402&q=${a}&days=3`);
    
    if (t.ok && 400 != t.status) {
        let e = await t.json();
        getCurrent(e.location,e.current);
        getNext(e.forecast.forecastday)
    }
}
searsh1.addEventListener("keyup", a=>{
    search(a.target.value)
    console.log(a.target.value);
}
);
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];


function getCurrent(e,t){
    if(null != t){
    let x = new Date();
    let y =`<div class="d-flex p-2 w-100 flex-wrap justify-content-between ">
    <h6 class="w-25">${days[x.getDay()]}</h6>
    <h6 class="w-25">${x.getDate() +" "+monthNames[x.getMonth()]}</h6>
    </div>
    <div class="d-flex flex-wrap p-4 w-100 align-items-center" id="thisDayInfo">
                <h4 class="w-100 text-secondary mb-3">${e.name}</h4>
                <div class="w-100 mb-4 d-flex flex-wrap align-items-center justify-content-between">
                <h1 class="w-100 pe-3">${t.temp_c}<sup>o</sup>C</h1>
                <img src="https://${t.condition.icon}" alt="">
                </div>
                <p class="text-info fs-5 ">${t.condition.text}</p>
                <div class="w-100 mt-3">
                <span class="me-2"><img src="./images/icon-umberella.png" alt="">20%</span>
                <span class="me-2"><img src="./images/icon-wind.png" alt="">18km/h</span>
                <span><img src="./images/icon-compass.png" alt="">East</span>
                </div>
                </div>
                </div>
    </div>`
    thisDay.innerHTML=y;
    }
}

let Myclasses=[{class:"",id1:"",id2:""},{class:"forcast1",id1:"nextDay",id2:"nextDayInfo"},{class:"forcast2",id1:"thirdDay",id2:"thirdDayInfo"}]
function getNext(n){
    let cartoona="";
    for(let i = 1; i<n.length && i < Myclasses.length ; i++){
        cartoona+=`<div class="col-12 col-sm-12 col-md-12 col-lg-6 p-0  text-light" id="${Myclasses[i].id1}">
        <div class="d-flex w-100 flex-wrap p-2 ${Myclasses[i].class} justify-content-center">
            <h6>${days[new Date(n[i].date).getDay()]}</h6>
        </div>
        <div class="d-flex flex-wrap w-100 p-4 justify-content-center align-content-center text-center" id="${Myclasses[i].id2}">
            <div class="w-25 text-center">
                <img src="https://${n[i].day.condition.icon}" alt="" class="w-100 mb-4">
                <p class="fs-3 fw-bold">${n[i].day.maxtemp_c}<sup>o</sup>C</p>
                <p class="fs-4 fw-light">${n[i].day.mintemp_c}<sup>o</sup></p>
            </div>
            <p class="text-info fs-5 w-100">${n[i].day.condition.text}</p>
        </div>
    </div>`
    }
    forecast.innerHTML=cartoona;
}





search("cairo");
