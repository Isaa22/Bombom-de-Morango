document.addEventListener('DOMContentLoaded', function() {
  // ================= CARROSSEL =================
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const indicators = document.querySelectorAll('.indicador');
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;

  // Funções do carrossel
  function initCarousel() {
    updateCarousel();
    startAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(moveToNextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Atualiza indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('ativo', index === currentIndex);
    });
  }

  // Event listeners do carrossel
  prevBtn.addEventListener('click', () => {
    moveToPrevSlide();
    resetAutoSlide();
  });
  
  nextBtn.addEventListener('click', () => {
    moveToNextSlide();
    resetAutoSlide();
  });
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
      resetAutoSlide();
    });
  });

  // Inicializa o carrossel
  initCarousel();

  // ================= SISTEMA DE COMENTÁRIOS ==================
  const form = document.getElementById('formComentario');
  const comentarioInput = document.getElementById('comentario');
  const listaComentarios = document.getElementById('listaComentarios');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = comentarioInput.value.trim();
    
    if(!texto) {
      alert('Por favor, escreva um comentário antes de enviar.');
      return;
    }

    adicionarComentario(texto);
    comentarioInput.value = '';
  });

  function adicionarComentario(texto) {
    const novoComentario = document.createElement('li');
    novoComentario.textContent = texto;
    novoComentario.className = 'comentario-item';
    
    // Adiciona animação
    novoComentario.style.opacity = '0';
    listaComentarios.prepend(novoComentario);
    
    setTimeout(() => {
      novoComentario.style.transition = 'opacity 0.3s ease';
      novoComentario.style.opacity = '1';
    }, 10);
  }

  // Estilo dinâmico para comentários
  if (!document.querySelector('#comentario-style')) {
    const style = document.createElement('style');
    style.id = 'comentario-style';
    style.textContent = `
      .comentario-item {
        background: #eac9ce;
        margin-bottom: 0.7rem;
        padding: 0.7rem 1rem;
        border-radius: 15px;
        font-style: italic;
        font-size: 1rem;
        color: #4a1c2e;
        box-shadow: inset 0 2px 5px rgba(255, 255, 255, 0.3);
      }
    `;
    document.head.appendChild(style);
  }
});
