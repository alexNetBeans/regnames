
// -- MODAL ADMINISTRAÇÃO -- 

// -- BOTÃO SALVAR /  ATUALIZAR REGISTRO --

$('#btnSave').click(function(){
	
	 let id      = $('#idEdit').text();
	 let name    = $('#nameEdit').val();
	 let gender  = $("input[name='genderEdit']:checked").val();
	 
	 updateData( id, name, gender );	
});

// -- BOTÃO EXCLUIR REGISTRO --

$('#btnDel').click(function(){
	
	let id = $('#idEdit').text();
	
	removeName( id );	
	closeModal('adm');
	closeModal('modalDataName');
	$('#pesData').html('')
		
});
		
// -- BOTÃO DESLOGAR ADM --

$('#btnLogout').click(function(){
	
	logOut();
				
});
