$(document).ready(function() {

	if (typeof(Storage) !== "undefined") {
		if (localStorage.sessionToken) {
			window.location='/search?st='+localStorage.sessionToken;
		}
	} else {
			Materialize.toast('There is not support for LocalStorage', 3000, 'rounded');
	}

    $('#submit').click(function(){
			sessionToken = '';
			response = login($('#username').val(), $('#password').val());
			sessionToken = response.RequestedObject.SessionToken;
			if (sessionToken){
				 localStorage.sessionToken = sessionToken;
				 window.location= "/index?st="+sessionToken;
			}
    });
});

function login(username, password){
		var response = '';

		$.ajax({
				 type: "POST",
				 url: "/login",
				 async: false,
         data : {
           username : username,
           password : password
         },
				 success: function(data, textStatus, jqXHR) {
					 response = data;
					 if (!response.IsSuccessful){
             Materialize.toast('Ocurrio un problema:\n'+response.ValidationMessages[0].Reason, 3000, 'rounded');
           }
				},
				error: function(jqXHR, textStatus, errorThorwn) {
							console.log(jqXHR);
							console.log(('Ocurrio un error al llamar a la API: ' + textStatus));
							console.log(errorThorwn);
				}

		});

		return response
}
