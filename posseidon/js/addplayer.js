

// Botão adicionar jpgador

$(function() {
    
    $('#btnAdd').on('click', function(){
        
        let PlName = $('#plName').val();
        let idHome = $('#idHome').val();
		let wins =   $('#win').val();
		
		if (wins == '' || wins == 0){
			let winPlayer = 0;
		}
		else{
			winPlayer = wins;
		}

        if (PlName != '' && idHome != 'Escolha casa'){
            insertPlayer(PlName, idHome, winPlayer);
            $('#plName').val('');
            $('#idHome').val('Escolha casa');
        }
        else{
            showMsg('warning');
        }

    });
});

// Gravar jogadores no banco

function insertPlayer(playerName, idHome, winPlayer)
{

    let insertPl = firebase.database().ref().child('players').push({
        
            "player": playerName,
            "wins":   winPlayer,   
            "idHome": idHome     

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