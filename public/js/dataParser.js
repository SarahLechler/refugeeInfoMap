let getJsonData = () => {
    $.getJSON('../json/mapData.json', data =>{
        let jsonData = JSON.stringify(data);
        jsonData = JSON.parse(jsonData);
        return jsonData;
    })

};