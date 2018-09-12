let express = require('express');
let router = express.Router();
let search = require('../search.js');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/map');
	}
}

router.get('/map', function(req, res){
    res.render('indexWithoutLogin');
});

/**
* @desc AJAX.GET on server for sending a search request
*       takes a SearchString
*       and passes it to the search function
*       url format: /search
* @return entries or error
*/
router.get('/search', function (req, res) {
    let searchString = req.query.searchInput;
    let erg = search.search(searchString);
    console.log(erg);
    if(erg !== []){
        res.json(erg);
    } else res.send("nothing found")
});


/**
 * @desc AJAX.GET on server for sending a search request
 *       takes a SearchString
 *       and passes it to the search function
 *       url format: /search
 * @return entries or error
 */
router.get('/bbox', function (req, res) {
    console.log(req.query.bbox);
    let searchString = req.query.bbox;
    let erg = search.searchbox(searchString);
    console.log(erg);
    if(erg !== []){
        console.log(erg);
        res.json(erg);
    } else res.send("nothing found")
});

/**
 * @desc AJAX.GET on server for sending a filter request
 *       takes a category  for filtering
 *       and passes it to the filter function
 *       url format: /filterFormCatagory
 * @return entries or error
 */
router.get('/filterFormCatagory', function (req, res) {
    let searchString = req.query.filterOptions;
    let erg = search.filterDataCatagory(searchString);
    console.log(erg);
    if(erg !== []){
        res.json(erg);
    } else res.send("nothing found")

});


/**
 * @desc AJAX.GET on server for sending a filter request
 *       takes a theme  for filtering
 *       and passes it to the filter function
 *       url format: /filterFormTheme
 * @return entries or error
 */
router.get('/filterFormTheme', function (req, res) {
    let searchString = req.query.filterOptionTheme;
    let erg = search.filterDataTheme(searchString);
    console.log(erg);
    if(erg !== []){
        res.json(erg);
    } else res.send("nothing found")

});


module.exports = router;