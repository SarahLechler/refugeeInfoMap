let contributionLayer;
let number;
let institution_id;

let addContributionLayer = () => {
    contributionLayer = L.esri.featureLayer({
        url: 'https://services9.arcgis.com/yt1AxVbBEtuT4IRX/arcgis/rest/services/refugeeinfomap/FeatureServer/0',
        editable: true,
    }).addTo(map);
    contributionLayer.bindPopup(function (layer) {
        return L.Util.template('<p><b>Institution : </b>{name}<br><b><button data-id=contributedInstitution id="infoButton" onclick="openLayerInformation()">mehr Informationen</button><br><button onclick = "editInstitution()">edit</button><button onclick = "deleteInstitution()">delete</button></p>', layer.feature.properties);
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

/**
 * @returns {true if it contains the name in its description}
 * @private
 */
let addFeatureInstitution = () => {
    console.log(lon);
    console.log(lat);
    let feature = {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lon, lat]
        },
        properties: {
            name: document.getElementById("name").value,
            adress: document.getElementById("adress").value,
            kategorie: document.getElementById("category").value,
            thema: document.getElementById("theme").value,
            beschreibung: document.getElementById("descript").value,
            website: document.getElementById("website").value,
            telefon: document.getElementById("telefon").value,
            mail: document.getElementById("mail").value,
            schlagworte: document.getElementById("words").value
        }
    };
    contributionLayer.addFeature(feature, function (error, response) {
        if (error) {
            console.log('error adding feature' + error.message);
        } else {
            console.log('Successfully added feature ' + feature.id);
        }
    });

    $('div #sidebar').addClass('collapsed');

    contributionLayer.bindPopup(function (layer) {
        return L.Util.template('<p><b>Institution : </b>{name}<br><b><button data-id="contributedInstitution" id="infoButton" onclick="openLayerInformation()">mehr Informationen</button><br><button id = "editInstitution" onclick = "editInstitution()">edit</button><button onclick = "deleteInstitution()">delete</button></p>', layer.feature.properties);
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

let editInstitution = () => {

    if($('div #sidebar').hasClass('collapsed')) {
        $('div #sidebar').removeClass('collapsed');
    }
    $('div #contribute').addClass('active');



};

let updateInstitution = () => {

    let feature = {
        type: 'Feature',
        id: institution_id,
        geometry: {
            type: 'Point',
            coordinates: [lon, lat]
        },
        properties: {
            name: document.getElementById("name").value,
            adress: document.getElementById("adress").value,
            kategorie: document.getElementById("category").value,
            thema: document.getElementById("theme").value,
            beschreibung: document.getElementById("descript").value,
            website: document.getElementById("website").value,
            telefon: document.getElementById("telefon").value,
            mail: document.getElementById("mail").value,
            schlagworte: document.getElementById("words").value
        }
    };

    contributionLayer.updateFeature(feature, function (error, response) {
        if (error) {
            console.log('error updating feature' + error.message);
        } else {
            console.log('Successfully updated feature ' + feature.id);
        }
    });
};

let deleteInstitution = ()=> {
    contributionLayer.deleteFeature(institution_id, function (error, response) {
        if (error) {
            console.log('error deleting feature' + error.message);
        } else {
            console.log('Successfully deleted feature ' + response.objectId);
        }
    });
    map.closePopup();
};

let addDrawControl = () => {
    addContributionLayer();

    let drawnItems = contributionLayer;

// Rectangle draw options
    let drawControl = new L.Control.Draw({
        draw: {
            polyline: false,
            polygon: false,
            circle: false, // Turns off this drawing tool
            rectangle: false,
            circlemarker:false
        }
    });

//add event handlers for drawing on Map
    map.on('draw:created', function (e) {
        let type = e.layerType,
            layer = e.layer;

        document.getElementById('institution').innerHTML = '';

        let popupContent = '<form role="contributionForm" id="contributionForm" enctype="multipart/form-data" class = "form-horizontal">' + // onsubmit="addMarker(name, adress, category, theme, descript, website, mail, telefon, words, x, y)"
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Name: </strong></label>' +
            '<input type="text" placeholder="Name" id="name" name="name" class="form-control"/>' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Adress: </strong></label>' +
            '<input type="text" placeholder="Adress" id="adress" name="adress" class="form-control"/>' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Kategorie: </strong></label>' +
            '<select class="form-control" id="category" name="category">' +
            '<option value="Behoerde">Behoerde</option>' +
            '<option value="Fluechtlingshilfe">Fluechtlingshilfe</option>' +
            '<option value="Projekte">Projekte</option>' +
            '<option value="Initiativen">Initiativen</option>' +
            '<option value="Vereine">Vereine</option>' +
            '<option value="Krankenhaus">Krankenhaus</option>' +
            '</select>' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Themen: </strong></label>' +
            '<select class="form-control" id="theme" name="theme">' +
            '<option value="Freizeit">Freizeit</option>' +
            '<option value="Beratung">Beratung</option>' +
            '<option value="Bildung">Bildung</option>' +
            '<option value="Treffpunkt">Treffpunkt</option>' +
            '<option value="Kultur">Kultur</option>' +
            '<option value="Krankenhaus">Krankenhaus</option>' +
            '</select>' +
            '</div>' +
            //...
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Beschreibung: </strong></label>' +
            '<textarea class="form-control" rows="6" placeholder="Beschreibung" id="descript" name="descript">...</textarea>' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Website: </strong></label>' +
            '<input type="text" min="0" placeholder="Website" class="form-control" id="website" name="website">' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>E-Mail: </strong></label>' +
            '<input type="e-mail" min="0" placeholder="E-Mail" class="form-control" id="mail" name="mail">' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Telefon: </strong></label>' +
            '<input type="text" min="0" placeholder="Telefon" class="form-control" id="telefon" name="telefon">' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Schlagwörter: </strong></label>' +
            '<input type="text" min="0" placeholder="Schlagwörter" class="form-control" id="words" name="words">' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<input type="hidden" min="0" placeholder="X" class="form-control" id="x" name="x">' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<input type="hidden" min="0" placeholder="Y" class="form-control" id="y" name="y">' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" onclick="cancelContribution()" class="btn">Cancel</button></div>' +
            '<div style="text-align:center;" class="col-xs-4"><button type="button" value="button" class="btn btn-primary trigger-submit" onclick="addFeatureInstitution()">Submit</button></div>' +
            '</div>' +
            '</form>';
        layer.bindPopup(popupContent).openPopup();
        $(popupContent).appendTo('#institution');
        $('div #sidebar').removeClass('collapsed');
        $('div #contribute').addClass('active');

        lat = layer._latlng.lat;
        lon = layer._latlng.lng;
        console.log(layer);
    });


    map.addControl(drawControl);
};


let searchContributionLayer = (input) =>{
    input=input.toLowerCase();
    contributionLayer.eachFeature(feature =>{
       if(!feature.feature.properties.schlagworte.toLowerCase().includes(input) && !feature.feature.properties.name.toLowerCase().includes(input) ){
           //hide Feature!!
       }

    })
}

let cancelContribution = () =>{
    if(!$('div #sidebar').hasClass('collapsed')) {
        $('div #sidebar').addClass('collapsed');
    }
};