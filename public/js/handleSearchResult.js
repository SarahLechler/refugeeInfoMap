function tableButton(res) {


    $('#example').DataTable({ //Initializing DataTable (framework)
        searching: false,
        scrollX: true,      // enable List scorolling to fit the sidebar
        data: res,          // searching through given data (res) by column and strings
        destroy: true,      // delete initialized table to enable reinitialization for a new search query
        columns: [
            {data: 'Name'}
        ],
    });
    updateDisplayedData(res);        //Adding the footprint of all search results to the map


    $('#example').on('click', 'tr', function () {
        let table = $('#example').DataTable();
        let name = this.children[0].innerText;
        if ($(this).hasClass('selected')) {   //Selection highlighting of one dataset in the table
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        openPopup(name);
    });
}