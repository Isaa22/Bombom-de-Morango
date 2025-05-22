const form = document.getElementById('formComentario');
const comentarioInput = document.getElementById('comentario');
const listaComentarios = document.getElementById('listaComentarios');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const texto = comentarioInput.value.trim();
  if(texto === '') {
    alert('Por favor, escreva um comentário antes de enviar.');
    return;
  }

  const novoComentario = document.createElement('li');
  novoComentario.textContent = texto;
  listaComentarios.appendChild(novoComentario);

  comentarioInput.value = '';
});
