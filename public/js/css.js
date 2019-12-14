let $colorScheme = $('.color-schema')






let orange = () => {
    $('body').css('background-color', '#d84315')
    $('.nav-wrapper').css('background-color', '#ff5722')
    $('#chat-window').css('background-color', '#ff6e40')
    $('#chat-window').css('color', '#37474f')
    $('#big-window').css('background-color', '#bf360c')
    $('.page-footer').css('background-color', '#bf360c')
}

let dark = () => {
    // console.log('working')
    $('body').css('background-color', '#767473')
    $('.nav-wrapper').css('background-color', '#252525')
    $('#chat-window').css('background-color', '#585757')
    $('#chat-window').css('color', '#cacaca')
    $('#big-window').css('background-color', '#424242')
    $('.page-footer').css('background-color', '#37474f')
}
let light = () => {
    // console.log('working')
    $('body').css('background-color', '#d4e1e4')
    $('.nav-wrapper').css('background-color', '#65b8c7')
    $('#chat-window').css('background-color', '#d4f4ff')
    $('#chat-window').css('color', '#314148')
    $('#big-window').css('background-color', '#88abbd')
    $('.page-footer').css('background-color', '#0d47a1')
}
let purple = () => {
    // console.log('working')
    $('body').css('background-color', '#b388ff')
    $('.nav-wrapper').css('background-color', '#9575cd')
    $('#chat-window').css('background-color', '#ede7f6')
    $('#chat-window').css('color', '#37474f')
    // $('.p-message').css('background-color', '#9575cd ')
    $('#big-window').css('background-color', '#673ab7')
    $('.page-footer').css('background-color', '#9575cd')
}
let red = () => {
    // console.log('working')
    $('body').css('background-color', '#757575')
    $('.nav-wrapper').css('background-color', '#b71c1c')
    $('#chat-window').css('background-color', '#c62828')
    $('#chat-window').css('color', '#212121')
    // $('.p-message').css('background-color', '#bdbdbd')
    $('#big-window').css('background-color', '#424242')
    $('.page-footer').css('background-color', '#e0e0e0')
}
let yellow = () => {
    // console.log('working')
    $('body').css('background-color', '#fdd835')
    $('.nav-wrapper').css('background-color', '#00b0ff')
    $('#chat-window').css('background-color', '#039be5')
    $('#chat-window').css('color', '#212121')
    // $('.p-message').css('background-color', '#ffee58')
    $('#big-window').css('background-color', '#fbc02d')
    $('.page-footer').css('background-color', '#81d4fa')
}
let green = () => {
    // console.log('working')
    $('body').css('background-color', '#c5e1a5')
    $('.nav-wrapper').css('background-color', '#33691e')
    $('#chat-window').css('background-color', '#9ccc65')
    $('#chat-window').css('color', '#212121')
    // $('.p-message').css('background-color', '#7cb342')
    $('#big-window').css('background-color', '#558b2f')
    $('.page-footer').css('background-color', '#558b2f')
}



// $("body").click(dark)
$('.color-buttons').on('click', function () {
    let color = $(this).attr('data-color')
    console.log(color)
    switch (color) {
        case "orange":
            orange()
            break;
        case "dark":
            dark()
            break;
        case "light":
            light()
            break;
        case "purple":
            purple()
            break;
        case "red":
            red()
            break;
        case "yellow":
            yellow()
            break;
        case "green":
            green()
            break;
    }
})

// switch(color){
//     case "default":
//         original()
//         break;
//     case "dark":
//         dark()
//         break;
//     case "light":
//         light()
//         break;
// }