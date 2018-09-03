let map = L.map('map');
map.setView([51.993330, 7.648760], 9);


let whiteAndBlack =     //adding black and white background map
        L.tileLayer('//{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            subdomains: 'abcd',
            maxZoom: 20,
            minZoom: 0,
            label: 'White and Black'  // optional label used for tooltip
        }),
    osm =           //adding osm background map
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            label: 'Street Map',
            maxZoom: 18,
            attribution: 'Map data &copy; OpenStreetMap contributors'
        }).addTo(map);


//basemap and layer toggle
let baseMaps = {
    'Street Map': osm,
    'White and Black': whiteAndBlack
};

let overlaymaps = {
    //"Layer": lyr
}

L.control.layers(baseMaps, overlaymaps).addTo(map);


let sidebar = L.control.sidebar('sidebar').addTo(map);

let createGeojsonFeaturen = (entry) => {
    let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": entry.Name,
            "amenity": entry.Name,
            "popupContent": entry.Beschreibung
        },
        "geometry": {
            "type": "Point",
            "coordinates": [parseFloat(entry.X), parseFloat(entry.Y)]
        }
    };
    return geojsonFeature;
};

let importFile = () => {
    let jsonLayer = L.geoJSON('', {
        id: 'jsonLayer',

    }).bindPopup(function (layer) {
        return layer.feature.properties.popupContent;
    }).addTo(map);
    let jsonData = getJsonData();


    $.when((jsonData !== undefined)).then(
        jsonData.forEach((entry) => {
            let geojsonFeature = createGeojsonFeaturen(entry);
            jsonLayer.addData(geojsonFeature)
        }))


};

importFile();

let addRouting = () => {

    let geocoder = new L.Control.geocoder;
    geocoder.addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(57.74, 11.94),
            L.latLng(57.6792, 11.949)
        ],
        geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map);
};

//addRouting();

let updateDisplayedData = (entries) => {
    debugger;
    let jsonFeatureArray = [];
    map.eachLayer((layer) => {
        if (layer.feature) {
            entries.forEach(entrie => {
                if (layer.feature.properties.name === entrie.Name) {
                    jsonFeatureArray.push(layer)
                }
            })
            map.removeLayer(layer);
        }
    });
    jsonFeatureArray.forEach(feature => {
        map.addLayer(feature);
    })
}