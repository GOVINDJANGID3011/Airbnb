
mapboxgl.accessToken=`${map_token}`;
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            center: mapCoordinate, // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom:12 // starting zoom
            
        });


const marker1 = new mapboxgl.Marker({ color: 'red'})
    .setLngLat(mapCoordinate)
    .setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<h4>${maplocation}</h4><p>Exact Location provided after booking</p>`))
    .addTo(map);

    // Create a default Marker, colored black, rotated 45 degrees.
// const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 45 })
//         .setLngLat([-74.5, 40])
//         .addTo(map);