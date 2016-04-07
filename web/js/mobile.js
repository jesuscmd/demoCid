/**
 *
 * Vars
 *
 */
 //var socket = io.connect('http://localhost:80', {'forceTrue':true});
 var socket = io.connect('http://192.168.2.1:80', {'forceTrue':true});
 socket.on('messages', function(data) {
 	console.info(data);
 });
 var userId = null;
 var userCode = '';

 /**
  *
  * Selectors
  *
  */
  $secciones = $('section');
  $seccionError = $('section.section-error');
  $seccionLoading = $('section.section-loader');
  $seccionSuccess = $('section.section-success')
  $msgError = $('#message-error');
  $form = $('form');
  $code = $('input#code');

 /**
 *
 * Functions
 *
 */
 function getCode(e) {
 	e.preventDefault();
 	userCode = $code.val();
 	mostrarLoader();
 	if (userCode.length >= 5 ) {
 		userId = randomId();
		//crear y persistir un codigo
		//avisa a socket
		var userIdent = {
			id: userId,
			code: userCode,
			origin: 'mb'
		}
		socket.emit("join-sinc", userIdent);
	} else {
		mostrarError('El código parece ser incorrecto.');
	}
}
function randomId(){
	return Math.floor(Math.random() * 1e12);
}
function mostrarError(msg, time) {
	if (!time) {
		time = 1800;
	}
	var msgText = msg || 'Ha ocurrido un error.';
	$msgError.text(msgText);
	
	setTimeout(function() {
		$secciones.removeClass('active');
		setTimeout(function() {
			$seccionError.addClass('active');
		},500)
	},1800)
}
function mostrarLoader() {
	$secciones.removeClass('active');
	$seccionLoading.addClass('active');
}
function mostrarSuccess() {
	setTimeout(function() {
		$secciones.removeClass('active');
		$seccionSuccess.addClass('active');
		if (window.matchMedia("(orientation: landscape)").matches) {
		  socket.emit("acceso-total", userCode);
		} else {
			// window.addEventListener("orientationchange", function() {
			// 	console.log('cambie');
			// 	socket.emit("rotate-mobil-emit", userCode);
			// 	socket.emit("acceso-total", userCode);
			// }, false);
		}
		window.addEventListener("orientationchange", function() {
			socket.emit("rotate-mobil-emit", userCode);
			socket.emit("acceso-total", userCode);
		}, false);
		// window.addEventListener("orientationchange", function() {
		// 	console.log('cambie');
		// 	socket.emit("rotate-mobil-emit", userCode);
		// 	socket.emit("accede-sitio", userCode);
		// }, false);
		//socket.emit("accede-sitio", localStorage.getItem("userCode"));
	}, 1800)
}
/**
 *
 * Actions
 *
 */

$form.on('submit', getCode);

socket.on('sinc-success', function(data) {
  console.info(data);
  console.log('dispositivo sincronizado');
  mostrarSuccess();
})


socket.on('accede-sitio', function(argument) {
  $seccionSuccess.addClass('full');
})

// function esperaRotacion() {
// 	console.log('espero rotacion');
// 	mostrarSuccess();
// 	console.log(userCode);
	
// }