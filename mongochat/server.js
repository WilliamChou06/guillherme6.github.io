const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

mongo.connect('mongodb://127.0.0.1/mongochat', function(err, clientMongo){
    if(err){
        throw err;
    }

    console.log('MONGODB CONNECTED');

    client.on('connection', function(socket){

        let chat = clientMongo.db('mongochat').collection('chats');

        sendStatus = function(s){
            socket.emit('status', s);
        };

        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            socket.emit('output', res); 
        });

        socket.on('input', function(data){
            let user = data.username;
            let message= data.messages;

            if(user == '' || message == ''){
                sendStatus('Please enter a name and message')
            } else{
                chat.insert({username: user, message: message}, function(){
                    client.emit('output', [data]);

                    sendStatus = {
                        message: 'Message sent',
                        clear: true
                    }
                });
            }
        });
        
        socket.on('clear', function(data){
            chat.remove({}, function(){
                socket.emit('cleared');
            });
        });

    });
});