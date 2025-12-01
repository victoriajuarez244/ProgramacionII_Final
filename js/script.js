console.log('🎨 Página de Diseño Gráfico cargada correctamente!');

// =========================
// PRELOADER
// =========================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800); // Espera 800ms antes de ocultar
    }
});

// =========================
// NAVEGACIÓN ACTIVA
// =========================
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

// =========================
// SMOOTH SCROLLING CON COMPENSACIÓN DE HEADER
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 120;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =========================
// ANIMACIONES AL HACER SCROLL
// =========================
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

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// =========================
// SELECT PERSONALIZADO
// =========================
document.addEventListener('DOMContentLoaded', function() {
    const customSelect = document.getElementById('custom-servicio');
    const trigger = customSelect.querySelector('.custom-select__trigger');
    const options = customSelect.querySelectorAll('.custom-select__options li');
    const hiddenSelect = document.getElementById('servicio');

    // Abrir/cerrar el select
    trigger.addEventListener('click', function() {
        customSelect.classList.toggle('open');
    });

    // Seleccionar opción
    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            // Actualizar texto visible
            trigger.querySelector('span').textContent = value;
            
            // Actualizar select oculto
            hiddenSelect.value = value;
            
            // Marcar como seleccionado
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Cerrar el select
            customSelect.classList.remove('open');
        });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
});

// =========================
// VALIDACIÓN DEL FORMULARIO
// =========================
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        
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
        
        showSuccessMessage();
        this.reset();
        
        // Resetear el select personalizado
        const customTrigger = document.querySelector('.custom-select__trigger span');
        if (customTrigger) {
            customTrigger.textContent = 'Remera';
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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
    
    setTimeout(() => {
        document.body.removeChild(successDiv);
    }, 3000);
}

// =========================
// DRAG & DROP FILE UPLOAD
// =========================
document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('archivo');
    const fileNameLabel = document.getElementById('drop-zone-file-name');

    if (!dropZone || !fileInput) return;

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files.length > 0) {
            fileNameLabel.textContent = fileInput.files[0].name;
        } else {
            fileNameLabel.textContent = '';
        }
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drop-zone--over');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drop-zone--over');
        });
    });

    dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            fileInput.files = files;
            fileNameLabel.textContent = files[0].name;
        }
    });
});

// =========================
// BOTÓN VOLVER ARRIBA
// =========================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #4C82D8;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.transform = 'scale(1)';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.transform = 'scale(0.8)';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =========================
// EFECTO HOVER EN BOTONES
// =========================
document.querySelectorAll('button, a[href="#contacto"]').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});