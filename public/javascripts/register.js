$(document).ready(function() {
	$('#test4')[0].innerHTML=$('#test4')[0].innerHTML.replace(new RegExp('http://basedeconocimiento/', 'g'),'data:image/png;base64,').replace(new RegExp('<img ', 'g'),'<img class="responsive-img"');
	$('#test5')[0].innerHTML=$('#test5')[0].innerHTML.replace(new RegExp('http://basedeconocimiento/', 'g'),'data:image/png;base64,').replace(new RegExp('<img ', 'g'),'<img class="responsive-img"');
	$('#test6')[0].innerHTML=$('#test6')[0].innerHTML.replace(new RegExp('http://basedeconocimiento/', 'g'),'data:image/png;base64,').replace(new RegExp('<img ', 'g'),'<img class="responsive-img"');
	
	$('#f-editReg').submit(function(event){
		var form = $(this);
		form[0].querySelector('#sint').value = form[0].querySelector('#sint').value.replace(new RegExp('data:image/png;base64,', 'g'),'http://basedeconocimiento/');
		form[0].querySelector('#caus').value = form[0].querySelector('#caus').value.replace(new RegExp('data:image/png;base64,', 'g'),'http://basedeconocimiento/');
		form[0].querySelector('#solu').value = form[0].querySelector('#solu').value.replace(new RegExp('data:image/png;base64,', 'g'),'http://basedeconocimiento/');
		console.log(form);
	});

	$('#bt-exp').click(function (){
		window.location = '/export?st='+localStorage.sessionToken+'&id='+getParameterByName('id');
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
