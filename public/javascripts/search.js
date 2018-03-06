$(document).ready(function() {
	$('#div-tec').hide();
	$('#div-fab').hide();
	$('#table').hide();
	$('#bt-research').hide();

	if (typeof(Storage) !== "undefined") {
		if (!localStorage.sessionToken) {
			window.location='/';
		}
	} else {
			// Sorry! No Web Storage support..
			alert("Sorry! No Web Storage support..");
	}

	$('#check').click(function(){
		if($('#check')[0].checked){
			$('#div-tec').show();
		} else{
			$('#div-tec').hide();
		}
	});

	$('#check2').click(function(){
		if($('#check2')[0].checked){
			$('#div-fab').show();
		} else{
			$('#div-fab').hide();
		}
	});

	$('#bt-research').click(function(){
		$('#table').hide();
		$('#f-buscar').show();
		$('bt-research').hide();

    });

	$('#bt-buscar').click(function(){
		$('#table').show();
		$('bt-research').show();
  });

	$('#bt-logout').click(function(){
		localStorage.removeItem("sessionToken");
		window.location='/';
    });

	$('#bt-mov-logout').click(function(){
		localStorage.removeItem("sessionToken");
		window.location='/';
  });

});
