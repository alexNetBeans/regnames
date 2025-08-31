
//  -- BOTÃO BUSTWOLF  -- 

$('#btn-submit').click (()=>{
	
	let nome = $('#nome').val();
	let nick = $('#nick').val();
	
	let charId = $('#chars').val();
	let char   = ArrChars[charId];
	
	if ( nome == '' || nick == '' ){
		
			alert( ' Campos não podem estar vazios ! ' );
			return 0;
		}
	
	setPlayer( nome, nick, char );
	
});

// -- SALVAR DADOS JOGADOR -- 

function setPlayer( nome, nick, char )
{
    let insertPl = firebase.database().ref().child('playersGarou').push({
        
            "nome": 	nome,
            "nick":     nick,
			"char":     char

    },
    (error) => {
        if (error) {
            alert('Ocorreu um erro !');
        } else {
        // Data saved successfully!
		
		$('#modalwelcome').modal('show');
	   
        }
    }).key   
};

// -- DADOS DOS JOGADORES PARA A TABELA -- 

function getDataPlayers(){
	
	let plTb = $('.tabPlayers');
	
	const dbRef = firebase.database().ref("playersGarou");
	dbRef.orderByChild("nome").on("child_added", snapshot => 
	{
    	// console.log(snapshot.val());
		
		let nome = snapshot.val().nome;
		let nick = snapshot.val().nick;
		let char = snapshot.val().char;
		
		nickFc = nick.replaceAll(' ','%20');
		nickFc = nickFc.replaceAll('#','%23');
		
		let fcUrl  = 'https://www.fightcade.com/id/' + nickFc;
		let linkFc = '<a href=' + fcUrl + '>' 
		
		let tag = '<tr><td>' +  nome +  '<td>' +  nick + '<td>' + char + '<td>' + linkFc + '<img src="https://img.icons8.com/?size=25&id=60022&format=png&color=000000"/></a>';	
		plTb.append( tag );
		
		$('#load').addClass('d-none');
		$('.table').removeClass('d-none');
		
	});
}
