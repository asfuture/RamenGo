
// Seleciona todos os botões de broth
var brothButtons = document.querySelectorAll('.cardapioBroth button');

// Adiciona evento de clique a cada botão de broth
brothButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Desmarca todos os botões de broth
        brothButtons.forEach(function(btn) {
            btn.classList.remove('selecionado');
        });
        // Marca o botão de broth clicado
        this.classList.add('selecionado');
    });
});

// Seleciona todos os botões de protein
var proteinButtons = document.querySelectorAll('.cardapioProteins button');

// Adiciona evento de clique a cada botão de protein
proteinButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Desmarca todos os botões de protein
        proteinButtons.forEach(function(btn) {
            btn.classList.remove('selecionado');
            btn.style.background = '#FAFAED';
        });
        // Marca o botão de protein clicado
        this.classList.add('selecionado');
        this.style.background = '#1820EF';
    });
});

 function fazerPedido() {
    //Buscando os valores seleciondos
    let valorSelecionado = document.getElementsByClassName('selecionado');
    //Validação dos item selecionados
    if(typeof valorSelecionado[0] !== 'undefined' && typeof valorSelecionado[1] !== 'undefined'){
        console.log("Variavel ok")
        //Atribuindo o item selecionado para a variavel fazer a requisição na API
    const selected_broth_id = valorSelecionado[0].value
    const selected_protein_id = valorSelecionado[1].value
        // EndPoint e chave da API
     const apiUrl = 'https://api.tech.redventures.com.br/order';
     const apiKey = 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf';
     const pedidoData = {
         "brothId": selected_broth_id,
         "proteinId": selected_protein_id
     };
     //Cabeçalho da requisição 
     const requestOptions = {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'x-api-key': apiKey
         },
         body:JSON.stringify(pedidoData)
     };

     fetch(apiUrl, requestOptions)
     .then(response => {
         if (!response.ok){
             throw new Error( 'Erro ao fazer a requisição');
         }
         return response.json();
     })
     .then( data => {
         console.log("Resposta da API: ", data);
         let description = document.getElementById('description');
         description.textContent = data.description 

         let image = document.getElementById('img');
         image.src = data.image
        
        // Chamando a função do modal
         modal();
     })
     .catch(error =>{
         console.error('Erro',  error);
     });
    }else{
        alert('Você precisa escolher as duas opções uma caldo e uma proteina.');
    }
 }

/* Modal */
function modal() {
    let modal = document.getElementById('pedidoModal');
    modal.style.display = 'block';
    let logo = document.getElementById('logo');
    console.log("valor logo ",logo);
    logo.style.position = 'fixed';

    let salt = document.getElementById('salt').value;
    console.log("valor div", salt);
    
        let valorSelecionado = document.getElementsByClassName('selecionado');
        console.log("valor selecionado", valorSelecionado[0].value,valorSelecionado[1].value);
}

let close = document.getElementsByClassName('close')[0];
close.onclick = function() {
    let modal = document.getElementById('pedidoModal');
    modal.style.display = 'none';
    location.reload(true)
}







