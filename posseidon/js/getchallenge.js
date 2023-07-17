
//  Guarda id do desafio

let idFromChallenge = 0;
let challenge = 0;

$(function() 
{
     getchallenge()
});

// Adiciona nome da casa pelo id

function getHomeFromid(idHome){
	
 switch (idHome) {
	
	case '1':
	return 'Dragão'	
	break;
	case '2':
	return 'Cisne'	
	break;
	case '3':
	return 'Andrômeda'	
	break;
	case '4':
	return 'Pegasus'	
	break;
	case '5':
	return 'Fênix'	
	break;
	case '6':
	return 'Corvo'	
	break;
	case '7':
	return 'Centauro'	
	break;
	case '8':
	return 'Lagarto'	
	break;
	case '9':
	return 'Perseu'	
	break;
	case '10':
	return 'Lira'	
	break;
	case '11':
	return 'Áries'	
	break;
	case '12':
	return 'Touro'	
	break;
	case '13':
	return 'Gêmeos'	
	break;
	case '14':
	return 'Câncer'	
	break;
	case '15':
	return 'Leão'	
	break;
	case '16':
	return 'Virgem'	
	break;
	case '17':
	return 'Libra'	
	break;
	case '18':
	return 'Escorpião'	
	break;
	case '19':
	return 'Sagitário'	
	break;
	case '20':
	return 'Capricórnio'	
	break;
	case '21':
	return 'Aquário'	
	break;
	case '22':
	return 'Peixes'	
	break;
	case '23':
	return 'Sala do Mestre'	
	break;
	  
	 // Em teoria nunca deve entrar aqui :P 
	  default:
		console.log('Ocorreu um erro !');
	}
}

// recupera os desafios agendados

function getchallenge(idChallenger){

	let result = [];
	let apiKey = 'b8oGEGQsdyeQ2SwEN1UlFxEqHlNFD7QEOeb56sqaanPk1s0mbl1oG5zlB2iVwCrG';

	var data = JSON.stringify(
		{
			"collection": "challenge",
			"database": "12casas",
			"dataSource": "Cluster0",
			"filter": {}
	});
				
	var config = {
		method: 'post',
		url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-bfyfs/endpoint/data/v1/action/find',
		headers: {
		  'Content-Type': 'application/json',
		  'api-key': apiKey,
		},
		data: data
	};

	axios(config)
		.then(function (response) 
		{
			// console.log(JSON.stringify(response.data));
			
			result = response.data.documents;

			result.forEach(function(p, i){
				
			if (p.finish == 0){
				
				challenge = 1;

				idFromChallenge = p._id;
				let pl1Table    = $('#pl1Data');
				let pl2Table    = $('#pl2Data');
				
				let tagPl1   = `<tr><th scope=\\"row\\"></th><td>${p.homePl1}</td><td>${p.player1}</td><td><input type="number" id="winPl1" min="0" value="0" class=\\"form-control-sm\\" autofocus></td></tr>`;
				let tagPl2   = `<tr><th scope=\\"row\\"></th><td>${p.homePl2}</td><td>${p.player2}</td><td><input type="number" id="winPl2" min="0" value="0" class=\\"form-control-sm\\"></td></tr>`;
				
				pl1Table.append(tagPl1);
				pl2Table.append(tagPl2);
			}
				console.log(p._id, p.player1 + ' VS ' + p.player2);
			});
				
			if (challenge == 0){
					
				// Caso não haja desafios agendados, remove a tabela e exibe mensagem.

				$('#messageChall').append('<div class="alert alert-primary mt-4" id="schedule"> Não há desafio agendado no momento </div>');
				$('#table').empty();
			}		

		})
		.catch(function (error) {
			console.log(error);
		});

		
}