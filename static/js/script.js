/* Author: 

*/

$(document).ready(function() { 
   var chat = io.connect('http://localhost');

   chat.on('connect', function () {
     chat.emit('hi!');
   });
    
   $('#sender').bind('click', function() {
     chat.send("Message Sent on " + new Date());     
   });
   
   chat.on('message', function(data){
     $('#reciever').append('<li>' + data + '</li>');  
   });
      
 });






















