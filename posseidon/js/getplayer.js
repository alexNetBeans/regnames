

$(function() 
{
     getPlayers()
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

// recupera os dados dos jogadores cadastrados

function getPlayers(){

	let result = [];
	let apiKey = 'b8oGEGQsdyeQ2SwEN1UlFxEqHlNFD7QEOeb56sqaanPk1s0mbl1oG5zlB2iVwCrG';

	var data = JSON.stringify(
		{
		"collection": "players",
		"database": "12casas",
		"dataSource": "Cluster0",
		"filter": {},
		"limit": 40
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
			console.log(JSON.stringify(response.data));
			
			let plTable = $('#plData');

			response.data.documents.forEach(function(p, i){
				
			   let tag = '<tr><th scope="row"></th><td>' + p.player +  '</td><td>' + p.wins + '</td><td>' + getHomeFromid(p.idHome) + '</td></tr>';
				plTable.append(tag);
			});
			
		})
		.catch(function (error) {
			console.log(error);
		});
}