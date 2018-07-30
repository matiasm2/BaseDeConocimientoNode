$(document).ready(function() {

	$('#bt-exp').click(function (){
		window.location='/pdf?st='+localStorage.sessionToken+'&id='+getParameterByName('id');
		}); 
	$('#f-editReg').hide();

	if (typeof(Storage) !== "undefined") {
		if (!localStorage.sessionToken) {
			window.location='/';
		} else{
		}
	} else {
			// Sorry! No Web Storage support..
			alert("Ha ocurrido un error al intentar utilizar SessionStorage");
	}

	if (getParameterByName("id")){
		$('#bt-edit').click(function(){
			$('#c-detalle').hide();
			$('#f-editReg').show();

		});

		$('#bt-editar').click(function(){
		});

		$('#bt-cancelar').click(function(){
			$('#c-detalle').show();
			$('#f-editReg').hide();
		});
	}

	$('#bt-logout').click(function(){
		localStorage.removeItem("sessionToken");
		window.location='/';
		$('#login').show();
		$('#bt-logout').hide()
  });

	$('#bt-mov-logout').click(function(){
		localStorage.removeItem("sessionToken");
		window.location='/';
  });

	$('#bt-search').click(function (){
		window.location='/search';
	});
});

function getParameterByName(name) {
 return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
