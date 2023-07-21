

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

// recupera os desafios agendados. Realizados ou não.

function getchallenge(){

const dbRef = firebase.database().ref();
	dbRef.child("challenge").get().then((snapshot) => 
	{
		snapshot.forEach(function(p, i){
			
				if (p.val().finish == 0){
					
					challenge = 1;

					let schedule = $('#schedule');
					let pl1Table = $('#pl1Data');
					let pl2Table = $('#pl2Data');
					
					let tagPl1   = '<tr><th scope="row"></th><td>' +   p.val().homePl1 + '</td><td>' + p.val().player1 + '</td><td>'  +  p.val().winPl1 + '</td></tr>';
					let tagPl2   = '<tr><th scope="row"></th><td>' +   p.val().homePl2 + '</td><td>' + p.val().player2 + '</td><td>'  +  p.val().winPl2  + '</td></tr>';
					
					$('#schedule').text(`Agendado para ${p.val().date} as ${p.val().hour} horas`);
					pl1Table.append(tagPl1);
					pl2Table.append(tagPl2);
				   
				}else {

					let scheduleEnd = $('#scheduleEnd');
					let tag      = `<tr><th scope=\\"row\\"></th><td>${p.val().player1}</td><td>${p.val().player2}</td><td>${p.val().winPl1} X ${p.val().winPl2}</td><td>${p.val().date}</td></tr>`;
					scheduleEnd.append(tag);
				}
				
			});
				
				// Caso não haja desafios agendados, remove a tabela e exibe mensagem.

				if (challenge == 0){
						
					$('#schedule').text('Não há desafio agendado no momento');
					$('#table').empty();
				}
	})
	 .catch((error) => {
	  console.error(error);
	});	
}