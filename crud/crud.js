

// -- ATUALIZA REGISTRO DO ID INFORMADO --

function updateData( id, name, gender )
{
	firebase.database().ref('nomes/'+ id ).update(
	{
		  nome:   name,
		  genero: gender
		  
	}, (error) => 
	{
		if (error) 
		{
			showMsg('erro', 'msgAdm', 'Erro ao Salvar !');	
		} 
		else {
			msg ( 'success', 'msgAdm', 'Salvo com Sucesso !' )
		  }
		});	
}

// --  APAGAR NOME --

function removeName( id )
{
	firebase.database().ref('nomes/' + id ).remove()
	.then(function(d)
	{
		msg ( 'success', 'msgAdm', 'Registro Apagado !' );
	})
	.catch(function(erro){
		msg ( 'error', 'msgAdm', 'Erro ao apagar registro !' );
	});
	
	closeModal('adm');
}

/*

fb.createUserWithEmailAndPassword('alexnetbeans@gmail.com', '151980')
  .then((userCredential) => {
    // Usuário registrado e logado com sucesso!
    const user = userCredential.user;
    console.log('Usuário registrado:', user.email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Erro no registro:', errorCode, errorMessage);
    // Exiba mensagens de erro apropriadas ao usuário
      
  });
*/

// KEY API AI
// https://image.pollinations.ai/prompt/como%20seria%20aparencia%20de%20uma%20pessoa%20chamada%20Cleiton
// https://text.pollinations.ai/openai?model=sur-mistral
// https://text.pollinations.ai/diga%20o%20acha%20do%20nome%20Alex
// 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


// -- OBTEM INFORMAÇÕES DO POR MEIO DE IA --
// API: https://image.pollinations.ai/prompt/

function fromName(name) 
{
	
	$('#contentName').text( '' );

	let url = 'https://text.pollinations.ai/pais%20de%20origem%20do%20nome%20' + name + '%20e%20n%C3%ADvel%20de%20popularidade%20em%20apenas%20%20500%20caracteres';

	$.get( url, function(data)
	{})
	.then(function(data)
	{
		$('.spinner-border').addClass('d-none');
		$('#contentName').text( data );
	   
	},function( erro )
	{
		console.log( erro );
		
    });
}


// -- BUSCA DADOS DO NOME PARA MODAL --

function getDataforModal( id )
{
	
	dbRef = firebase.database().ref("nomes").orderByKey();
	
	let name;
	let genero;
	let registro;

    dbRef.on("child_added", snapshot => 
    {
        
        if (  id == snapshot.key ){
            
			name     = snapshot.val().nome;
            genero   = snapshot.val().genero;
			registro = snapshot.val().registro;
			id       = snapshot.key; 
			
			$('#nameData').html( name );
            $('#genderData').text( genero );
			$('#regData').text( registro );
			$('#idName').text( id );
        }
	}); 
	
	console.log(id);

	// --  BUSCA INFORMAÇÕES SOBRE O POR IA -- 
	
	fromName(name);

	$('.spinner-border').removeClass('d-none');
	$('#modalDataName').modal('show');
};   


// -- PESQUISA DO NOME  -- 

function searchByName( name )
{
	let arrConsulta = []
	let tag = '<tr><td>';
	
	const dbRef = firebase.database().ref("nomes");
		dbRef.orderByChild("nome").on("child_added", snapshot => 
		{
			let data =  snapshot.val().nome;
			data     = data.trim();
			
			if (name.substr(0 , 3).trim().toLowerCase() == data.substr(0 , 3).toLowerCase())
			{
				
				tag = '<tr><td id=' + snapshot.key + ' onclick="getDataforModal(this.id)">' + snapshot.val().nome + '</td><td>' + snapshot.val().genero + '</td><td>' + snapshot.val().registro;
				$('#pesData').append( tag );
			}
		});
}


// -- FILTRAGEM POR GENERO --

let ArrMasc = [];

let m       = 0;
let f       = 0;
let a       = 0;
let collectedData = 0;

function orderByGender( gender )
{
	let arr    = $('#plData').html();
	// let data   = arr.replaceAll(' ','');
	let newArr = arr.split('<tr></tr>');
	let ArrTmp = [];
	
	
	if ( collectedData == 0 )	
	{
		newArr.forEach(function(data){
			
			if ( data.includes( 'Masculino' ))
			{
				ArrMasc.push(data);
			}

			if ( data.includes( 'Feminino' ))
			{
				ArrFem.push(data);
			}
			
		});
		
			collectedData = 1;
	}	
    
        if ( gender == 'Masculino')
        {        
            ArrTmp = ArrMasc.sort();
			$('#plData').empty();
			$('#plData').append(ArrTmp);

        }
    
        if ( gender == 'Feminino')
        {        
            ArrTmp = ArrFem.sort();
			$('#plData').empty();
			$('#plData').append(ArrTmp);

        }

		if ( gender == 'Ambos')
		{
			$('#plData').empty();
			$('#plData').append(ArrMasc);
			$('#plData').append(ArrFem);		

		}
};

// -- FAZ BUSCA DE NOMES POR FILTRO -- 

function busca( nome )
{
    arr    = $('#plData').html();
	data   = arr.replaceAll(' ','');
	newArr = data.split('<tr></tr>');
	
	result = [];
    
    for (i = 0; i < newArr.length; i++)
    {
        console.log( newArr[i].replaceAll(' ','').substr(0, 12), nome )
        
        if (newArr[i].replaceAll(' ','').substr(0, 12) == '<tr><td>'+ nome.replaceAll(' ',''))
        {
            console.warn('Encontrado com sucesso !')
            result.push(newArr[i]);
        }
    }
	
	  $('#plData').empty();
	  $('#plData').append(result);
};


// -- MARCA AS PÁGINAS ATIVAS --

function pageActual( id )
{
	$(".page-item").removeClass("active");	
}

// -- CRIA PAGINAÇÃO -- 

function makePagination()
{
	let items    = 0;
	let contador = 0;
	let indexKey = 2;
	let startKey = [];
    let numPages = 0;
	
dbRef = firebase.database().ref("nomes").orderByKey(); // .startAt('-OVSumxnBshowR03TQMW');
dbRef.on("child_added", snapshot => 
	{
       numPages++;
    });

dbRef = firebase.database().ref("nomes").orderByKey();	

	dbRef.on("child_added", snapshot => 
	{
        contador++;
		items++;
        
		if ( contador == 20 && Math.ceil(numPages) > 0)
		{
			startKey[indexKey] = snapshot.key;

			let linkPage = '<li class="page-item" ' + 'id='+ numPages + ' onclick=pageActual();$(this).addClass("active");>' + '<a class="page-link href="#" id=' + startKey[indexKey] + ' onclick=(makePageNames(this.id))>' + indexKey + '</a></li>';	
			$('#pages').append( linkPage );	
			
			contador = 0;
			indexKey++;
            numPages--;
		}
    });
}

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

let lastKey = 0;

function getNomes()
{
	let rankList = [];

	const dbRef = firebase.database().ref("nomes");
	dbRef.orderByChild("nome").on("child_added", snapshot => 
	{
		rankList.push({'nome': snapshot.val().nome, 'genero': snapshot.val().genero, 'dataRegistro': snapshot.val().registro, 'id':snapshot.key})
	});

		
		let plTable = $('#plData');
		let index   = 0;
		rankList.forEach(function(p, i)
		{
					
			index++;
			if (index == 10)
			{
				lastKey = rankList[10].id;
			}
			let tag = '<tr></th><td>' + p.nome +  '</td><td>' + p.genero + '</td><td>' + p.dataRegistro + '</td></tr>';
			plTable.append(tag);
			
		
		})
			//catch((error) => {
			//console.error(error);
//		});	
};

// -- BUSCA NÚMERO DE REGISTROS --

function getReg()
{
	let numReg  = 0;
	let mascReg = 0;
	let femReg  = 0;
	
	const dbRef = firebase.database().ref("nomes");
	dbRef.orderByChild("nome").on("child_added", snapshot => 
	{
		
	// -- OBTEM NÚMERO TOTAL DE REGISTROS E MASCULINO E FEMININOS --
		
		if ( snapshot.val().genero == 'Masculino' )
		{
			mascReg++;
		}
		
		if ( snapshot.val().genero == 'Feminino' )
		{
			femReg++;
		}
			
		numReg++;
		$('#reg').text( numReg );
		
		$('#masc').text( mascReg );
		$('#fem').text( femReg );
		$('#totalReg').text( numReg );
		
	});
}

// -- VERIFICA SE NOME ESTÁ REGISTRADO  --

function checkName( nome, genero, dataRegistro ){

	let NameFound = 0;
	let NameEmpty = 0;
	
	if ( nome == '')
	{
		alert ('Campo nome não pode estar vazio !')
		NameEmpty = 1;
	}

  const dbRef = firebase.database().ref();
  
	dbRef.child("nomes").get().then((snapshot) => 
	{
	    snapshot.forEach(function(p, i)
		{

			if (p.val().nome.toUpperCase() == nome.toUpperCase())
			{
				alert ('Nome ' + nome +' já consta em nossos registros !');
				NameFound = 1;
			}
		})
// --  REGISTRA NOME CASO NÃO EXISTA REGISTRO DELE --
			
			if ( NameFound == 0 && NameEmpty == 0 )
			{
				setName(nome, genero, dataRegistro);
				$('#nome').val(' '); // limpa o campo
			}
	});
};

// Rederiza lista de nomes por página. 20 nomes por página

	function makePageNames(indexKey)
	{
		
		let rankList = [];
		let contador = 0;
		let dbRef;
		let styleColor;
		
		ArrFem  = [];
		ArrMasc = [];
	    collectedData= 0;
	
		$('.fa-solid').removeClass('text-primary'); 
		$('.fa-mars-and-venus').addClass('text-primary')
		
		if (indexKey == '')
		{
			dbRef = firebase.database().ref("nomes").orderByKey().limitToFirst(1);
			dbRef.on("child_added", snapshot => 
			{
				indexKey = snapshot.key;

				let linkPage = '<li class="page-item active" onclick=pageActual();$(this).addClass("active");><a class="page-link href="#" id=' + indexKey + ' onclick=(makePageNames(this.id))>' + 1 + '</a></li>';	
				$('#pages').append( linkPage );	
			});
		}

		dbRef = firebase.database().ref("nomes").orderByKey().startAfter(indexKey).limitToFirst(20);	
		
		let plTable = $('#plData');
		plTable.empty();

		dbRef.on("child_added", snapshot => 
		{	
			contador++;
			
			if ( contador == 20 ){
				  lastKey = snapshot.key;
			}

			// let tag = '<tr></tr><td>' + snapshot.val().nome + '</td><td>' + snapshot.val().genero + '</td><td>' + snapshot.val().registro + '</td></tr>';
			let tag = '<tr></tr><td id=' + snapshot.key + ' onclick="getDataforModal(this.id)">' + snapshot.val().nome + '</td><td>' + snapshot.val().genero + '</td><td>' + snapshot.val().registro + '</td></tr>';
			plTable.append(tag);
			
		});
	};