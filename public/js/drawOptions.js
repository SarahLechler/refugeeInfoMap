let addDrawControl = () => {
// FeatureGroup is to store editable layers
    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

// Rectangle draw options
    let drawControl = new L.Control.Draw({
        draw: {
            polyline: false,
            polygon: false,
            circle: false, // Turns off this drawing tool
            rectangle: false
        },
        edit: {
            featureGroup: drawnItems
        }
    });

//add event handlers for drawing on Map
    map.on('draw:created', function (e) {
        let type = e.layerType,
            layer = e.layer;
        debugger;
        let popupContent = '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Name: </strong></label>' +
            '<input type="text" placeholder="Name" id="name" name="name" class="form-control"/>' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Adress: </strong></label>' +
            '<input type="text" placeholder="Adress" id="adress" name="dress" class="form-control"/>' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Kategorie: </strong></label>' +
            '<select class="form-control" id="category" name="category">' +
            '<option value="Male">Behoerde</option>' +
            '<option value="Female">Fluechtlingshilfe</option>' +
            '<option value="Other">Projekte</option>' +
            '<option value="Other">Initiativen</option>' +
            '<option value="Other">Vereine</option>' +
            '<option value="Other">Krankenhaus</option>' +
            '</select>' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Themen: </strong></label>' +
            '<select class="form-control" id="theme" name="theme">' +
            '<option value="Male">Freizeit</option>' +
            '<option value="Female">Beratung</option>' +
            '<option value="Other">Bildung</option>' +
            '<option value="Other">Treffpunkt</option>' +
            '<option value="Other">Kultur</option>' +
            '<option value="Other">Krankenhaus</option>' +
            '</select>' +
            '</div>' +
            //...
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Beschreibung: </strong></label>' +
            '<textarea class="form-control" rows="6" placeholder="Beschreibung" id="descrip" name="descript">...</textarea>' +
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
            '<input type="number" min="0" placeholder="Telefon" class="form-control" id="telefon" name="telefon">' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<label class="control-label col-sm-5"><strong>Schlagwörter: </strong></label>' +
            '<input type="text" min="0" placeholder="Schlagwörter" class="form-control" id="words" name="words">' +
            '</div>' +
            '<div class="form-group-pop-up">' +
            '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn">Cancel</button></div>' +
            '<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>' +
            '</div>' +
            '</form>';

        //edit Form

        drawnItems.addLayer(e.layer);

        layer.bindPopup(popupContent).openPopup();


    });


    map.addControl(drawControl);
};

let addMarker = () => {
    debugger;
}

addDrawControl();