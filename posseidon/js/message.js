
// Mensagem do sistema

// Remove a mensagem da tela após 03 segs.

function hideMsg(){

    setTimeout(function(){

        $('#message').empty();
        location.reload(true);
   
    }, 3000);

}

// Exibe mensagem de sucesso, aviso e erro

function showMsg(msg)
{
    let message;
    
    if (msg == 'success')
    {
        message = '<div class="alert alert-success" role="alert"> Dados Registrados com Sucesso !</div>';        
    }
    else if (msg == 'erro')
    {
        message = '<div class="alert alert-damger" role="alert"> Ocorreu um erro !</div>';
    }
    else if (msg == 'warning')
    {
        message = '<div class="alert alert-primary" role="alert"> Falta Alguma Coisa !</div>';
    }

    $('#message').append(message);
    hideMsg();
}


  