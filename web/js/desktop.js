/**
 *
 * Vars
 *
 */
var completedSinc = false;
var $code = $('#code');
var $secciones = $('section');
var $seccionSuccess = $('#success')
var $codeL = $('#codeL');
var $logRotate = $('#logRotate');
var socket = io.connect('http://localhost:80', {'forceTrue':true});

/**
 *
 * Functions
 *
 */
function makeSincCode(){
  var text = "";
  //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234567890123456789";
  var possible = "0123456789";
  for( var i=0; i < 5; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  localStorage.setItem("userCode",text);
  return text;
}

function crearCodigo() {
  //salvar codigo y sesion ID
  var userId = crearUserId();
  var userCode =  makeSincCode();
  $code.text(userCode);
  //registrar esta sesion en el socket
  var userIdent = {
    id: userId,
    code: userCode,
    origin: 'desk'
  }
  socket.emit("join-sinc", userIdent);
  return false;
}
function crearUserId() {
  var UID = localStorage.getItem("userId") || randomId();
  localStorage.setItem("userId",UID);
  return UID;
}
function randomId(){
  return Math.floor(Math.random() * 1e12);
}
function mostrarSucces(){
  $secciones.removeClass('active');
  setTimeout(function() {
    $seccionSuccess.addClass('active');
    completedSinc = true;
    //gato
  }, 300)
}

/**
 *
 * Behaivors
 *
 */
$(document).ready(function() {
  crearCodigo();
})
socket.on('session-created', function (data) {
  console.log('el socket creó una sesión');
  console.log(data);
});
socket.on('accede-sitio', function(data) {
  console.log('deberia acceder al sitio');
  if (!completedSinc) {
    $codeL.text(localStorage.getItem("userCode"));
    mostrarSucces();
  }
});

socket.on('rotate-mobil-listen', function() {
  console.log('rotacion detectada');
  if (completedSinc) {
    $logRotate.append('<p>Ha rotado el dispositivo.</p>');
  }
})



// socket.on('accede-sitio', function(){
//   //if (!$seccionSuccess.hasClass('active')) {
//     $seccionSuccess.addClass('full');
//   //}
// })