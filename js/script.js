    // ====== Page Navigation ======
    document.addEventListener('DOMContentLoaded', function() {
      const navButtons = document.querySelectorAll('.nav-btn[data-page]');
      const pageContents = document.querySelectorAll('.page-content');
      
      function showPage(pageId) {
        // Update active nav button
        navButtons.forEach(button => {
          button.classList.remove('active');
          if (button.getAttribute('data-page') === pageId) {
            button.classList.add('active');
          }
        });
        
        // Hide all pages
        pageContents.forEach(page => {
          page.classList.remove('active');
        });
        
        // Show selected page
        const activePage = document.getElementById(pageId + '-page');
        if (activePage) {
          activePage.classList.add('active');
          
          // Add entrance animation
          gsap.from(activePage.querySelectorAll('h1, .lead, .portfolio-category, #contact-form, .socials-section'), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
          });
        }
        
        // Update URL hash
        window.location.hash = pageId;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Add click event to nav buttons
      navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          const pageId = this.getAttribute('data-page');
          showPage(pageId);
        });
      });
      
      // Hire Me button functionality
      const hireMeBtn = document.getElementById('hire-me-btn');
      if (hireMeBtn) {
        hireMeBtn.addEventListener('click', function(e) {
          e.preventDefault();
          showPage('contact');
          
          // Smooth scroll to form after page transition
          setTimeout(() => {
            const formElement = document.getElementById('contact-form');
            if (formElement) {
              formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              
              // Pulse animation on the form
              gsap.fromTo(formElement, {
                scale: 1,
                boxShadow: '0 0 0 rgba(0, 238, 255, 0)'
              }, {
                scale: 1.03,
                boxShadow: '0 0 40px rgba(0, 238, 255, 0.4)',
                duration: 0.6,
                yoyo: true,
                repeat: 1
              });
            }
          }, 500);
        });
      }
      
      // View Work button functionality
      const viewWorkBtn = document.getElementById('view-work-btn');
      if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const pageId = this.getAttribute('data-page');
          showPage(pageId);
        });
      }
      
      // Check URL hash on load
      const hash = window.location.hash.substring(1);
      if (hash && document.getElementById(hash + '-page')) {
        showPage(hash);
      } else {
        showPage('home');
      }
    });

    // ====== Theme Switcher ======
    const themes = [
      { name: 'Electric Cyan', accent: '#00eeff', bg:'#050511', text:'#ffffff' },
      { name: 'Neon Purple', accent: '#a855f7', bg:'#0a0714', text:'#f3e9ff' },
      { name: 'Cyber Pink', accent: '#ff00ff', bg:'#100514', text:'#ffe6ff' },
      { name: 'Solar Gold', accent: '#ffb347', bg:'#110c05', text:'#fff7e6' },
      { name: 'Matrix Green', accent: '#00ff41', bg:'#051105', text:'#e6ffe6' },
      { name: 'Arctic Blue', accent: '#00b4d8', bg:'#05111a', text:'#e6f7ff' }
    ];

    let currentThemeIndex = 0;

    // Theme switcher button functionality
    const themeSwitcher = document.getElementById('theme-switcher');
    
    function applyTheme(index) {
      currentThemeIndex = index;
      const t = themes[index];
      
      // Update CSS variables
      document.documentElement.style.setProperty('--accent', t.accent);
      document.documentElement.style.setProperty('--accent-glow', `0 0 20px ${t.accent}70`);
      
      // Update background gradient
      if(t.name === 'Solar Gold') {
        document.body.style.background = 'radial-gradient(ellipse at top, #110c05 0%, #0a0803 40%, #000000 100%)';
      } else {
        const bgColor = t.bg;
        document.body.style.background = `radial-gradient(ellipse at top, ${bgColor} 0%, ${darkenColor(bgColor, 20)} 40%, #000000 100%)`;
      }
      
      // Update gradient overlay
      document.body.style.setProperty('--bg-primary', t.bg);
      
      // Animate logo and accent elements
      gsap.to('.logo, .btn, .portfolio-btn, .cv-btn', {
        boxShadow: `0 0 25px ${t.accent}90`,
        duration: 0.7
      });
      
      // Animate title
      gsap.fromTo('.title', {
        backgroundPosition: '0% center'
      }, {
        backgroundPosition: '200% center',
        duration: 0.01,
        onComplete: function() {
          gsap.set('.title', { background: `linear-gradient(90deg, #fff, ${t.accent}, #fff)` });
        }
      });
      
      // Update theme switcher button color
      themeSwitcher.style.background = `linear-gradient(135deg, ${t.accent}, ${darkenColor(t.accent, 30)})`;
      
      // Update Three.js particles color if they exist
      if(particles && particles.material){
        try {
          particles.material.color = new THREE.Color(t.accent);
        } catch(e) {}
      }
    }

    function darkenColor(color, percent) {
      const num = parseInt(color.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) - amt;
      const G = (num >> 8 & 0x00FF) - amt;
      const B = (num & 0x0000FF) - amt;
      return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    // Single theme switcher button click handler
    themeSwitcher.addEventListener('click', function() {
      // Cycle to next theme
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      applyTheme(currentThemeIndex);
      
      // Add click animation
      gsap.fromTo(themeSwitcher, {
        rotation: 0,
        scale: 1
      }, {
        rotation: 360,
        scale: 1.1,
        duration: 0.5,
        onComplete: () => {
          gsap.to(themeSwitcher, {
            scale: 1,
            duration: 0.2
          });
        }
      });
    });

    // Set initial theme
    applyTheme(0);

    // ====== Year ======
    document.getElementById('year').textContent = new Date().getFullYear();

    // ====== Formspree Contact Form ======
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if(form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            form.reset();
            
            // Celebration animation
            gsap.fromTo(formStatus, {
              scale: 0.8,
              opacity: 0
            }, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(1.7)'
            });
            
            // Confetti effect
            createConfetti();
          } else {
            formStatus.textContent = '❌ Oops! There was a problem sending your message. Please try again.';
            formStatus.className = 'form-status error';
          }
        } catch (error) {
          formStatus.textContent = '❌ Oops! There was a problem sending your message. Please try again.';
          formStatus.className = 'form-status error';
        } finally {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          // Scroll to form status
          formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
    
    function createConfetti() {
      const confettiCount = 50;
      const colors = ['#00eeff', '#ff00ff', '#ffff00', '#00ff41', '#ffb347'];
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        
        gsap.to(confetti, {
          y: window.innerHeight + 10,
          x: (Math.random() - 0.5) * 200,
          rotation: Math.random() * 360,
          duration: 1 + Math.random() * 2,
          ease: 'power2.out',
          onComplete: () => confetti.remove()
        });
      }
    }

    // ====== Three.js animated background ======
    let scene, camera, renderer, particles, pulseGroup;
    
    function initThree() {
      const canvas = document.getElementById('bg-canvas');
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.z = 300;
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create particles with more dynamic behavior
      const geometry = new THREE.BufferGeometry();
      const count = 800;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const color = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#00eeff');
      
      for(let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const mat = new THREE.PointsMaterial({
        size: 3,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true
      });
      
      particles = new THREE.Points(geometry, mat);
      scene.add(particles);

      // Create floating geometry
      const torusGeometry = new THREE.TorusGeometry(80, 20, 16, 100);
      const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x00eeff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.set(-300, 100, -200);
      scene.add(torus);

      // Create pulse rings
      pulseGroup = new THREE.Group();
      for(let i = 0; i < 5; i++) {
        const ringGeometry = new THREE.RingGeometry(40 + i * 20, 42 + i * 20, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x00eeff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.05
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        pulseGroup.add(ring);
      }
      pulseGroup.position.set(300, -100, -300);
      scene.add(pulseGroup);

      // Add subtle fog
      scene.fog = new THREE.Fog(0x050511, 800, 1500);

      // Handle window resize
      onWindowResize();
      window.addEventListener('resize', onWindowResize);
      
      // Start animation
      animate();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let time = 0;
    function animate() {
      time += 0.01;
      
      // Animate particles
      if(particles) {
        particles.rotation.y = time * 0.2;
        particles.rotation.x = Math.sin(time * 0.1) * 0.1;
        
        // Pulse particle size
        const positions = particles.geometry.attributes.position.array;
        for(let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time + i) * 0.1;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }
      
      // Animate pulse rings
      if(pulseGroup) {
        pulseGroup.rotation.y += 0.005;
        pulseGroup.children.forEach((ring, i) => {
          ring.scale.setScalar(1 + Math.sin(time * 0.5 + i) * 0.1);
          ring.material.opacity = 0.05 + Math.sin(time + i) * 0.03;
        });
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    // Initialize Three.js when page loads
    window.addEventListener('load', function() {
      try {
        initThree();
      } catch(e) {
        console.warn('Three.js failed to initialize', e);
      }

      // Initialize GSAP animations
      if(typeof gsap !== 'undefined') {
        // Hero entrance animation
        gsap.from('.hero-left', {
          y: 60,
          opacity: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out'
        });
        
        gsap.from('.profile-card-small', {
          x: -40,
          opacity: 0,
          duration: 1,
          delay: 0.6,
          ease: 'power3.out'
        });
        
        gsap.from('.video-container-9-16', {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: 0.8,
          ease: 'power3.out'
        });
        
        gsap.from('.note-card', {
          x: 40,
          opacity: 0,
          duration: 1,
          delay: 1,
          ease: 'power3.out'
        });
        
        gsap.from('.card', {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: 0.9,
          ease: 'power3.out'
        });
        
        // Initialize ScrollTrigger animations
        if(typeof ScrollTrigger !== 'undefined') {
          gsap.utils.toArray('section, .skill, .portfolio-category').forEach((el, i) => {
            gsap.from(el, {
              opacity: 0,
              y: 80,
              duration: 1.2,
              delay: 0.1 * i,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            });
          });
          
          ScrollTrigger.refresh();
        }
      }
    });

    // Observe theme changes to update Three.js particles
    const observer = new MutationObserver(function() {
      if(particles && particles.material) {
        try {
          const newColor = new THREE.Color(
            getComputedStyle(document.documentElement)
              .getPropertyValue('--accent')
              .trim()
          );
          
          particles.material.color = newColor;
          
          // Update particle colors
          const colors = particles.geometry.attributes.color.array;
          for(let i = 0; i < colors.length; i += 3) {
            colors[i] = newColor.r;
            colors[i + 1] = newColor.g;
            colors[i + 2] = newColor.b;
          }
          particles.geometry.attributes.color.needsUpdate = true;
        } catch(e) {}
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

