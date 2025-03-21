var map = L.map('map', {
    preferCanvas: true
}).setView([41.07, 29.01], 13);
L.control.locate().addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const setMarkers = async () => {
    const windowLocation = window.location.pathname;
    const data = await fetch(windowLocation+"places.json");
    const json = await data.json();
    for(const ilId in json)
    {
        const ilceler = json[ilId];
        for(const ilceId in ilceler)
        {
            const places = ilceler[ilceId];
            for(const placeData of places)
            {
                const place = placeData.place
                L.circleMarker([place.lat, place.lng], {
                }).addTo(map)
                    .bindPopup(`<b>${placeData.query}</b>`);
            }
        }

    }
}

setMarkers();

/** @type {HTMLDialogElement} */
const disclaimer = document.getElementById("disclaimer");
/** @type {HTMLElement} */
const heading = document.querySelector("h1");

heading.addEventListener("click", () => {
    disclaimer.classList.toggle("open");
    heading.classList.toggle("in-modal");
});