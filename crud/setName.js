

// --  SALVA NOME -- 

function setName(nome, genero, dataRegistro)
{

    let insertPl = firebase.database().ref().child('nomes').push({
        
            "nome": 	nome,
            "genero":   genero,   
            "registro": dataRegistro     

    },
    (error) => {
        if (error) {
            alert('Ocorreu um erro !');
        } else {
        // Data saved successfully!
        alert('Registro efetuado com Sucesso !');
        }
    }).key   
};


// --  BUSCA NOMES  --


function getNomes(){

	let rankList = [];

	const dbRef = firebase.database().ref("nomes");
	dbRef.orderByChild("nome").on("child_added", snapshot => 
	{
		rankList.push({'nome': snapshot.val().nome, 'genero': snapshot.val().genero, 'dataRegistro': snapshot.val().registro})
	});

		/*
		let plTable = $('#plData');
		rankList.forEach(function(p, i){
					
		let tag = '<tr><th scope="row"></th><td>' + p.player +  '</td><td>' + p.wins + '</td><td>' + getHomeFromid(p.idhome) + '</td></tr>';
		plTable.append(tag);
		})
			//.catch((error) => {
			//console.error(error);
		//});	
		
		*/
};
