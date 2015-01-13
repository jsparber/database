var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var initialState = {
		items: [
			'document your code',
			'drop the kids off at the pool',
			'</script><script>alert(666)</script>'
				],
				text: ''
	};
  res.render('index', {data: initialState});
});

module.exports = router;
