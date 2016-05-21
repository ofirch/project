var express =require('express');
var router =express.Router();
var bodyParser=require('body-parser');
var mongoClient=require('mongodb').MongoClient;


var jsonParser=bodyParser.json();



router.get('/',function (req,res) {
    res.send('login');

});



router.post('/login',jsonParser,function (req,res) {
    mongoClient.connect("mongodb://localhost:27017/users",function (err,db) {
        if(err){
            res.status(400);
            res.end("error  connect mongodb");
        }
        try{
            var collection =db.collection('users');  // collection
            var json=JSON.parse(JSON.stringify(req.body));


            var getUserLogged=function (data) {
                if(data==null){
                    res.status(200);
                    console.log(" general error");
                }
                else if(data.response=="userNotFound"){
                    var userResponse=JSON.parse("{\"response\":\"notFound\"}");
                    res.json(userResponse);
                    res.end();
                }
                else{
                    var userResponse=JSON.parse("{\"response\":\"ok\"}");
                    res.json(userResponse);
                    res.end();
                }
            }
            userExiest(getUserLogged,json);


        }catch (ex){
            res.status(400);
            res.json(null);
            res.end();
        }
        db.close();
    })
});





router.post('/register',jsonParser,function (req,res) {
    mongoClient.connect("mongodb://localhost:27017/users",function (err,db) {
        if(err){
            res.status(400);
            res.end("error  connect mongodb");
        }
        try{
            var collection =db.collection('users');  // collection
            var json=JSON.parse(JSON.stringify(req.body));


            var getUser=function (data) {
                if(data==null){
                    res.status(200);
                    console.log(" genaral error");
                }
//if user not exist , insert the user to database and register
                else if(data.response=="userNotFound"){
                    insertUser(json);
                    var userResponse=JSON.parse("{\"response\":\"ok\"}");
                    res.json(userResponse);
                    res.end();
                }
//if user exist do not allow to register again
                else{
                    var userResponse=JSON.parse("{\"response\":\"exist\"}");
                    res.json(userResponse);
                    res.end();
                }
            }
            userExiest(getUser,json);


        }catch (ex){
            res.status(400);
            res.json(null);
            res.end();
        }
        db.close();
    })
});



router.post('/update',jsonParser,function (req,res) {
    mongoClient.connect("mongodb://localhost:27017/users",function (err,db) {
        if(err){
            res.status(400);
            res.end("error  connect mongodb");
        }
        try{
            var collection =db.collection('users');  // collection
            var json=JSON.parse(JSON.stringify(req.body));


            var getUserUpdate=function (data) {
                if(data==null){
                    res.status(200);
                    console.log(" general error");
                }
                else if(data.response=="userNotFound"){
                    var userResponse=JSON.parse("{\"response\":\"notFound\"}");
                    res.json(userResponse);
                    res.end();
                }
                else{
                    updateUser(json);
                    var userResponse=JSON.parse("{\"response\":\"ok\"}");
                    res.json(userResponse);
                    res.end();
                }
            }
            userExiest(getUserUpdate,json);


        }catch (ex){
            res.status(400);
            res.json(null);
            res.end();
        }
        db.close();
    })
});


router.post('/signalSend',jsonParser,function (req,res) {
    mongoClient.connect("mongodb://localhost:27017/users",function (err,db) {
        if(err){
            res.status(400);
            res.end("error  connect mongodb");
        }
        try{
            var collection =db.collection('users');  // collection
            var json=JSON.parse(JSON.stringify(req.body));


            var SignalS=function (data) {
                if(data==null){
                    res.status(200);
                    console.log(" general error");
                }
                else if(data.response=="userNotFound"){
                    var userResponse=JSON.parse("{\"response\":\"notFound\"}");
                    res.json(userResponse);
                    res.end();
                }
                else{
                    sendSignal(json);
                    var userResponse=JSON.parse("{\"response\":\"ok\"}");
                    res.json(userResponse);
                    res.end();
                }
            }
            userExiestSend(SignalS,json);



        }catch (ex){
            res.status(400);
            res.json(null);
            res.end();
        }
        db.close();
    })
});

router.post('/signalGet',jsonParser,function (req,res) {
    mongoClient.connect("mongodb://localhost:27017/users",function (err,db) {
        if(err){
            res.status(400);
            res.end("error  connect mongodb");
        }
        try{
            var collection =db.collection('users');  // collection
            var json=JSON.parse(JSON.stringify(req.body));


            var SignalG=function (data) {
                if(data==null){
                    res.status(200);
                    console.log(" general error");
                }
                else if(data.response=="userNotFound"){
                    var userResponse=JSON.parse("{\"response\":\"notFound\"}");
                    res.json(userResponse);
                    res.end();
                }
                else{
                    getSignal(json);
                    var userResponse=JSON.parse("{\"response\":\"ok\"}");
                    res.json(userResponse);
                    res.end();
                }
            }
            userExiestGet(SignalG,json);



        }catch (ex){
            res.status(400);
            res.json(null);
            res.end();
        }
        db.close();
    })
});


var userExiest= function (callback,json) {
    mongoClient.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) {
            callback(null);
        }
        var collection = db.collection('users');
        collection.find({"email": json.email}).toArray(function (err, items) {
            try {
                if (err) {
                    console.log("error serch user");
                    callback(null);
                }
                else if (items.length) {
                    var userId = JSON.stringify(items[0]);
                    var data = JSON.parse(userId);
                    callback(data);
                }
                else {
                    var str="{\"response\":\"userNotFound\"}";
                    var userResponse=JSON.parse(str);
                    callback(userResponse);
                }
            } catch (ex) {
                callback(null);
            }
            db.close();

        });
    });
}

var userExiestSend= function (callback,json) {
    mongoClient.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) {
            callback(null);
        }
        var collection = db.collection('users');
        collection.find({"myPhone": json.phone}).toArray(function (err, items) {
            try {
                if (err) {
                    console.log("error serch user");
                    callback(null);
                }
                else if (items.length) {
                    var userId = JSON.stringify(items[0]);
                    var data = JSON.parse(userId);
                    callback(data);
                }
                else {
                    var str="{\"response\":\"userNotFound\"}";
                    var userResponse=JSON.parse(str);
                    callback(userResponse);
                }
            } catch (ex) {
                callback(null);
            }
            db.close();

        });
    });
}


var userExiestGet= function (callback,json) {
    mongoClient.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) {
            callback(null);
        }
        var collection = db.collection('users');
        collection.find({"myPhone": json.myPhone}&&{"signal": "yes"}).toArray(function (err, items) {
            try {
                if (err) {
                    console.log("error serch user");
                    callback(null);
                }
                else if (items.length) {
                    var userId = JSON.stringify(items[0]);
                    var data = JSON.parse(userId);
                    callback(data);
                }
                else {
                    var str="{\"response\":\"userNotFound\"}";
                    var userResponse=JSON.parse(str);
                    callback(userResponse);
                }
            } catch (ex) {
                callback(null);
            }
            db.close();

        });
    });
}




var insertUser= function (json) {
    mongoClient.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) {
            callback(null);
        }
        var collection = db.collection('users');
        collection.insert(json);


        db.close();
    });
}



var updateUser= function (json) {
    mongoClient.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) {
            callback(null);
        }
        var collection = db.collection('users');
        collection.insert(json);
        collection.find({"email": json.email}).toArray(function (err, items) {

                if (err) {
                    console.log("error serch user");
                    callback(null);
                }
                else if (items.length) {

                    collection.remove(items[0]);
                }
        db.close();
    });
})

}

//update
var sendSignal= function (json) {
    mongoClient.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) {
            callback(null);
        }
        var collection = db.collection('users');
        collection.find({"myPhone": json.phone}).toArray(function (err, items) {

            if (err) {
                console.log("error serch user");
                callback(null);
            }
            else if (items.length) {
                collection.update(items[0],{$set : {"signal": "yes"}});
            }
            db.close();
        });
    })

}
//update
var getSignal= function (json) {
    mongoClient.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) {
            callback(null);
        }
        var collection = db.collection('users');
        collection.find({"myPhone": json.myPhone}, {"signal": "yes"}).toArray(function (err, items) {

            if (err) {
                console.log("error serch user");
                callback(null);
            }
            else if (items.length) {
                collection.update(items[0],{$set : {"signal": "no"}});
            }

            db.close();
        });
    })

}
    
  


module.exports=router;