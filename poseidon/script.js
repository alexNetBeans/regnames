
// https://cloud.mongodb.com/v2/64aeb4c61a5ed506677e08b2#/metrics/replicaSet/64aeb51a7fa57d398c612073/explorer/teste/nomes/find
// DOCS: https://www.mongodb.com/docs/atlas/api/data-api-resources/


// -- END POINTS -- 

// inserir:   insertOne
// pesquisar: findOne / find
// deletar:   deleteOne
// atualizar: updateOne

// user: powerpackpw7 password: VP80MWnVwgFldLqL
let apiKey = 'b8oGEGQsdyeQ2SwEN1UlFxEqHlNFD7QEOeb56sqaanPk1s0mbl1oG5zlB2iVwCrG';

// pesquisa 

var data = JSON.stringify({
    "collection": "players",
    "database": "12casas",
    "dataSource": "Cluster0",
    "filter": {
        "wins": "0"
      },
      "limit": 10
  
});
            
var config = {
    method: 'post',
    url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-bfyfs/endpoint/data/v1/action/find',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    data: data
};

// Update

var data = JSON.stringify({
    "collection": "nomes",
    "database": "teste",
    "dataSource": "Cluster0",
    "filter": {
        "player": "Terry"
    },
    "update": {"wins": "10"}
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
            

// Gravar 

var data = JSON.stringify({
    "collection": "nomes",
    "database": "teste",
    "dataSource": "Cluster0",
    "document": {
        "player": 'Mai'
        
    }
});
            
var config = {
    method: 'post',
    url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-bfyfs/endpoint/data/v1/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    data: data
};

//  Pesquisa

var data = JSON.stringify({
    "collection": "nomes",
    "database": "teste",
    "dataSource": "Cluster0",
    "filter": {
        "wins": '5'
    }
});
            
var config = {
    method: 'post',
    url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-bfyfs/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    data: data
};

// 

var data = JSON.stringify({
    "collection": "nomes",
    "database": "teste",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-bfyfs/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
