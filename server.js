var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3333));

app.use(express.static(__dirname + '/client'));

app.get('/resume',
  function(req, res) {
    res.download(__dirname + "/server/RyanTangResume.pdf", "RyanTangResume.pdf");
  });

app.listen(app.get('port'), function() {
  console.log('RUNNING AWAY FROM YOU THROUGH PORT', app.get('port'));
});