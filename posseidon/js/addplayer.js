

// Botão adicionar jpgador

$(function() {
    
    $('#btnAdd').on('click', function(){
        
        let PlName = $('#plName').val();
        let idHome = $('#idHome').val();

        if (PlName != '' && idHome != 'Escolha casa'){
            insertPlayer(PlName, idHome);
            $('#plName').val('');
            $('#idHome').val('Escolha casa');
        }
        else{
            showMsg('warning');
        }

    });
});

// Gravar jogadores no banco

function insertPlayer(playerName, idHome)
{

let apiKey = 'b8oGEGQsdyeQ2SwEN1UlFxEqHlNFD7QEOeb56sqaanPk1s0mbl1oG5zlB2iVwCrG';

var data = JSON.stringify(
    {
        "collection": "players",
        "database": "12casas",
        "dataSource": "Cluster0",
        "document": 
    {
        "player": playerName,
        "wins":   0,   
        "idHome": idHome     
    }
});
            
var config = {
    method: 'post',
    url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-bfyfs/endpoint/data/v1/action/insertOne',
    headers: 
    {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        showMsg('success');
    })
    .catch(function (error) {
        showMsg('erro');
        console.log(error);
    });
};