// Función genérica para cargar componentes HTML
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error('Error al cargar el componente:', error);
  }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Cargar header y footer en paralelo
  await Promise.all([
    loadComponent('header-container', 'components/header.html'),
    loadComponent('footer-container', 'components/footer.html')
  ]);

  // 2. Actualizar el año dinámicamente en el footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Marcar automáticamente el enlace activo según la página actual
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar a');
  
  navLinks.forEach(link => {
    // Si el href coincide con la página actual, le añadimos la clase active
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});