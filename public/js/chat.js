// Make connection
let socket = io.connect('https://intense-tor-53215.herokuapp.com/');
// let socket = io.connect('http://localhost:3000/');

let alert = ()=>{
    $("#chat-window").animate({ scrollTop: $("#chat-window")[0].scrollHeight}, 1000)
    console.log('chat connected')
    return false;
}
alert();

let message = $('#message')
let handle = $('#handle');
let $btn = $('#sendIt');
let output = $('#output');
let feedback = $('#feedback');
// Emit events

$btn.on('click', function(){
    console.log('click')
    socket.emit('chat', {
        message: message.val(),
        handle: handle.html()
    });
    console.log('this'+message.val())
    message.val("");
});
message.on('keypress',function (e) {
    if (e.which == 13) {
        socket.emit('chat', {
            message: message.val(),
            handle: handle.html()
        });
        console.log('this'+message.val())
        message.val("");
      return false;    //<---- Add this line
    }
  });

socket.on('user image', image);

function image (from, base64Image) {
    $('#output').append($('<p>').append($('<b>').text(from),
        `<img src="${base64Image}"/>`));
}

message.on('keypress', function(){
    socket.emit('typing', handle.html());
    console.log('searching') 
})
// $(document).click(typing)
// let typing = () =>{
//     if (!message.val()){
//         socket.emit('typing', handle.html());
//     }
// }

// Listen for events
socket.on('chat', function(data){
    feedback.html('');
    output.html(output.html() + '<p class="p-message"><strong>' + data.handle + ': </strong>' + data.message + '</p>');
    console.log('chat function works')
    // $('#chat-window, #feedback').animate({scrollTop: $('#feedback').height()}, "slow");
    $("#chat-window").stop().animate({ scrollTop: $("#chat-window")[0].scrollHeight}, 1000)
});

socket.on('typing', function(data){
    if (!message.val('')){

        feedback.html('<p><em>' + data + ' is typing a message...</em></p>');
        console.log('typing function works' + data)
    }else{
        feedback.html('')
    }
    // $("#chat-window").animate({ scrollTop: $("#chat-window")[0].scrollHeight}, 1000)
});

socket.on('user image', image);
function image (from, base64Image) {
    $('#output').append($('<p>').append($('<b>').text(from),
        '<img src="' + base64Image + '"/>'));
}

// socket.on("image", function(info) {
//     if (info.image) {
//       var img = new Image();
//       img.src = 'data:image/jpeg;base64,' + image.buffer;
//       ctx.drawImage(img, 0, 0);
//     }
//   });
