$(document).ready(function() {

	if (typeof(Storage) !== "undefined") {
		if (localStorage.sessionToken) {
			window.location='/search';
		}
	} else {
		alert('There is not support for LocalStorage');
	}

    $('#submit').click(function(){
			sessionToken = '';
			response = login($('#username').val(), $('#password').val());
			sessionToken = response.RequestedObject.SessionToken;
			if (sessionToken){
				 localStorage.sessionToken = sessionToken;
				 window.location= "/search"
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
					 response = JSON.parse(data);
					 if (!response.IsSuccessful){
             alert(response.ValidationMessages);
           }
				},
				error: function(jqXHR, textStatus, errorThorwn) {
							console.log(jqXHR);
							console.log(('Ocurrio un error al llamar a la API: ' + textStatus));
							console.log(errorThorwn);
				}

		});

		return response;
}
