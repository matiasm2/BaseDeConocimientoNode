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
						  '<Field name="Titulo">30523</Field>'+
						  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Sintoma">30530</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Causa">30534</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>'+
						'<TextFilterCondition>'+
							  '<Operator>Contains</Operator>'+
							  '<Field name="Solucion">30535</Field>'+
							  '<Value>'+txticket+'</Value>'+
						'</TextFilterCondition>';

			operatorLogic = '<OperatorLogic>1 OR 2 OR 3 OR 4</OperatorLogic>';

	}

	if(txticket != '' && $('#check')[0].checked && $('#check2')[0].checked){
		operatorLogic = '<OperatorLogic>(1 OR 2 OR 3 OR 4) AND 5 AND 6</OperatorLogic>';
	}

	else if (txticket != '' && $('#check')[0].checked){
		operatorLogic = '<OperatorLogic>(1 OR 2 OR 3 OR 4) AND 5</OperatorLogic>';
	}
	else if (txticket != '' && $('#check2')[0].checked){
		operatorLogic = '<OperatorLogic>(1 OR 2 OR 3 OR 4) AND 5</OperatorLogic>';
	}
	else if ($('#check')[0].checked && $('#check2')[0].checked){
		operatorLogic = '<OperatorLogic>1 AND 2</OperatorLogic>';
	}

	xml = ['<![CDATA[',
				'<SearchReport>',
					'<PageSize>100</PageSize>',
					'<DisplayFields>',
						'<DisplayField name="Titulo">'+30523+'</DisplayField>',
						'<DisplayField name="Sintoma">'+30530+'</DisplayField>',
						'<DisplayField name="Solucion">'+30535+'</DisplayField>',
						'<DisplayField name="Fabricante">'+30532+'</DisplayField>',
						'<DisplayField name="Tecnología">'+30529+'</DisplayField>',
					'</DisplayFields>',
					'<Criteria>',
						'<ModuleCriteria>',
							'<Module>'+542+'</Module>',
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
	html = ['<tr>',
			  '<td><a href="register?st='+localStorage.sessionToken+'&id='+record.getAttribute('contentId')+'">'+record.children[0].innerHTML+'</a></td>',
			  '<td>'+record.children[1].innerHTML+'</td>',
			  '<td>'+record.children[3].innerHTML+'</td>',
			  '<td>'+record.children[4].innerHTML+'</td>',
		'</tr>'
	];

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
			$('#tbody').html('');
			for (i = 0; i < xmlDoc.documentElement.getElementsByTagName('Record').length; i++){
				record = xmlDoc.documentElement.getElementsByTagName('Record')[i];
				createRecordRow(record);
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

