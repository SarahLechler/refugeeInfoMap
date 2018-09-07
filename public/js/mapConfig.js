let config = {
    routing: true,
    logIn: true,
    contribution: true,
    specifyEntriesToLocation:false,
    boundingBox: []
};

if (config.routing){
    addRouting()
}

if (config.logIn){

}

if (config.contribution){
    addDrawControl()
}

if (config.specifyEntriesToLocation){
    filterEntriesToBoundingBox(config.boundingBox)
}

