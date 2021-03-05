var express = require('express');
var router = express.Router();
var fs = require("fs");

const isPortReachable = require('is-port-reachable');

let daemons = []
fs.readFile("daemons.txt", function(err, buf) {
  if (!err) {
    return false;
  }else{
    daemons = JSON.parse(buf.toString());
  }
});

router.get('/', function(req, res, next) {
  daemons.forEach(function(a){
    (async () => {
      status = await isPortReachable(a['port'], {host: a['address'].toString()});
      a['status'] = status;
    })();
    console.log(a['status']);
  });
  res.render('index', { title: 'status.d', daemons:daemons });
});

router.post('/add', function (req, res) {
  const service = {};
  service.id = Math.random() * 100;
  service.name = req.body.name
  service.port = req.body.port
  service.address = req.body.address
  console.log(req.body.address);
  var status
  (async () => {
    status = await isPortReachable(req.body.port, {host: req.body.address});
  })();
  service.status = status;
  daemons.push(service);
  fs.writeFile("daemons.txt", JSON.stringify(daemons), function(err, result) {
    if(err) console.log('error', err);
  })
  res.redirect('/');
});

router.post('/del/:id', function (req, res) {
  console.log(req.params.id);
  const deletedDaemon = daemons.filter(item => item.id != req.params.id);
  daemons = deletedDaemon;
  fs.writeFile("daemons.txt", JSON.stringify(daemons), function(err, result) {
    if(err) console.log('error', err);
  })
  return res.redirect('/');
});

module.exports = router;
