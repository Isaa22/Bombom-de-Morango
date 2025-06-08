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

  // Initialize the carousel
  function initCarousel() {
    updateCarousel();
    startAutoSlide();
  }

  // Start auto slide rotation
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      moveToNextSlide();
    }, 5000);
  }

  // Reset auto slide timer
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Move to next slide
  function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  // Move to previous slide
  function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Update carousel display
  function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('ativo', index === currentIndex);
    });
  }

  // Event listeners for carousel
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

  // Initialize the carousel
  initCarousel();

  // ================= SISTEMA DE COMENTÁRIOS =================
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
    
    // Adiciona classes CSS para manter o estilo
    novoComentario.className = 'comentario-item';
    listaComentarios.prepend(novoComentario);

    // Limpa o campo de input
    comentarioInput.value = '';
    
    // Adiciona animação de fade in
    novoComentario.style.opacity = 0;
    setTimeout(() => {
      novoComentario.style.transition = 'opacity 0.3s ease';
      novoComentario.style.opacity = 1;
    }, 10);
  });

  // Adiciona estilo para novos comentários
  const style = document.createElement('style');
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
});
