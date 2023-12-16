class chatEngine{
    constructor (chatBoxId,userEmail,userId){
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.userId=userId;


        this.socket=io.connect('http://54.196.87.115:5000')

        if (this.userEmail){
            this.connectionhandler();
        }

    }

    connectionhandler(){
        let self=this;
        this.socket.on('connect',function(){
            // console.log('Connection is eastablished using socket...')

            // make the connection with chatroom
            self.socket.emit('join_room',{
                userEmail:self.userEmail,
                chatRoom:'smartConnect'
            });

            self.socket.on('user_joined',function(data){
                // console.log('User joined : ',data)
            });
            
            // to emit the messages

             $('#send-button').click(function(){
                let msg=$('#input-message').val();
                if (msg!=''){
                    self.socket.emit('send_message',{
                        message:msg,
                        userEmail:self.userEmail,
                        chatRoom:'smartConnect'
                    })
                }
                $('#input-message').val('')
            });

            $('#input-message').keypress(function(e){
                if (e.which===13) {
                    let msg=$('#input-message').val();
                    if (msg!=''){
                        self.socket.emit('send_message',{
                            message:msg,
                            userEmail:self.userEmail,
                            chatRoom:'smartConnect'
                        })
                    }
                    $('#input-message').val('')
                    }
            });


            self.socket.on('receive_message',function(data){

                // console.log('Received Message : ',data)
                
                let newMeassge=document.createElement('div')
                let messageType='message other-message';
                let bubbleType='message-bubble-other'

                if (data.userEmail==self.userEmail){
                    messageType='message user-message';
                    bubbleType='message-bubble'
                };
                
                newMeassge.innerHTML=`<div class="avatar"><img src="\\uploads\\users\\avatars/avatar-1700146987024-299049559" alt="Notfound"></div>
                <div class="${bubbleType}">${data.message}</div>
                <div class="timestamp">10:35 AM</div>`

               
                newMeassge.setAttribute('class',messageType)

                $('#chat-box-messages').append(newMeassge)
            });

        })  
    }
}