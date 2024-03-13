const env=require('dotenv').config();
const db=require('./models/config/db_connection');
db.sequelize.sync();
const express=require('express');
const app= express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const io=require('socket.io')(server,{
    cors: {
      origin: "*",
      methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["secretHeader"],
      credentials: true
    }
  });
console.log(process.env.PORT)
const port=process.env.PORT || 3000;
const roomController=require('./controllers/roomController');
const messageController=require('./controllers/messageController');
const utils=require('./utils/commonUtils');
const router=require('./Router/router');

app.use(express.json());
app.use(bodyParser.json({ limit: '200mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(router);
app.use('/uploads', express.static('uploads'));
app.get('/',function(req,res){
    //console.log('express route called')
    //res.write('Welcome to Job portal')
    res.sendFile(__dirname+'/public/index.html')
    //res.end()
})

server.listen(port);

io.sockets.on('connection',async function(socket){
    try{
        console.log(socket.id)
        console.log('socket io connection successfull');

        socket.on('room',async function(data){
            //input - {"user_id":"1","receiver_id":"2"}
            try{
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var receiver_id=data.receiver_id ? data.receiver_id : '';
                    var socket_id=socket.id;
                    if(user_id!='' && receiver_id!=''){
                        var room=await roomController.joinRoom(user_id,receiver_id,socket_id);
                        socket.join(room);
                        socket.join(room+'_'+user_id)
                        console.log('user unique room ',room+user_id);
                        io.sockets.in(room).emit('room',{status: true,statuscode: 200,message: 'success',room: room});
                        //emit online user status 
                        var room_user_online_status=await roomController.userOnlineStatusResponse(receiver_id);
                        // console.log(room_user_online_status)
                        // console.log(typeof(room+'_'+user_id))
                        // console.log(io.sockets.adapter.rooms)
                        // console.log(socket.id)
                        io.sockets.in(room+'_'+user_id).emit('online_user',room_user_online_status);
                        console.log('yes')
                    }else{
                        io.sockets.in(socket.id).emit('room',{status: false, statuscode: 200, message: 'Data is missing',room: ''});
                    }
                }else{
                    io.sockets.in(socket.id).emit('room',{status: false, statuscode: 200, message: 'Input data is not valid',room:''});
                }
            }catch(e){
                console.error('Error in room joining',e)
            }
        });

        socket.on('message',async function(data){
            try{
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var receiver_id=data.receiver_id ? data.receiver_id : '';
                    var message=data.message ? data.message : '';
                    var message_type=data.message_type ? data.message_type : '';
                    var optional_text=data.optional_text ? data.optional_text : '';
                    var duration=data.duration ? data.duration : 0;
                    var thumbnail=data.thumbnail ? data.thumbnail : '';
                    //replay 
                    var message_id=data.message_id ? data.message_id : 0;
                    var room=await roomController.createRoom(user_id,receiver_id);
                    var room_type=data.room_type ? data.room_type : 0;
                    var limit=data.limit ? data.limit : 1;
                    var page_number=data.page_number ? data.page_number : 0;
                    var last_message_id=data.last_message_id ? data.last_message_id : '';
                    var file_size=data.file_size ? data.file_size : '';
                    //console.log('page number ',page_number)
                    //default value limit=1, page_number=0
                    if(user_id!='' && receiver_id!='' && message!='' && message_type!='' && room!=''){
                        var sendMessage=await messageController.sendMessage(user_id,receiver_id,room,room_type,message,message_type,optional_text,duration,thumbnail,message_id,file_size);
                        
                        console.log('send message response data ',sendMessage, sendMessage[0],sendMessage[1]);
    
                        if(sendMessage[0]>0){
                            //send response to user
                            //SELECT chat_list.id,chat_list.senter_id,chat_list.receiver_id,chat_list.room, if(chat_list.senter_id=1,'sent','receive') as type FROM `chat_list` where chat_list.room='12';
                            var sender_roomChatMessage=await messageController.roomChatMessage(user_id,receiver_id,room,limit,last_message_id);
                            io.sockets.in(room+'_'+user_id).emit('message',sender_roomChatMessage);
                            var sender_chat_list=await messageController.chatListResponseWithoutToken(user_id);
                            io.sockets.in(user_id).emit('chat_list',sender_chat_list);
                            //send response to receiver
                            console.log(sendMessage[1])
                            if(sendMessage[1]==false){
                                var receiver_roomChatMessage=await messageController.roomChatMessage(receiver_id,user_id,room,limit,last_message_id);
                                io.sockets.in(room+'_'+receiver_id).emit('message',receiver_roomChatMessage);
                                var receiver_chat_list=await messageController.chatListResponseWithoutToken(receiver_id);
                                io.sockets.in(receiver_id).emit('chat_list',receiver_chat_list);
                            }
                        }
    
                    }else{
                        io.sockets.in(socket.id).emit('message',{status: false, statuscode: 200, message: 'Data is missing',data: []});
                    }
                }else{
                    io.sockets.in(socket.id).emit('message',{status: false, statuscode: 200, message: 'Input data is not valid',data: []});
                }
            }catch(e){
                console.error('Error in message sending ',e)
            }
        });

        socket.on('room_chat_list',async function(data){
            try{
                //input-{"user_id":"1","receiver_id":"2","limit":"","last_message_id":""} -- get full data
                //input-{"user_id":"1","receiver_id":"2","limit":"10","last_message_id":"0"}-- initial pagination data
                //input-{"user_id":"1","receiver_id":"2","limit":"10","last_message_id":"133"}
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var receiver_id=data.receiver_id ? data.receiver_id : '';
                    var limit=data.limit ? data.limit : 0;
                    var last_message_id=data.last_message_id ? data.last_message_id : '';
                    console.log(socket.id)
                    if(user_id!='' && receiver_id!=''){
                        var room=await roomController.createRoom(user_id,receiver_id);
                        //update user online status;
                        var update_user_online_status=await roomController.makeOnlineUser(user_id,socket.id);
                        //emit room mesages to user
                        var room_messages=await messageController.roomChatMessage(user_id,receiver_id,room,limit,last_message_id);
                        //console.log(room_messages);
                        io.sockets.in(room+'_'+user_id).emit('message',room_messages);
                    }else{
                        io.sockets.in(socket.id).emit('message',{status: false, statuscode: 200, message: 'Data is missing',data: []}); 
                    }
                }else{
                    io.sockets.in(socket.id).emit('message',{status: false, statuscode: 200, message: 'Input data is not valid',data: []});
                }
            }catch(e){
                console.error('Error in message sending ',e);
            }
        });

        socket.on('chat_list', async function(data){
            try{
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var access_token=data.access_token ? data.access_token : '';
                    if(user_id!='' && access_token!=''){
                        socket.join(user_id);
                        //update user online status
                        var update_user_online_status=await roomController.makeOnlineUser(user_id,socket.id);
                        //get user's room data
                        var user_room_data=await roomController.userRoomData(user_id)
                        console.log('user room data ',user_room_data);
                        var room_user_online_status=await roomController.userOnlineStatusResponse(user_id);
                        //console.log(room_user_online_status)
                        for(var i=0; i<user_room_data.length; i++){
                            //emit online user status 
                            io.sockets.in(user_room_data[i].room+'_'+user_room_data[i].user_id).emit('online_user',room_user_online_status);
                        }
                        var chat_list=await messageController.chatListResponse(user_id,access_token);
                        console.log('chat list ',chat_list)
                        io.sockets.in(user_id).emit('chat_list',chat_list);
                    }else{
                        io.sockets.in(socket.id).emit('chat_list',{status: false, statuscode: 200, message: 'Data is empty',data: []});
                    }
                }else{
                    io.sockets.in(socket.id).emit('chat_list',{status: false, statuscode: 200, message: 'Input data is not valid',data: []});
                }
            }catch(e){
                console.error('Error in chat list ',e);
            }
        });

        socket.on("user_disconnect", async function(data) {
            try{
                console.log(data,socket.id); 
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    if(user_id!=''){
                        var disconnect_user=await roomController.disconnectUser(user_id);
                        var room_user_offline_status=await roomController.userOnlineStatusResponse(user_id);
                        console.log(room_user_offline_status)
                        for(var i=0; i<disconnect_user.length; i++){
                            //console.log('users: ',disconnect_user[i].user_id);
                            //emit online user status 
                            io.sockets.in(disconnect_user[i].room+'_'+disconnect_user[i].user_id).emit('online_user',room_user_offline_status);
                        }
                        io.sockets.in(socket.id).emit('user_disconnect',{status: true, statuscode: 200, message: 'success'});  
                    }else{
                        io.sockets.in(socket.id).emit('user_disconnect',{status: false, statuscode: 200, message: 'Data is empty'});  
                    }
                }else{
                    io.sockets.in(socket.id).emit('user_disconnect',{status: false, statuscode: 200, message: 'Input data is not valid'});  
                }
            }catch(e){
                console.error('Error in user disconnect ',e);
            }
        });

        socket.on("typing",async function(data){
            try{
                if(typeof(data)=='object'){
                   console.log('typing') 
                   var user_id=data.user_id ? data.user_id : '';
                   var receiver_id=data.receiver_id ? data.receiver_id : '';
                   var status=data.status ? data.status : '';
                   var room=await roomController.createRoom(user_id,receiver_id);
                   console.log(room)
                   if(user_id!='' && receiver_id!='' && room!='' && status!=''){
                    // io.sockets.in(room).emit('typing_room',{status: true, statuscode: 200, message: 'success',user_id: user_id,status: status});
                    // io.sockets.in(room).emit('typing_chat_list',{status: true, statuscode: 200, message: 'success',user_id: user_id,status: status});
                    var response=await roomController.typingResponse(user_id,status);
                    console.log(response);
                    if(response.length>0){
                        var room_response=response[0];
                        var chat_list_response=response[1];
                        io.sockets.in(room).emit('typing_room',room_response);
                        io.sockets.in(receiver_id).emit('typing_chat_list',chat_list_response);
                    }
                   }else{
                    io.sockets.in(socket.id).emit('typing_room',{status: false, statuscode: 200, message: 'Data is empty',user_id: "",status: ""});
                   }
                }else{
                    io.sockets.in(socket.id).emit('typing_room',{status: false, statuscode: 200, message: 'Input data is not valid',user_id: "",status: ""});
                }
            }catch(e){
                console.error('Error in typing ',e);
            }
        });

        socket.on("message_delivered",async function(data){
            try{
                //input--{"user_id":"2","access_token":"2"}
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var access_token=data.access_token ? data.access_token : '';
                    if(user_id!='' && access_token!=''){
                        var update_message_delivered= await messageController.messageDelivered(user_id,access_token);
                        //console.log('response',update_message_delivered)
                        io.sockets.in(socket.id).emit('message_delivered',update_message_delivered[0])
                        var emit_data=update_message_delivered[1];
                        //console.log(emit_data)
                        if(emit_data.length>0){
                            for(var i=0; i<emit_data.length; i++){
                                //emit to delivered_listener
                                var delivered_listner_response={
                                    status: true,
                                    status_code: 200,
                                    message: "success",
                                    room: emit_data[i].room.toString(),
                                    ids: emit_data[i].ids
                                }
                                //console.log(delivered_listner_response)
                                io.sockets.in(emit_data[i].room+'_'+emit_data[i].user_id).emit('delivered_room_listener',delivered_listner_response);
                                io.sockets.in(emit_data[i].user_id.toString()).emit('delivered_chat_list_listener',delivered_listner_response);
                                var chat_list=await messageController.chatListResponseWithoutToken(emit_data[i].user_id);
                                io.sockets.in(emit_data[i].user_id.toString()).emit('chat_list',chat_list);
                            } 
                        }
                        // if(emit_data.length>0){
                        //     for(var i=0; i<emit_data.length; i++){
                        //         //emit to senter room and chat list
                        //         //to emit all messages
                        //         if(user_id!=emit_data[i].user_id){
                        //             var room_chat_list=await messageController.roomChatMessage(emit_data[i].user_id,user_id,emit_data[i].room,0,'');
                        //             //console.log('room response',room_chat_list);
                        //             io.sockets.in(emit_data[i].room+'_'+emit_data[i].user_id).emit('message',room_chat_list);
                        //             console.log(typeof emit_data[i].user_id)
                        //             var chat_list=await messageController.chatListResponseWithoutToken(emit_data[i].user_id);
                        //             io.sockets.in(emit_data[i].user_id.toString()).emit('chat_list',chat_list);
                        //         }
                        //     }
                        // }
                    }else{
                        io.sockets.in(socket.id).emit('message_delivered',{status: false, statuscode: 200, message: 'Data is empty'});   
                    }
                }else{
                    io.sockets.in(socket.id).emit('message_delivered',{status: false, statuscode: 200, message: 'Input data is not valid'});  
                }
            }catch(e){
                console.error('Error in message delivered',e);
            }
        });

        socket.on("read",async function(data){
            try{
                //input--{"user_id":"2","receiver_id":"1"}
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var receiver_id=data.receiver_id ? data.receiver_id : '';
                    var room=await roomController.createRoom(user_id,receiver_id);
                    if(user_id!='' && receiver_id!='' && room!=''){
                        var update_message_read=await messageController.messageRead(user_id,room);
                        var read_ids=update_message_read.ids;
                        console.log('read ids',read_ids)
                        delete update_message_read.ids;
                        io.sockets.in(socket.id).emit('read',update_message_read); 
                        if(update_message_read.status){
                            //emit room_chat and chat_list to the receiver
                            //var room_chat_list=await messageController.roomChatMessage(receiver_id,user_id,room,0,'');
                            var read_lister_response={
                                status: true,
                                statuscode: 200,
                                message: "success",
                                ids: read_ids
                            }
                            io.sockets.in(room+'_'+receiver_id).emit('read_listener',read_lister_response);
                            var chat_list=await messageController.chatListResponseWithoutToken(receiver_id);
                            //console.log(typeof receiver_id)
                            io.sockets.in(receiver_id).emit('chat_list',chat_list);
                            var user_chat_list=await messageController.chatListResponseWithoutToken(user_id);
                            io.sockets.in(user_id).emit('chat_list',user_chat_list);
                        }
                    }else{
                        io.sockets.in(socket.id).emit('read',{status: false, statuscode: 200, message: 'Data is empty'});   
                    }
                }else{
                    io.sockets.in(socket.id).emit('read',{status: false, statuscode: 200, message: 'Input data is not valid'});  
                }
            }catch(e){
                console.error('Error in read function',e);
            }
        });

        socket.on("search_room_message",async function(data){
            try{
                //input--{"user_id":"2","receiver_id":"1","search":"hello"}
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var receiver_id=data.receiver_id ? data.receiver_id : '';
                    var search=data.search ? data.search : '';
                    var room=await roomController.createRoom(user_id,receiver_id);
                    if(user_id!='' && receiver_id!='' && room!='' && search!=''){
                        var search_room_message=await messageController.searchRoomMessage(user_id,receiver_id,room,search);
                        io.sockets.in(room+'_'+user_id).emit('search_room_message',search_room_message);
                    }else{
                        io.sockets.in(socket.id).emit('search_room_message',{status: false, statuscode: 200, message: 'Data is empty',data: {}});  
                    }
                }else{
                    io.sockets.in(socket.id).emit('search_room_message',{status: false, statuscode: 200, message: 'Input data is not valid',data: {}}); 
                }
            }catch(e){
                console.error('Error in search room messages',e);
            }
        });

        socket.on("search_chat_list",async function(data){
            try{
                //input--{"user_id":"2","access_token":"1","search":"hello"}
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var access_token=data.access_token ? data.access_token : '';
                    var search=data.search ? data.search : '';
                    if(user_id!='' && access_token!=''){
                        var search_chat_list=await messageController.searchChatList(user_id,access_token,search);
                        io.sockets.in(socket.id).emit('search_chat_list',search_chat_list);
                    }else{
                        io.sockets.in(socket.id).emit('search_chat_list',{status: false, statuscode: 200, message: 'Data is empty',data: {}});
                    }
                }else{
                    io.sockets.in(socket.id).emit('search_chat_list',{status: false, statuscode: 200, message: 'Input data is not valid',data: {}}); 
                }
            }catch(e){
                console.error('Error in search room messages',e);
            }
        });

        socket.on("report_chat",async function(data){
            try{
                if(typeof(data)=='object'){
                    //{"user_id":"1","access_token":"1","receiver_id":"2"}
                    var user_id=data.user_id ? data.user_id : '';
                    var receiver_id=data.receiver_id ? data.receiver_id : '';
                    var access_token=data.access_token ? data.access_token : '';
                    var room=await roomController.createRoom(user_id,receiver_id);
                    if(user_id!='' && access_token!='' && receiver_id!='' && room!=''){
                        var report_chat=await roomController.reportChat(user_id,access_token,receiver_id,room);
                        io.sockets.in(socket.id).emit('report_chat',report_chat);
                    }else{
                        io.sockets.in(socket.id).emit('report_chat',{status: false, statuscode: 200, message: 'Data is empty'});
                    }
                }else{
                    io.sockets.in(socket.id).emit('report_chat',{status: false, statuscode: 200, message: 'Input data is not valid'});  
                }
            }catch(e){
                console.error('Error in report chat',e);
            }
        });

        socket.on("test_changes",async function(data){
            try{
                io.sockets.in(socket.id).emit('test_changes',{status:true, statuscode:200, message: "last changes affected on 13-03-2024"});
            }catch(e){
                console.error('Error in test change',e)
            }
        });

        socket.on('block',async function(data){
            try{
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var receiver_id=data.receiver_id ? data.receiver_id : ''; 
                    var accessToken=data.access_token ? data.access_token : ''; 
                    if(user_id!='' && receiver_id!=''){
                        var room=await roomController.createRoom(user_id,receiver_id);
                        var check_user_data=await roomController.checkUserData(user_id,accessToken);
                        // console.log(check_user_data);
                        if(check_user_data==true){
                            let check_user_already_blocked=await roomController.check_user_already_blocked(data.user_id,data.receiver_id);
                            if(check_user_already_blocked.length>0){
                                io.sockets.in(socket.id).emit('block',{status: true,statuscode: 200,message: 'User already blocked',room: room});
                            }else{
                                let datetime=utils.current_datetime()
                                //console.log(datetime);
                                let save_block_data=await roomController.block_user_chat(data.user_id,data.receiver_id,room,datetime);
                                if(save_block_data==true){
                                    // console.log('hlo',save_block_data)
                                    let message='block';
                                    let message_type='notification';
                                    let room_type=0;
                                    let senter_id=data.user_id;
                                    let receiver_id=data.receiver_id;
                                    let created_datetime=datetime;
                                    let group_status=[];
                                    group_status.push({
                                        user_id: data.user_id,
                                        datetime: datetime,
                                        delivered_status: 1,
                                        delivered_datetime: datetime,
                                        read_status: 1,
                                        read_datetime: datetime,
                                        status: 1
                                    });
                                    //save block message in chat_list
                                    let save_block_message=await roomController.save_block_message(message,message_type,room,room_type,senter_id,receiver_id,created_datetime,JSON.stringify(group_status));                                    console.log(save_block_message)
                                    // console.log(save_block_message)
                                    if(save_block_message>0){
                                        // console.log('Data saved to chat list')
                                        io.sockets.in(socket.id).emit('block',{status: true,statuscode: 200,message: 'Blocked',room: room});
                                        //emit messages to user
                                        var sender_roomChatMessage=await messageController.roomChatMessage(user_id,receiver_id,room,1,'');
                                        io.sockets.in(room+'_'+user_id).emit('message',sender_roomChatMessage);
                                        var sender_chat_list=await messageController.chatListResponseWithoutToken(user_id);
                                        io.sockets.in(user_id).emit('chat_list',sender_chat_list);
                                    }else{
                                        // console.error('Data not saved to chat list')
                                        io.sockets.in(socket.id).emit('block',{status: false,statuscode: 200,message: 'Data not saved to chat list',room: room});
                                    }
                                    // io.sockets.in(socket.id).emit('block',{status: true,statuscode: 200,message: 'success',room: room});   
                                }else{
                                    io.sockets.in(socket.id).emit('block',{status: false,statuscode: 200,message: 'Not Blocked',room: room}); 
                                }
                            }
                        }else{
                            io.sockets.in(socket.id).emit('block',{status: false,statuscode: 200,message: 'Invalid user',room: room});
                        }  
                    }else{
                        io.sockets.in(socket.id).emit('room',{status: false, statuscode: 200, message: 'Data is missing',room: ''});
                    }
                }else{
                    io.sockets.in(socket.id).emit('message',{status: false, statuscode: 200, message: 'Input data is not valid',room: ''});
                }
            }catch(e){
                console.error('Error in message sending ',e)
            }
        });

        socket.on('unblock',async function(data){
            try{
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var access_token=data.access_token ? data.access_token : '';
                    var receiver_id=data.receiver_id ? data.receiver_id : '';
                    if(user_id!='' && access_token!='' && receiver_id!=''){
                        var room=await roomController.createRoom(user_id,receiver_id);
                        //unblock chat list
                        var unblock_user_chat=await roomController.unblockUserChat(user_id,access_token,receiver_id,room);
                        io.sockets.in(socket.id).emit('unblock',unblock_user_chat);
                        //emit message and chat_list
                        console.log(Object.keys(unblock_user_chat).length);
                        if(Object.keys(unblock_user_chat).length>0){
                            console.log(unblock_user_chat.status)
                            if(unblock_user_chat.status){
                                var sender_roomChatMessage=await messageController.roomChatMessage(user_id,receiver_id,room,1,'');
                                io.sockets.in(room+'_'+user_id).emit('message',sender_roomChatMessage);
                                var sender_chat_list=await messageController.chatListResponseWithoutToken(user_id);
                                io.sockets.in(user_id).emit('chat_list',sender_chat_list);
                            }
                        }
                    }else{
                        io.sockets.in(socket.id).emit('unblock',{status: false, statuscode: 200, message: 'Data is empty',room: ''});
                    }
                }else{
                    io.sockets.in(socket.id).emit('unblock',{status: false, statuscode: 200, message: 'Input data is not valid',room: ''});
                }
            }catch(e){
                console.error('Error in unblock chat list', e);
            }
        });

        socket.on('replay_message',async function(data){
            try{

            }catch(e){
                console.error('Error in replay message', e);
            }
        });

        socket.on('forward_message',async function(data){
            try{
                if(typeof(data)=='object'){
                    var user_id=data.user_id ? data.user_id : '';
                    var to_users=data.to_users ? data.to_users : '';
                    var message_ids=data.message_ids ? data.message_ids : '';
                    if(user_id!='' && to_users!='' && message_ids!=''){
                        var save_forward_message=await messageController.forwardMessages(user_id,to_users,message_ids);
                        console.log('result ',save_forward_message)
                        if(save_forward_message.status){
                            var emit_users=save_forward_message.emit_users;
                            console.log(emit_users)
                            for(var i=0; i<emit_users.length; i++){
                                var receiver_room_messages=await messageController.roomChatMessage(emit_users[i].user_id,user_id,emit_users[i].room,emit_users[i].message_count,0);
                                //console.log(receiver_room_messages);
                                io.sockets.in(emit_users[i].room+'_'+emit_users[i].user_id).emit('message',receiver_room_messages);
                                var receiver_chat_list=await messageController.chatListResponseWithoutToken(emit_users[i].user_id);
                                io.sockets.in(emit_users[i].user_id).emit('chat_list',receiver_chat_list);
                                //send message to sender room
                                var sender_room_messages=await messageController.roomChatMessage(user_id,emit_users[i].user_id,emit_users[i].room,emit_users[i].message_count,0);
                                io.sockets.in(emit_users[i].room+'_'+user_id).emit('message',sender_room_messages);
                                console.log(emit_users[i].room+'_'+user_id)
                            }
                            //send sender chat list
                            var sender_chat_list=await messageController.chatListResponseWithoutToken(user_id);
                            io.sockets.in(user_id).emit('chat_list',sender_chat_list);
                            delete save_forward_message.emit_users;
                            delete save_forward_message.message_count;
                            io.sockets.in(socket.id).emit('forward_message',save_forward_message);
                        }else{
                            io.sockets.in(socket.id).emit('forward_message',save_forward_message); 
                        }
                    }else{
                        io.sockets.in(socket.id).emit('forward_message',{status: false, statuscode: 200, message: 'Data is empty'}); 
                    }
                }else{
                    io.sockets.in(socket.id).emit('forward_message',{status: false, statuscode: 200, message: 'Input data is not valid'});
                }
            }catch(e){
                console.error('Error in forward message');
            }
        });

    }catch(error){
        console.error('socket io is not connected ',error)
    }
})



