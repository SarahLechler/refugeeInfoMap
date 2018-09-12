let map = L.map('map');
map.setView([51.993330, 7.648760], 11);


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
};

L.control.layers(baseMaps, overlaymaps).addTo(map);


let sidebar = L.control.sidebar('sidebar').addTo(map);

let createGeojsonFeaturen = (entry) => {
    let featureAttributes = JSON.stringify(entry);
    let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": entry.Name,
            "amenity": entry.Name,
            "entry": entry,
            "popupContent": '<p><b>Institution : </b>' + entry.Name + '<br><button data-id="' + entry.Name + '" id="infoButton" onclick="openLayerInformation()">mehr Informationen</button>'

        },
        "geometry": {
            "type": "Point",
            "coordinates": [parseFloat(entry.X), parseFloat(entry.Y)]
        }
    };
    return geojsonFeature;
};

let fileImported = false;

let jsonLayer;
let importFile = () => {
    let initialization = true;
    if (!fileImported) {
        jsonLayer = L.geoJSON('', {
            id: 'jsonLayer',

        }).bindPopup(function (layer) {
            return layer.feature.properties.popupContent;
        }).addTo(map);
        let jsonData = getJsonData();

        $(document).ajaxComplete((event, xhr, settings) => {
            if (settings.url === '../json/mapData.json' & initialization) {
                jsonData = xhr.responseJSON;
                jsonData.forEach((entry) => {
                        let geojsonFeature = createGeojsonFeaturen(entry);
                        jsonLayer.addData(geojsonFeature)
                    }
                );
                initialization = false;
            }

        });
        fileImported = true;
    }
};

importFile();

let addRouting = () => {

    let geocoder = new L.Control.geocoder({
        defaultMarkGeocode: false,
        placeholder: "Suche..",
        errorMessage: "Es wurde nichts gefunden",
        geocoder: L.Control.Geocoder.nominatim()
    });
    geocoder.addTo(map);

    L.Routing.control({
        waypoints: [/*
            L.latLng(57.74, 11.94),
            L.latLng(57.6792, 11.949)*/
        ],
        geocoder: L.Control.Geocoder.nominatim(),
        collapsible: true,
        show: false
    }).addTo(map);
};

let updateDisplayedData = (entries) => {
    let jsonFeatureArray = [];
    if (!fileImported) {
        jsonLayer.clearLayers();
        map.removeLayer(jsonLayer);
        importFile();
        let filterLayer = true;
        $(document).ajaxComplete((event, xhr, settings) => {
            if (settings.url === '../json/mapData.json' & filterLayer) {
                jsonLayer.eachLayer((layer) => {
                    entries.forEach(entry => {
                        if (layer.feature.properties.name === entry.Name) {
                            jsonFeatureArray.push(layer)
                        }
                    });
                    jsonLayer.removeLayer(layer);
                });
                jsonFeatureArray.forEach(feature => {
                    if (!jsonLayer.hasLayer(feature)) {
                        jsonLayer.addData(feature.feature);
                    }
                });
                filterLayer = false;
            }

        });
    } else {
        jsonLayer.eachLayer((layer) => {
            entries.forEach(entry => {
                if (layer.feature.properties.name === entry.Name) {
                    jsonFeatureArray.push(layer)
                }
            });
            jsonLayer.removeLayer(layer);
        });
        jsonFeatureArray.forEach(feature => {
            if (!jsonLayer.hasLayer(feature)) {
                jsonLayer.addData(feature.feature);
            }
        });
    }
    console.log(jsonLayer);
    if (!$('div #sidebar').hasClass('collapsed')) {
        $('div #sidebar').addClass('collapsed');
    }
    $('div #filter').removeClass('active');
    $('div #filterTab').removeClass('active');
    fileImported = false;
};

let openPopup = (name) => {
    jsonLayer.eachLayer((layer) => {
        if (layer.feature.properties.name === name) {
            layer.openPopup();
        }
    });
};

let resetMapContent = () => {
    if (contributionLayer) {
        contributionLayer.setWhere("");
    }
    importFile();

    if (!$('div #sidebar').hasClass('collapsed')) {
        $('div #sidebar').addClass('collapsed');
    }
    $('div #filter').removeClass('active');
    $('li #filterTab').removeClass('active');
};

let openLayerInformation = () => {
    let name = $('#infoButton').attr('data-id');
    $('div #info').addClass('active');
    $('li #infoTab').addClass('active');
    if ($('div #sidebar').hasClass('collapsed')) {
        $('div #sidebar').removeClass('collapsed');
    }
    if (name === 'contributedInstitution') {
        let infos = '<div><p><b>Name:</b> ' + document.getElementById("name").value + '<br>' +
            '<b>Addresse:</b> ' + document.getElementById("adress").value + '<br>' +
            '<b>Beschreibung:</b> ' + document.getElementById("descript").value + '<br>' +
            '<b>Website:</b> <a href="' + document.getElementById("website").value + ' ">' + document.getElementById("website").value + '</a><br>' +
            '<b>Telefon:</b> ' + document.getElementById("telefon").value + '<br>' +
            '<b>E-Mail:</b> ' + document.getElementById("mail").value + '<br></p></div>';
        $('#informationInfo').empty();
        $('#infos').appendTo('#informationInfo');

    } else {
        jsonLayer.eachLayer(layer => {
            if (layer.feature.properties.name === name) {
                let infos = '<div><p><b>Name:</b>' + layer.feature.properties.name + '<br>' +
                    '<b>Addresse:</b>' + layer.feature.properties.entry.Adress + '<br>' +
                    '<b>Beschreibung:</b>' + layer.feature.properties.entry.Beschreibung + '<br>' +
                    '<b>Website:</b><a href="' + layer.feature.properties.entry.Website + ' ">' + layer.feature.properties.entry.Website + '</a><br>' +
                    '<b>Telefon:</b>' + layer.feature.properties.entry.Telefon + '<br>' +
                    /* + '<b>E-Mail:</b> '+layer.feature.properties.entry.E-Mail+'<br>*/'</p></div>';
                $('#informationInfo').empty();
                $(infos).appendTo('#informationInfo');
                console.log("Hurray!!")
            }
        })
    }
};

let filterContributionLayer = (type, filtervalue) =>{
    if(type === "thema") {
        contributionLayer.setWhere("thema=filtervalue")
    }
    if(type === "category"){
        contributionLayer.setWhere("kategorie=filtervalue")
    }
};

