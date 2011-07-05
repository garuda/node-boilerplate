/* Author: 

*/

$(document).ready(function() { 
   var socket = io.connect();
   socket.on('chat', function (msg) {
     console.log(msg);
     $('#reciever').append('<li>' + msg + '</li>');  
   });
    
   $('#sender').bind('click', function() {
     socket.emit("chat", "Message Sent on " + new Date());     
   });

      
 });






















