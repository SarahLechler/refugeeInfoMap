let config = {
    routing: true,
    logIn: true,
    contribution: true,
    credential: {
        Name: 'Sarah Lechler',
        Mail: 's.lechler@uni-muenster.de'
    },
    specifyEntriesToLocation: false,
    boundingBox: [5.77, 50.31, 9.46, 52.62]
};

if (config.routing) {
    addRouting()
}

if (!config.logIn) {
    document.getElementById('logIn').innerHTML = '';
}

$("#contactNav").append('<p><b>Name: </b>' + config.credential.Name + '<br> <b>E-Mail: </b>' + config.credential.Mail);

let filterEntriesToBoundingBox = () => {
    contributionLayer.query().within(config.boundingBox);

};

if (config.specifyEntriesToLocation) {
    debugger;
    let bbox= {json:getJsonData(), bbox: config.boundingBox};
    $.ajax({
        // catch custom response code.
        statusCode: {
            500: function () {
                console.error("Object not found");
            }
        },
        data: bbox,
        type: 'GET',
        contentType: "application/json",
        url: '/bbox',
        error: function (xhr, status, err) {
            console.log(err);
        },
        success: function (res) {
            updateDisplayedData(res);
        }
    });
    filterEntriesToBoundingBox();
}


if (config.contribution) {
    addDrawControl()
}





