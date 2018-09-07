$(document).ready(function () {
    /**
     * @desc AJAX.GET to overwrite submit of the searchform.
     *       passes search parameters to the server
     *       find all searched items and and passes them to the tableButton function
     * @return searchdata  or error
     **/
    $('#searchform').submit(function (e) {
        e.preventDefault();
        let that = this;

        $.ajax({
            // catch custom response code.
            statusCode: {
                500: function () {
                    console.error("Object not found");
                }
            },
            data: $(that).serialize(),
            type: 'GET',
            contentType: "application/json",
            // Dynamically create Request URL by appending requested name to /api prefix
            url: '/search',
            error: function (xhr, status, err) {
                console.log(err);
            },
            success: function (res) {
                tableButton(res)
            }
        });
    });
    /**
     * @desc AJAX.GET to overwrite submit of the choosebandform.
     *       passes BandIds and path to the directory to the server
     * @return path to layer or error
     **/
    $('#filterFormCatagory').submit(function (e) {
        e.preventDefault();
        var that = this;
        $.ajax({
            // catch custom response code.
            statusCode: {
                500: function () {
                    console.error("Object not found");
                }
            },
            data: $(that).serialize(),
            type: 'GET',
            contentType: "application/json",
            // Dynamically create Request URL by appending requested name to /api prefix
            url: '/filterFormCatagory',
            error: function (xhr, status, err) {
                console.log(err);
            },
            success: function (res) {
                updateDisplayedData(res);
                let filtervalue = document.getElementById('filterOptions').value;
                filterContributionLayer('category', filtervalue);
            }
        });
    });

    $('#filterFormTheme').submit(function (e) {
        e.preventDefault();
        var that = this;
        $.ajax({
            // catch custom response code.
            statusCode: {
                500: function () {
                    console.error("Object not found");
                }
            },
            data: $(that).serialize(),
            type: 'GET',
            contentType: "application/json",
            // Dynamically create Request URL by appending requested name to /api prefix
            url: '/filterFormTheme',
            error: function (xhr, status, err) {
                console.log(err);
            },
            success: function (res) {
                updateDisplayedData(res);
                let filtervalue = document.getElementById('filterOptionTheme').value;
                filterContributionLayer('theme', filtervalue);
            }
        });
    });
});

