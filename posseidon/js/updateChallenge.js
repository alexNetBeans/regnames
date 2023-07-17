
// Atualiza o placar de um desafio


let btnEndChallenge = $('#btnEndChall').on('click', function(){

    let winPl1 = $('#winPl1').val();
    let winPl2 = $('#winPl2').val();

    UpdateWinfromSchedule(idFromChallenge, winPl1, winPl2);
    
});


// Atualiza placar do desafio

function UpdateWinfromSchedule(id, winPl1, winPl2){

	let apiKey = 'b8oGEGQsdyeQ2SwEN1UlFxEqHlNFD7QEOeb56sqaanPk1s0mbl1oG5zlB2iVwCrG';

    var data = JSON.stringify(
		{
			"collection": "challenge",
			"database": "12casas",
			"dataSource": "Cluster0",
            "filter": { "_id": { "$oid": id }},
            "update": 
            {
                "$set": 
                {
                    "winPl1": winPl1,
                    "winPl2": winPl2,
                    "finish": 1
                }
            }
	});
				
	var config = {
		method: 'post',
		url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-bfyfs/endpoint/data/v1/action/updateOne',
		headers: {
		  'Content-Type': 'application/json',
		  'api-key': apiKey,
		},
		data: data
	};

	axios(config)
		.then(function (response) 
		{
            // console.log(JSON.stringify(response.data));
            showMsg('success');
		})
		.catch(function (error) {
            // console.log(error);
            showMsg('erro');
		});
}