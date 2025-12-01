// Preloader simple 
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
    preloader.style.display = 'none';
    }, 500);
    }
});

// Detectar dispositivo móvil para ajustes específicos
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para móvil
if (isMobile()) {
    // Reducir animaciones en móvil para mejor performance
    document.querySelectorAll('*').forEach(el => {
    el.style.transition = el.style.transition.replace(/\d+\.?\d*s/g, '0.2s');
    });
}
console.log('🎨 Página de Diseño Gráfico cargada correctamente!');

// Efecto hover mejorado para botones
document.querySelectorAll('button, a[href="#contacto"]').forEach(button => {
    button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    });
});


// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
    target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
    });
    }
    });
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
    }
    });
}, observerOptions);

// Aplicar animaciones a elementos
document.addEventListener('DOMContentLoaded', function() {
    // Animar servicios y portfolio al aparecer
    const animatedElements = document.querySelectorAll('#servicios > div, #portfolio > div');
    animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
    });
});

// Validación del formulario
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validaciones básicas
    if (!nombre) {
    alert('Por favor, ingresá tu nombre');
    return;
    }
    
    if (!email || !isValidEmail(email)) {
    alert('Por favor, ingresá un email válido');
    return;
    }
    
    if (!mensaje) {
    alert('Por favor, describí tu proyecto');
    return;
    }
    
    // Simular envío exitoso
    showSuccessMessage();
    this.reset();
});

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
    <div style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #4CAF50;
    color: white;
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    text-align: center;
    font-size: 1.1rem;
    ">
    ✅ ¡Mensaje enviado correctamente!<br>
    <small>Te contactaremos pronto</small>
    </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remover mensaje después de 3 segundos
    setTimeout(() => {
    document.body.removeChild(successDiv);
    }, 3000);
}

// Efecto parallax suave en el header
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (scrolled > 100) {
    header.style.background = 'rgba(102, 126, 234, 0.95)'; // Puedes ajustar este color si quieres que sea el mismo que el degradado inicial
    header.style.backdropFilter = 'blur(10px)';
    } else {
    header.style.background = 'linear-gradient(135deg, #394357 0%, #4C5872 100%)'; // Corregido para que coincida con el CSS
    header.style.backdropFilter = 'none';
    }
});

// Contador animado para estadísticas (opcional)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start >= target) {
    element.textContent = target;
    clearInterval(timer);
    }
    }, 16);
}

// Botón "volver arriba" (se muestra al hacer scroll)
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    background: #667eea;\n    color: white;\n    border: none;\n    font-size: 20px;\n    cursor: pointer;\n    opacity: 0;\n    transition: all 0.3s ease;\n    z-index: 1000;\n    box-shadow: 0 5px 15px rgba(0,0,0,0.2);\n`;

document.body.appendChild(backToTopButton);

// Mostrar/ocultar botón según scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
    backToTopButton.style.opacity = '1';
    backToTopButton.style.transform = 'scale(1)';
    } else {
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transform = 'scale(0.8)';
    }
});

// Funcionalidad del botón volver arriba
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
});

// ====\n// Drag & Drop File Upload\n// ====\ndocument.addEventListener('DOMContentLoaded', function () {\n    const dropZone = document.getElementById('drop-zone');\n    const fileInput = document.getElementById('archivo');\n    const fileNameLabel = document.getElementById('drop-zone-file-name');\n\n    if (!dropZone || !fileInput) return;\n\n    // Al hacer clic en la zona, abrimos el selector de archivos\n    dropZone.addEventListener('click', () => {\n    fileInput.click();\n    });\n\n    // Cuando se selecciona archivo desde el diálogo\n    fileInput.addEventListener('change', () => {\n    if (fileInput.files && fileInput.files.length > 0) {\n    fileNameLabel.textContent = fileInput.files[0].name;\n    } else {\n    fileNameLabel.textContent = '';\n    }\n    });\n\n    // Evitar que el navegador abra el archivo\n    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {\n    dropZone.addEventListener(eventName, (e) => {\n    e.preventDefault();\n    e.stopPropagation();\n    });\n    });\n\n    // Estilos cuando el archivo está encima\n    ['dragenter', 'dragover'].forEach(eventName => {\n    dropZone.addEventListener(eventName, () => {\n    dropZone.classList.add('drop-zone--over');\n    });

    ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
    dropZone.classList.remove('drop-zone--over');
    });
    });

    // Manejar el archivo soltado
    dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
    fileInput.files = files;  // Asignar archivos al input
    fileNameLabel.textContent = files[0].name;
    }
    });

// Lógica para resaltar el link activo en el menú (movido desde index.html)
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
    current = section.getAttribute("id");
    }
    });

    navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
    link.classList.add("active");
    }
    });
});