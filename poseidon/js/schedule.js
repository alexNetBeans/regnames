
// Atualiza a casa de acordo com jogador

$('#player1').on('change', function(){
	
	let idHomePl1 = $('#player1').val();
	let homePl1   = $('#homePl1');
	homePl1.text(getHomeFromid(idHomePl1));
	// alert(this.children[this.selectedIndex].textContent);

	// let  a = $('#player1').find(':selected').text();

});

$('#player2').on('change', function(){
	
	let idHomePl2 = $('#player2').val();
	let homePl2   = $('#homePl2');
	homePl2.text(getHomeFromid(idHomePl2));
});

// Botão que confirma agendamento

let btnSchedule = $('#btnSchedule').on('click', function(){
 
	let pl1 = $('#player1').find(':selected').text()
	let pl2 = $('#player2').find(':selected').text()

	let homePl1 = $('#homePl1').text();
	let homePl2 = $('#homePl2').text();

	let ddate = $('#date').val();
	let year  = ddate.substr(0, 4);
	let month = ddate.substr(5, 2);
	let day   = ddate.substr(8, 2);

	let dateBr = day + '/' + month+ '/' + year;
	let hour   = $('#hour').val();	


	if(ddate != '' && hour != '')
	{
		setScheduler(pl1, pl2, homePl1, homePl2, dateBr, hour);
	}
	else{
		showMsg('warning');
	}
});

	let btnSchedule2 = $('#btnSchedule2').on('click', function(){
 
	let pl1 = $('#player1').find(':selected').text()
	let pl2 = $('#player2').find(':selected').text()

	let homePl1 = $('#homePl1').text();
	let homePl2 = $('#homePl2').text();

	let ddate = $('#date').val();
	let year  = ddate.substr(0, 4);
	let month = ddate.substr(5, 2);
	let day   = ddate.substr(8, 2);

	let dateBr = day + '/' + month+ '/' + year;
	let hour   = $('#hour').val();	


	if(ddate != '' && hour != '')
	{
		setScheduler(pl1, pl2, homePl1, homePl2, dateBr, hour);
	}
	else{
		showMsg('warning');
	}
});


// Grava dados do desafio

function setScheduler(pl1, pl2, homePl1, homePl2, dateBr, hour)
{
		let insertSchedule = firebase.database().ref().child('challenge').push({
			
			"player1": pl1,
			"player2": pl2,
			"winPl1":   0,   
			"winPl2":   0,
			"homePl1": homePl1,
			"homePl2": homePl2,
			"date": dateBr,
			"hour": hour,
			"finish": 0   

	},
	(error) => {
		if (error) {
			showMsg('erro');
		} else {
		// Data saved successfully!
		showMsg('success');
		}
	}).key   
};

// Chama função assim que load da página terminar

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


// recupera player para adicionar ao form select

function getPlayers(){

	const dbRef = firebase.database().ref();
    dbRef.child("players").get().then((snapshot) => 
    {

		if (snapshot.exists()) 
		{
			console.log(snapshot.val());

			let addOption  = $('#player1');
			let addOption2 = $('#player2');

			snapshot.forEach(function(p, i){
						
			let tag = `<option value=${p.val().idHome} id=a>${p.val().player}</option>`;
						
			addOption.append(tag);
			addOption2.append(tag);

					
			let idHomePl1 = $('#player1').val();
			let homePl1   = $('#homePl1');
			homePl1.text(getHomeFromid(idHomePl1));

			let idHomePl2 = $('#player2').val();
			let homePl2   = $('#homePl2');
			homePl2.text(getHomeFromid(idHomePl2));
					
			});
			} 
			else 
			{
				console.log("No data available");
			}
			}).catch((error) => 
			{
				console.error(error);
			});
	}