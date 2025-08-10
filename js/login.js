
// -- DESLOGA ADM -- 

function logOut(){
	
	firebase.auth().signOut().then(() => {
	// console.log("Usuário deslogado com sucesso.");
	}).catch((error) => {
    //console.error("Erro ao deslogar:", error);
    });
}

// -- TRAZ DADOS PARA MODAL ADM -- 

function getDataModalAdm()
{
	 if (checkLogin() == 0)
	 {
		 $('#nameEdit').val('');
		 $('#regData1').text('');
		 $('#idEdit').text('');

		 closeModal('adm');
	 }
	else{
		
	// --  ABRE MODAL ADM -- 
	
		$('#nameEdit').val( $('#nameData').html() );
		$('#regData1').text( $('#regData').text() );
		$('#idEdit').text($('#idName').text());
		
		if ( $('#genderData').text() ==  "Masculino")
		{
			$("#mascEdit").prop('checked', true);	
		}
		else if ( $('#genderData').text() ==  "Feminino")
		{
			$("#femEdit").prop('checked', true);	
		}
	}
}

// -- VERFICA SE ESTÁ LOGADO -- 

function checkLogin(){
	
	firebase.auth().onAuthStateChanged(function(user){
    if (user){
		
		getDataModalAdm();
		$('#adm').modal('show');
		//console.log(user.email)
		
    }
    else{
		closeModal('adm');
		$('#login').modal('show');
        // console.warn('Não está logado !');
		
    }
  });	
}

// --  FECHA MODAL PELO ID --

function closeModal( idModal )
{
	let id    = document.getElementById( idModal ); 
	let modal = bootstrap.Modal.getInstance(id);
	modal.hide();
}

// -- FAZ AUTENTICAÇÃO --

function doLogin( email, passwd )
{
	fb = firebase.auth();

	fb.signInWithEmailAndPassword( email, passwd )
	  .then((userCredential) => {
		  
		  msgLogin('success', 'mensagem', 'Acesso Autorizado !');
		  
		// const user = userCredential.user;
		// console.log('Usuário logado:', user.email);
	  })
	  .catch((error) => {
		  
		  msgLogin( 'erro', 'mensagem', 'Login inválido !' );
		  
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error('Erro no login:', errorCode, errorMessage);
		
	  });
}

// -- MENSAGEM DE ERRO / SUCESSO TELA  -- 

function msg ( value, id, msg )
{
	if ( value == 'erro' )
	{
		$('#' + id ).text( msg );
		$('#' + id ).addClass('alert alert-danger');
		
		setTimeout(function (){
		
		$('#' + id ).text('');
		$('#' + id ).removeClass('alert alert-danger');	
		
		}, 2500) ;
	}
	else if ( value == 'success' ){
		
		$('#' + id ).text( msg );
		$('#' + id ).addClass('alert alert-success');
		
		setTimeout(function (){
		
		$('#' + id ).text('');
		$('#' + id ).removeClass('alert alert-success');
		
		}, 1500);
	}
}

// -- MENSAGEM DE ERRO / SUCESSO TELA LOGIN -- 

function msgLogin ( value, id, msg )
{
	if ( value == 'erro' )
	{
		$('#' + id ).text( msg );
		$('#' + id ).addClass('alert alert-danger');
		
		setTimeout(function (){
		
		$('#' + id ).text('');
		$('#' + id ).removeClass('alert alert-danger');	
		
		}, 2500) ;
	}
	else if ( value == 'success' ){
		
		$('#' + id ).text( msg );
		$('#' + id ).addClass('alert alert-success');
		
		setTimeout(function (){
		
		$('#' + id ).text('');
		$('#' + id ).removeClass('alert alert-success');	
		
	// --  FECHA MODALS ABERTAS -- 	
		
		closeModal( 'login' );
		closeModal( 'modalDataName' );
	
	// -- ABRE MODAL ADM --	
		
		getDataModalAdm();	
		$('#adm').modal('show');
		
		}, 1500) ;
	}
}

// -- BOTÃO DE LOGIN --

$('#btnLogin').click(function(){

	let email  =  $('#email').val();
	let passwd =  $('#passwd').val();

	if ( email.length = 0 || passwd.length == 0 )
	{
		msgLogin( 'erro', 'mensagem', 'Ocorreu erro ao logar !');
	}
	else if ( email.length != 0 && passwd.length != 0 ){
		
		doLogin( email, passwd );
	}
});



