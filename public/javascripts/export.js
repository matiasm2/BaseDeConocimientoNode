$(document).ready(function() {
    $('#test4')[0].innerHTML=$('#test4')[0].innerHTML.replace(new RegExp('http://basedeconocimiento/', 'g'),'data:image/png;base64,').replace(new RegExp('<img ', 'g'),'<img class="responsive-img"');
	$('#test5')[0].innerHTML=$('#test5')[0].innerHTML.replace(new RegExp('http://basedeconocimiento/', 'g'),'data:image/png;base64,').replace(new RegExp('<img ', 'g'),'<img class="responsive-img"');
	$('#test6')[0].innerHTML=$('#test6')[0].innerHTML.replace(new RegExp('http://basedeconocimiento/', 'g'),'data:image/png;base64,').replace(new RegExp('<img ', 'g'),'<img class="responsive-img"');

})