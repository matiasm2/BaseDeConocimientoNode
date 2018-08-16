$(document).ready(function() {
	$('#btn-delfile').hide();
	var filesJSON = {
		"filesNames": [],
		"filesBytes": []
	}
	$('#att').val(JSON.stringify(filesJSON));
	$('#f-hora').submit(function(event){
		var form = $(this);
		form[0].querySelector('#sint').value = form[0].querySelector('#sint').value.replace(new RegExp('data:image/png;base64,', 'g'),'http://basedeconocimiento/');
		form[0].querySelector('#caus').value = form[0].querySelector('#caus').value.replace(new RegExp('data:image/png;base64,', 'g'),'http://basedeconocimiento/');
		form[0].querySelector('#solu').value = form[0].querySelector('#solu').value.replace(new RegExp('data:image/png;base64,', 'g'),'http://basedeconocimiento/');
	});



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
			files = $('#files')[0].files;
			indices = [];
			var reader = new FileReader();
			fileTypes = ['docx', 'doc', 'dot', 'xls', 'xlsx', 'xlm', 'xla', 'xlc', 'xlt', 'xlw', 'pdf', 'csv', 'txt', 'text', 'conf', 'def', 'png', 'jpeg', 'jpg', 'jpe', 'gif'];
			if (files.length > 0){
				 	for (i=0; i<files.length; i++){
							indices.push(i);
			 		}
					indices.forEach(function(i){
								 var fil =[files[i].name];
								 reader.onload = function () {
										 console.log(reader.result.split(',',2));
										 fil.push(reader.result.split(',',2)[1]);
										 parsed = fil[0].split('.');
										 if (fileTypes.includes(parsed[parsed.length-1].toLowerCase())){
												 filesJSON.filesNames.push(fil[0]);
												 filesJSON.filesBytes.push(fil[1]);
												 $('#att').val(JSON.stringify(filesJSON));
										 } else{
											 alert('El archivo seleccionado es de una extension no permitida ('+parsed[parsed.length-1]+')'+
										 					'\n Se procede a quitar los archivos seleccionados.');
											 $('#files').val('');
											 $('#txt').val('');
											 $('#btn-delfile').hide();
										 }
								 }
								 reader.readAsDataURL(files[i]);
					});

			}
			$('#btn-delfile').show();
		});

});
