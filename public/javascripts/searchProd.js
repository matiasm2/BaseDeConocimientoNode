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
		executeSearch(localStorage.sessionToken, createSearchOptionsHora($('#keyword').val()), 1);
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

function createSearchOptionsHora(txticket){
	txtt = '';
	tecnologia = '';
	fabricante = '';
	operatorLogic = '';
	if($('#check')[0].checked){
		tecnologia= '<ValueListFilterCondition>'+
						'<Operator>Contains</Operator>'+
						'<Field>22520</Field>'+
						'<IsNoSelectionIncluded>False</IsNoSelectionIncluded>'+
						'<Values>'+
							'<Value>'+$('#tec').val()+'</Value>'+
						'</Values>'+
					'</ValueListFilterCondition>';
	}
	if($('#check2')[0].checked){
			fabricante= '<ValueListFilterCondition>'+
						'<Operator>Contains</Operator>'+
						'<Field>22523</Field>'+
						'<IsNoSelectionIncluded>False</IsNoSelectionIncluded>'+
						'<Values>'+
							'<Value>'+$('#fab').val()+'</Value>'+
						'</Values>'+
					'</ValueListFilterCondition>';
	}
	if(txticket != ''){
		txtt = '<TextFilterCondition>'+
						  '<Operator>Contains</Operator>'+
						  '<Field name="Titulo">22517</Field>'+
						  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Sintoma">22521</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Causa">22525</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Modelos">22528</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Version">24310</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Usuario_Creador">22529</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Solucion">22526</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>';

			operatorLogic = '<OperatorLogic>1 OR 2 OR 3 OR 4 OR 5 OR 6 OR 7</OperatorLogic>';

	}

	if(txticket != '' && $('#check')[0].checked && $('#check2')[0].checked){
		operatorLogic = '<OperatorLogic>(1 OR 2 OR 3 OR 4 OR 5 OR 6 OR 7) AND 8 AND 9</OperatorLogic>';
	}

	else if (txticket != '' && $('#check')[0].checked){
		operatorLogic = '<OperatorLogic>(1 OR 2 OR 3 OR 4 OR 5 OR 6 OR 7) AND 8</OperatorLogic>';
	}
	else if (txticket != '' && $('#check2')[0].checked){
		operatorLogic = '<OperatorLogic>(1 OR 2 OR 3 OR 4 OR 5 OR 6 OR 7) AND 8</OperatorLogic>';
	}
	else if ($('#check')[0].checked && $('#check2')[0].checked){
		operatorLogic = '<OperatorLogic>1 AND 2</OperatorLogic>';
	}

	xml = ['<![CDATA[',
				'<SearchReport>',
					'<PageSize>100</PageSize>',
					'<DisplayFields>',
						'<DisplayField name="Titulo">'+22517+'</DisplayField>',
						'<DisplayField name="Sintoma">'+22521+'</DisplayField>',
						'<DisplayField name="Solucion">'+22526+'</DisplayField>',
						'<DisplayField name="Fabricante">'+22523+'</DisplayField>',
						'<DisplayField name="Tecnología">'+22520+'</DisplayField>',
						'<DisplayField name="Modelos">'+22528+'</DisplayField>',
						'<DisplayField name="Version">'+24310+'</DisplayField>',
						'<DisplayField name="Usuario_Creador">'+22529+'</DisplayField>',
					'</DisplayFields>',
					'<Criteria>',
						'<ModuleCriteria>',
							'<Module>2467</Module>',
						'</ModuleCriteria>',
						'<Filter>',
							'<Conditions>',
								txtt,
								tecnologia,
								fabricante,
							'</Conditions>',
							 operatorLogic,
						'</Filter>',
					'</Criteria>',
				'</SearchReport>',
			']]>'];
			console.log(xml.join(''));
	return xml.join('');
}

function createRecordRow(record){

	sint = $("<div />").html(record.children[1].innerHTML).text();
	if(sint.includes('<p>')){
		sint = "Ver en el registro";
	}
	
	html = ['<tr>',
			  '<td><a href="register?st='+localStorage.sessionToken+'&id='+record.getAttribute('contentId')+'">'+record.children[0].innerHTML+'</a></td>',
			  '<td><div>'+sint+'</div></td>',
			  '<td><div>'+record.children[3].innerHTML+'</div></td>',
			  '<td><div>'+record.children[4].innerHTML+'</div></td>',
			  '<td><div>'+record.children[5].innerHTML+'</div></td>',
			  '<td><div>'+record.children[6].innerHTML+'</div></td>',
			  '<td><div>'+record.children[7].childNodes[0].firstChild.attributes[1].nodeValue + " " + record.children[7].childNodes[0].firstChild.attributes[2].nodeValue + '</div></td>',
		'</tr>'
	];
    console.log(record);
	$('#tbody').append(html.join(''));
}

function executeSearch (sessionToken, searchOptions, pageNumber){
	$.soap({
		url: '/search',
		method: 'ExecuteSearch',
		SOAPAction: 'http://archer-tech.com/webservices/ExecuteSearch',
		namespaceURL: 'http://archer-tech.com/webservices/',
		appendMethodToURL: false,

		data: {
			sessionToken: sessionToken,
			searchOptions: searchOptions,
			pageNumber: pageNumber
		},

		success: function (soapResponse) {
			// do stuff with soapResponse
			// if you want to have the response as JSON use soapResponse.toJSON();
			// or soapResponse.toString() to get XML string
			// or soapResponse.toXML() to get XML DOM
			console.log('Ok');
			console.log(soapResponse);
			var xmlDoc = jQuery.parseXML(soapResponse.content.documentElement.getElementsByTagName('ExecuteSearchResult')[0].lastChild.data);
			console.log(xmlDoc);
			if (xmlDoc.documentElement.getElementsByTagName('Record').length > 0){
				$('#tbody').html('');
				for (i = 0; i < xmlDoc.documentElement.getElementsByTagName('Record').length; i++){
					record = xmlDoc.documentElement.getElementsByTagName('Record')[i];
					createRecordRow(record);
				}
			} else {
				$('#tbody').html('<tr id="tr-msg"><td>No hay registros para mostrar.</td></tr>');
			}
		},
		error: function (SOAPResponse) {
			// show error
			console.log('Error');
			console.log(SOAPResponse);
			alert('Ha ocurrido un error al buscar un registro: \n'+SOAPResponse.content.documentElement.getElementsByTagName('faultstring')[0].innerHTML);
			if (SOAPResponse.content.documentElement.getElementsByTagName('faultstring')[0].innerHTML ="Server was unable to process request. ---&gt; Invalid session token"){
				localStorage.removeItem("sessionToken");
				window.location='https://10.100.107.90/search.pug';
			}
		}
	});
}
