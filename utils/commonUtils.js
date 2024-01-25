function  current_datetime() {
    var current_date = new Date();
    var date = current_date.toISOString().slice(0, 10);
    var hours = current_date.getHours();
    var minute = current_date.getMinutes();
    var second = current_date.getSeconds();
    var hr_str = "" + hours;
    var min_str = "" + minute;
    var sec_str = "" + second;
    var pad = "00"
    var hr = pad.substring(0, pad.length - hr_str.length) + hr_str;
    var min = pad.substring(0, pad.length - min_str.length) + min_str;
    var sec = pad.substring(0, pad.length - sec_str.length) + sec_str;
    var time = hr + ":" + min + ":" + sec;
    var datetime = date + " " + time;
    return datetime;
}

function current_date(){
    var current_date=new Date();
    var date=current_date.toISOString().slice(0,10);
    return date;
}

function check_same_user_and_room_exist(user_id,room,arr_data){
    return arr_data.some(function(arr){
        return arr.user_id==user_id && arr.room==room;
    });
}

function createRoom(user_id,receiver_id){
    var user_id=Number(user_id);
    var receiver_id=Number(receiver_id);
    var room='';
    if(user_id<receiver_id){
        room=user_id.toString()+receiver_id.toString();
    }else{
        room=receiver_id.toString()+user_id.toString();
    }
    return room;
}

function check_same_user_exist(user_id,arr_data){
    return arr_data.some(function(arr){
        return arr.user_id==user_id;
    });
}

module.exports={
    current_datetime,
    current_date,
    check_same_user_and_room_exist,
    createRoom,
    check_same_user_exist
}