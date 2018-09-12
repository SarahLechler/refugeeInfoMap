let contributionLayer;

let addContributionWithoutLoginLayer = () => {
    contributionLayer = L.esri.featureLayer({
        url: 'https://services9.arcgis.com/yt1AxVbBEtuT4IRX/arcgis/rest/services/refugeeinfomap/FeatureServer/0',
        editable: true,
    }).addTo(map);
    contributionLayer.bindPopup(function (layer) {
        return L.Util.template('<p><b>Institution : </b>{name}<br><b><button data-id=contributedInstitution id="infoButton" onclick="openLayerInformation()">mehr Informationen</button><br></p>', layer.feature.properties);
    });

    contributionLayer.bringToFront();
    contributionLayer.on('click', function (event) {
        lon = event.latlng.lng;
        lat = event.latlng.lat;
        name = event.layer.feature.properties.Name;
        description = event.layer.feature.properties.Beschreibung;
        institution_id = event.layer.feature.id;
    });
};

map.on('popupopen', e =>{
    $('#name').val(e.popup._source.feature.properties.name);
    $('#adress').val(e.popup._source.feature.properties.adress);
    $('#category').val(e.popup._source.feature.properties.category);
    $('#theme').val(e.popup._source.feature.properties.theme);
    $('#descript').val(e.popup._source.feature.properties.beschreibung);
    $('#website').val(e.popup._source.feature.properties.website);
    $('#telefon').val(e.popup._source.feature.properties.telefon);
    $('#mail').val(e.popup._source.feature.properties.mail);
    $('#words').val(e.popup._source.feature.properties.words);
});

addContributionWithoutLoginLayer();