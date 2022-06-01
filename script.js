let afficheLatitude, afficheLongitude, latVal, longVal, map , invader;

jQuery(document).ready(
    function ($) {
        $.ajax(
            {
                url: 'http://api.open-notify.org/iss-now.json',
                method: 'GET'
            }
        )
            .done(
                (donnees) => {
                    // //console.log(donnees.iss_position);
                    // afficheLatitude = $("#latitude").text(donnees.iss_position.latitude);
                    // afficheLongitude = $("#longitude").text(donnees.iss_position.longitude);

                    //Variables de la map
                    latVal = donnees.iss_position.latitude;
                    longVal = donnees.iss_position.longitude;
                    const zoom = 4;

                    //Initialisation de la map
                    map = L.map('map').setView([latVal, longVal], zoom);

                    //Layer de map
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                        // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                        {
                            maxZoom: 19,
                            attribution: '© OpenStreetMap'

                            //Applique le layer sur la map
                        }).addTo(map);

                    // Reload la map
                    // map.updateInterval();
                    //
                    // Creation d'une Icone de marqueur
                    // let mapIcon = L.icon({
                    //    iconUrl: '../img/invaders_wht.png'
                    // })//eo mapIcon
                    //
                    // Ajouter le marqueur à la map
                    // L.marker([latVal, longVal], {icon: mapIcon}).addTo(map);
                }
            ); //Eo Done
    }
)

setInterval(updateMap, 3000);

function updateMap() {

    $.ajax(
        {
            url: 'http://api.open-notify.org/iss-now.json',
            method: 'GET'
        }
    )
        .done(
            (donnees) => {
                //Variables de la map
                latVal = donnees.iss_position.latitude;
                longVal = donnees.iss_position.longitude;

                map.flyTo([latVal, longVal]);
                L.circle([latVal, longVal], {
                    color: 'yellow',
                }).addTo(map);

                //Creation d'une Icone de marqueur
                let mapIcon = L.icon({
                    iconUrl: '../img/invaders_wht.png'
                })//eo mapIcon
                
                //Ajouter le marqueur à la map
                invader = L.marker([latVal, longVal], {icon: mapIcon}).addTo(map);

                afficheLatitude = $("#latitude").text(donnees.iss_position.latitude);
                afficheLongitude = $("#longitude").text(donnees.iss_position.longitude);

            });

} //Eo UpdateMap






