/*
    API: https://api.sheetmonkey.io/form/8wyQmfkRkC57KichHUZN1G
*/

let numberNames;
let lastName = [];

let indexInitial = 1;
let indexFinal   = 5;
let indexMax;


function updateListNames(){
  
  let nameLinha = $('#tableNames');
  nameLinha.empty();

  for (let i = indexInitial; i <= indexFinal; i++){
		nameLinha.append('<tr><td width="700px">' + lastName[i]);	
    }
    
    nameLinha.append('<tr><td>');	
}


function showWarn(){

   let html = '<div class="alert alert-danger" id="w" role="alert">Digite um nome para efetuar o registro!</div>';
   $('#warn').prepend(html);

   setTimeout(() => {
    $('#w').remove();
  }, 2500);

  $('#nome').focus();
}


// Registra nome na tabela

function setNome(){
  
  let api = 'https://api.sheetmonkey.io/form/8wyQmfkRkC57KichHUZN1G';

  let novoNome = $('#nome').val();

  if (novoNome == '')
  {
    showWarn();
  }
  else{
      const data = {
        Nome: novoNome
      };

      fetch(api ,{
         method: 'POST',
         headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => 
    {
      
     if (result.ok){

        alert('Registro efetuado com Sucesso !');

        $('#nome').focus();
        $('#nome').val('');
     }
     else{
       alert ('Ocorreu um erro !');
     }

    });
}}

// Botão para registrar 

let sub = $('#submit').on('click', function()
{
  setNome();
});

// Botões de paginação de nomes

let previous = $('#ant').on('click', function(){

  if ( indexInitial > 1)
  {
    indexInitial = indexInitial - 5;
    indexFinal   = indexFinal - 5;

    updateListNames();
  }

});

let next = $('#prox').on('click', function(){

  console.log(indexInitial + ' = ' + indexFinal)
  
  if (indexFinal < indexMax)
  {
    indexInitial = indexInitial + 5;
    indexFinal   = indexFinal + 5; 

    updateListNames();
  }
  
});

// Faz o parser do objeto

function parser({table}){
  return table.rows
    .map(row => [ ...table.cols.map((col, index) => ({[col.label]: row.c[index].v,}))])
    .map(data => data.reduce((acc, value) =>  ({...acc, ...value}), {}))
}

  // Recupera número de nomes registrados na Planilha

async function getNumberNames() {
  const spreadsheetID = '1m7ksyR82ofmWZiQXE1PyHT-P4mpjyEHX9f6GsB7-Kqg';
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json`;
 
     let data = await fetch(url)
    .then(res => res.text())
    .then(text => JSON.parse(text.substr(47).slice(0, -2)));

    numberNames = data.table.rows.length - 1;
    $('#numberNames').text(numberNames);  
    
    data.table.rows.forEach(value => {
     //  console.log(value.c[0].v);
    });
};

// Retorna os últimos 10 nomes

async function getLastNames() {
  const spreadsheetID = '1m7ksyR82ofmWZiQXE1PyHT-P4mpjyEHX9f6GsB7-Kqg';
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json`;
 
     let i =  0;
     let iM = 0;
     let nameLinha = $('#tableNames');

     let data = await fetch(url)
    .then(res => res.text())
    .then(text => JSON.parse(text.substr(47).slice(0, -2)));

    numberNames = data.table.rows.length - 1;
    iM = numberNames - 10;

    $('#numberNames').text(numberNames);  
    
      data.table.rows.forEach(function(value, index){
     //console.log(value.c[0].v + '->' + index);

      if (iM <= index)
      {
          lastName[i] = value.c[0].v;
          nameLinha.prepend('<tr><td width="700px">' + lastName[i]);
          i++; 
      }
    });
};

 // Recupera lista completa de nomes

async function getFullListNames() {
  const spreadsheetID = '1m7ksyR82ofmWZiQXE1PyHT-P4mpjyEHX9f6GsB7-Kqg';
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json`;
 
     let i =  0;
     let iM = 0;
     let nameLinha = $('#tableNames');

     let data = await fetch(url)
    .then(res =>  res.text())
    .then(text => JSON.parse(text.substr(47).slice(0, -2)));

    numberNames = data.table.rows.length;
    indexMax    = numberNames - 1;
    iM = numberNames - 10;

    $('#numberNames').text(numberNames);  
    
      data.table.rows.forEach(function(value, index){
      lastName[i] = value.c[0].v;
      i++; 

    });
	
	for (let i = indexInitial; i <= indexFinal; i++){
		nameLinha.prepend('<tr><td width="700px">' + lastName[i]);	
	  }
};

