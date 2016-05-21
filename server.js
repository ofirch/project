var express =require('express');


var app =express();


var login = require('./login');

app.use('/login', login);
var server =app.listen(8888,function () {
    var host =server.address().address
    var port =server.address().port

    console.log("listen.....",host,port)
});





