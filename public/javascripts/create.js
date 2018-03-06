$(document).ready(function() {
	$('#btn-delfile').hide();


	if (typeof(Storage) !== "undefined") {
		if (!localStorage.sessionToken) {
			window.location='/';
		}
	} else {
			// Sorry! No Web Storage support..
			alert("Sorry! No Web Storage support..");
	}

	$('#bt-nregistro').click(function(){
  });

	$('#bt-buscar').click(function(){
  });

	$('#bt-search').click(function (){
		window.location='/search';
	});

	$('#bt-logout').click(function(){
		localStorage.removeItem("sessionToken");
		window.location='/';
    });

	$('#bt-mov-logout').click(function(){
		localStorage.removeItem("sessionToken");
		window.location='/';
    });

		$('#btn-delfile').click(function(){
				$('#files').val('');
				$('#txt').val('');
				$('#btn-delfile').hide();
	  });

		$('#files').change(function(){
			$('#btn-delfile').show();
		});

});
