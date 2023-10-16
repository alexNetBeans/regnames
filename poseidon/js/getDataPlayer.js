

let idPlayer; //  id do Player selecionado.

// Botões Update e Remove

 let btnUpdate = $('#update').on('click', function(){
        updateDataPlayer();
 });

 let btnUpdate2 = $('#update2').on('click', function(){
    updateDataPlayer();
});

let btnRemove = $('#remove').on('click', function(){
    removeDataPlayer(idPlayer)
});

let btnRemove2 = $('#remove2').on('click', function(){
    removeDataPlayer(idPlayer)
});

// Remove dados do Player

function removeDataPlayer(idPlayer)
{
    firebase.database().ref('players/'+ idPlayer).remove();
    showMsg('success');
    
    setTimeout((data)=>{
      location.reload(true);
    }, "1500");
    
}

// Atualiza dados do Player

function updateDataPlayer(){

    let nomePlayer   =  $('#playerName').val(); 
    let winPlayer    =  $('#win').val(); 
    let idHomePlayer =  $('#idHome').val();

    firebase.database().ref('players/'+ idPlayer).update(
        {
          idHome: idHomePlayer,
          player: nomePlayer,
          wins: winPlayer
          
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
};


// Recupera os dados do Player selecionado no Select

function getDataPlayer(){

    let playerSelected = $("#player1 option:selected").text()

  const dbRef = firebase.database().ref();
	dbRef.child("players").get().then((snapshot) => 
	{
	    snapshot.forEach(function(p, i){

			if (p.val().player == playerSelected){

          idPlayer = p.key;
          $('#playerName').val(p.val().player);	
          $('#win').val(p.val().wins);
          $('#idHome').val(p.val().idHome);

    }})
			 /* .catch((error) => {
			 console.error(error);
			});	*/
	});
};

