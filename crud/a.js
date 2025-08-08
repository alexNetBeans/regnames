
/*



 10 por página

 número de registros <= 10: é uma única página

 número de registros > 10 : divide por 10 a quantidade de item : items / 10



*/

// --  PEGA KEY DO ITEM EM INTERVALO DESEJADO --

let items    = 0;
let contador = 0;
let indexKey = 1;

let startKey = [];


function makePagination()
{
	    let items    = 0;
	let contador = 0;
	let indexKey = 2;
	let startKey = [];
    let numPages = 0;
	
dbRef = firebase.database().ref("nomes").orderByKey().startAt('-OVSumxnBshowR03TQMW');
dbRef.on("child_added", snapshot => 
	{
       
        
    });

console.log(numPages);

dbRef = firebase.database().ref("nomes").orderByKey();	

	dbRef.on("child_added", snapshot => 
	{
        contador++;
		items++;
        
		if ( contador > 10 )
		{
			startKey[indexKey] = snapshot.key;

			let linkPage = '<li class="page-item"><a class="page-link href="#" id=' + startKey[indexKey] + ' onclick=(makePageNames(this.id))>' + indexKey + '</a></li>';	
			$('#pages').append( linkPage );	

			contador = 0;
			indexKey++;
            numPages--;
		}
    });
}	
		 
		/* if ( items > 10 )
		 {
		
			let numByPage = Math.round(items / 10);
			
			for ( numPage = 0; numPage <= numByPage; numPage++)
			{
				
				if ( numPage == 0 )
				{
					let linkPage = '<li class="page-item"><a class="page-link href="#"  onclick=(makePageNames(0))> 1 </a></li>';
					$('#pages').append( linkPage );				
				}
				else{
					let linkPage = '<li class="page-item"><a class="page-link href="#" id=' + startKey[numPage] + ' onclick=(makePageNames(this.id))>' + numPage + '</a></li>';	
					$('#pages').append( linkPage );			
				}
			}

		 }*/
}
		 
		 
let ultimoItem = 0;

const primeiraPaginaRef = db.ref('nomes').orderByKey().limitToFirst(3);

primeiraPaginaRef.once('value', (snapshot) => 
{
      const items = snapshot.val();
      ultimoItem = Object.keys(items)[Object.keys(items).length - 1];
      console.log( snapshot.val());
});

// 

/*const proximaPaginaRef = db.ref('nomes').orderByKey().startAfter(ultimoItem).limitToFirst(3);

	 proximaPaginaRef.once('value', (snapshot) => 
	 {
		  const items = snapshot.val();
		  ultimoItem  = Object.keys(items)[Object.keys(items).length - 1];
		  const proximaPaginaItems = snapshot.val();
		  console.log( snapshot.val());
	 });*/



// Rederiza lista de nomes por página.

	function makePageNames(indexKey)
	{
		let rankList = [];
		let contador = 0;
		let dbRef;

		dbRef = firebase.database().ref("nomes").orderByKey().startAfter(indexKey).limitToFirst(10);	
		
		dbRef.on("child_added", snapshot => 
		{
			
			contador++;
			
			if ( contador == 10 ){
				  lastKey =  snapshot.val().nome;
			}
			
			rankList.push({'nome': snapshot.val().nome, 'genero': snapshot.val().genero, 'dataRegistro': snapshot.val().registro, 'id':snapshot.key});
			
		});
			
			let plTable = $('#plData');
			plTable.empty();
			
			rankList.forEach(function(p, i)
			{
				let tag = '<tr class=fs-6></th><td>' + p.nome + '</td><td>' + p.genero + '</td><td>' + p.dataRegistro + '</td></tr>';
				plTable.append(tag);
			});
	};
			