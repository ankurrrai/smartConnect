module.exports.chatSocket=function(chatServer){
    
    let io=require('socket.io')(chatServer);

    io.sockets.on('connection',function(socket){
        console.log('new connection received ',socket.id);
        socket.on('disconnect',function(){
            console.log('Server discoonected');
        });

        socket.on('join_room',function(data){
            // console.log('Joining request recevied : ',data);
            socket.join(data.chatRoom);

            io.in(data.chatRoom).emit('user_joined',data);
        });
        
        socket.on('send_message',function(data){
            io.in(data.chatRoom).emit('receive_message',data);
        });

    });
    
}