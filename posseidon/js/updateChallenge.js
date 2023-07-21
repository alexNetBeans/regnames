
// Atualiza o placar de um desafio


let btnEndChallenge = $('#btnEndChall').on('click', function(){

    let winPl1 = $('#winPl1').val();
    let winPl2 = $('#winPl2').val();
	
	if (winPl1 == 0 || winPl2 == 0)
	{
		showMsg('warning');
		return 0;
	}	

    // Atualiza placa do desafio e encerra.
	
	UpdateWinfromSchedule(idFromChallenge, winPl1, winPl2);
	
	// Verifica que é o vencedor e atribui vitória a ele (rank geral).
	
	if (winPl1 > winPl2){
		
		getIdFromWinner(pl1);	
	}
	else if (winPl2 > winPl1){
		
		getIdFromWinner(pl2);	
	}
	   
});

// Pega id do Player vencedor do desafio.

function getIdFromWinner(playerName){
	
	const dbRef = firebase.database().ref();
	dbRef.child("players").get().then((snapshot) => 
	{
		snapshot.forEach(function(n, i){
			// console.log(n.val().player)
			
			if (playerName == n.val().player)
			{
				let idWinner = n.key;
				let numberVictoryNow = n.val().wins;
				
				updateWinFromPlayer(idWinner, numberVictoryNow);
			}
		});
	})
	 .catch((error) => {
	  console.error(error);
	});
}

// Atualiza vitórias do vencedor do desafio (rank geral).

function updateWinFromPlayer(idWinner, numberVictoryNow){

	firebase.database().ref('players/'+ idWinner).update(
	{
	  wins: numberVictoryNow + 1
	  
	}, (error) => 
	{
	  if (error) 
	  {
		showMsg('erro');
		
	  } else {
		// showMsg('success');
		console.log('Data saved successfully!')
	  }
	});
};


// Atualiza placar do desafio

function UpdateWinfromSchedule(id, winPl1, winPl2){

	firebase.database().ref('challenge/'+ id).update(
	{
	  winPl1: winPl1,
	  winPl2: winPl2,
	  finish: 1
	  
	}, (error) => 
	{
	  if (error) 
	  {
		showMsg('erro');
		
	  } else {
		showMsg('success');
		console.log('Data saved successfully!')
	  }
	});
}