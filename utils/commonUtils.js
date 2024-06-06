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

function change_data_format(inputDate) {
    // Create a Date object from the input string
    const dateObject = new Date(inputDate);
  
    // Check if the input date is valid
    if (isNaN(dateObject.getTime())) {
      return "Invalid Date";
    }
  
    // Get month in full name format
    const monthName = dateObject.toLocaleString('en-US', { month: 'short' });
  
    // Get year
    const year = dateObject.getFullYear();
  
    // Format the result
    const formattedDate = `${monthName} ${year}`;
  
    return formattedDate;
  }

  function change_date_format_to_year(inputDate){
    const dateObject = new Date(inputDate);
    if (isNaN(dateObject.getTime())) {
      return "Invalid Date";
    }
    const monthName = dateObject.toLocaleString('en-US', { month: 'short' });
    const year = dateObject.getFullYear();
    const formattedDate = `${year}`;
    return formattedDate;
  }

  function getRandomUniqueFiveDigitCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
  
    while (code.length < 5) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
  
      // Ensure the character is not already in the code
      if (!code.includes(randomChar)) {
        code += randomChar;
      }
    }
  
    return code;
  }

  function grouped_delivered_room_data(data){
    const groupedConversations=data.reduce((groups, conversation)=>{
      const key = `${conversation.room}_${conversation.user_id}`;
      if (!groups[key]) {
        groups[key] = {
          user_id: conversation.user_id,
          room: conversation.room,
          ids: []
        };
      }

      groups[key].ids.push(conversation.id);
      return groups;
    },{});
    const resultArray = Object.values(groupedConversations);
    return resultArray;
  }

module.exports={
    current_datetime,
    current_date,
    check_same_user_and_room_exist,
    createRoom,
    check_same_user_exist,
    change_data_format,
    getRandomUniqueFiveDigitCode,
    grouped_delivered_room_data,
    change_date_format_to_year
}