/* ============================================
   CYBER DEFENSE PORTFOLIO - MAIN JAVASCRIPT
   ============================================ */

// Data structure for skills
const skillsData = [
    {
        title: 'Networking Fundamentals',
        icon: '🌐',
        category: 'Core Knowledge',
        skills: ['TCP/IP Stack', 'DNS', 'DHCP', 'Routing', 'Subnetting', 'OSI Model', 'Network Protocols']
    },
    {
        title: 'Linux & Windows Security',
        icon: '🐧',
        category: 'System Security',
        skills: ['User Management', 'Permissions', 'Firewalls', 'System Hardening', 'Log Analysis', 'Process Management']
    },
    {
        title: 'Web Vulnerabilities',
        icon: '⚠️',
        category: 'Web Security',
        skills: ['XSS (Cross-Site Scripting)', 'SQLi (SQL Injection)', 'CSRF', 'Session Management', 'Authentication Bypass', 'Encoding']
    },
    {
        title: 'Security Tools',
        icon: '🔧',
        category: 'Penetration Testing',
        skills: ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite Basics', 'Network Sniffer', 'Vulnerability Assessment']
    },
    {
        title: 'Python Security Scripts',
        icon: '🐍',
        category: 'Development',
        skills: ['Network Scanning', 'Port Scanner', 'Packet Analysis', 'Custom Tools', 'Automation', 'API Security']
    }
];

// Data structure for projects
const projectsData = [
    {
        title: 'Advanced Network Scanner',
        icon: '📡',
        description: 'A Python-based network scanning tool that identifies active hosts and services on a network.',
        technologies: ['Python', 'Nmap', 'Socket Programming', 'Threading'],
        features: [
            'Multi-threaded scanning',
            'Real-time host discovery',
            'Service detection',
            'Network mapping visualization'
        ]
    },
    {
        title: 'Port Scanner Utility',
        icon: '🔌',
        description: 'Efficient port scanner implementation with banner grabbing and service identification capabilities.',
        technologies: ['Python', 'Sockets', 'Asyncio', 'Threading'],
        features: [
            'Rapid port enumeration',
            'Banner grabbing',
            'Service version detection',
            'Custom port range support'
        ]
    },
    {
        title: 'Mini Security Lab',
        icon: '🧪',
        description: 'Containerized vulnerable application environment for practicing penetration testing and security analysis.',
        technologies: ['Docker', 'DVWA', 'Linux', 'WebServers'],
        features: [
            'Vulnerable web application',
            'Local network testing',
            'Safe practice environment',
            'Common vulnerabilities showcase'
        ]
    },
    {
        title: 'Cybersecurity OS UI Concept',
        icon: '💻',
        description: 'Futuristic UI design concept for an advanced cybersecurity operating system dashboard.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Three.js'],
        features: [
            'Real-time threat visualization',
            '3D network monitoring',
            'Interactive dashboard',
            'Modern glassmorphism design'
        ]
    }
];

// ============================================
// INITIALIZATION & DOM SETUP
// ============================================

class CyberPortfolio {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 5;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        this.setupSkillsGrid();
        this.setupProjectsGrid();
        this.setupEventListeners();
        this.setupBootAnimation();
        this.setupContactForm();
        this.setupNavigation();
        this.startSimulation();
        this.initScrollIndicators();
    }
    
    setupBootAnimation() {
        const bootOverlay = document.getElementById('bootOverlay');
        const loadingBar = document.getElementById('loadingBar');
        
        // Simulate loading progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                // Boot complete - hide overlay
                setTimeout(() => {
                    bootOverlay.style.opacity = '0';
                    bootOverlay.style.pointerEvents = 'none';
                }, 300);
            }
            loadingBar.style.width = progress + '%';
        }, 200);
    }
    
    setupSkillsGrid() {
        const skillsGrid = document.getElementById('skillsGrid');
        skillsGrid.innerHTML = '';
        
        skillsData.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-node glass-card';
            skillCard.innerHTML = `
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-title">${skill.title}</div>
                <div class="skill-category">${skill.category}</div>
            `;
            
            skillCard.addEventListener('click', () => this.openSkillModal(index));
            skillCard.addEventListener('mouseenter', (e) => this.addCardGlow(e));
            skillCard.addEventListener('mouseleave', (e) => this.removeCardGlow(e));
            
            skillsGrid.appendChild(skillCard);
        });
    }
    
    setupProjectsGrid() {
        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = '';
        
        projectsData.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card glass-card';
            projectCard.innerHTML = `
                <div class="project-icon">${project.icon}</div>
                <div class="project-title">${project.title}</div>
                <div class="project-description">${project.description}</div>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            `;
            
            projectCard.addEventListener('click', () => this.openProjectModal(index));
            projectCard.addEventListener('mouseenter', (e) => this.addCardGlow(e));
            projectCard.addEventListener('mouseleave', (e) => this.removeCardGlow(e));
            
            projectsGrid.appendChild(projectCard);
        });
    }
    
    addCardGlow(event) {
        const card = event.target.closest('.glass-card');
        if (card) {
            card.style.boxShadow = `
                0 8px 32px rgba(0, 0, 0, 0.5),
                0 0 50px rgba(0, 217, 255, 0.4),
                inset 0 0 30px rgba(0, 217, 255, 0.15)
            `;
        }
    }
    
    removeCardGlow(event) {
        const card = event.target.closest('.glass-card');
        if (card) {
            card.style.boxShadow = '';
        }
    }
    
    openSkillModal(index) {
        const skill = skillsData[index];
        const modal = document.getElementById('skillModal');
        
        document.getElementById('modalSkillTitle').textContent = skill.title;
        document.getElementById('modalSkillsList').innerHTML = skill.skills
            .map(s => `<span class="skill-tag">${s}</span>`)
            .join('');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    openProjectModal(index) {
        const project = projectsData[index];
        const modal = document.getElementById('projectModal');
        
        document.getElementById('modalProjectTitle').textContent = project.title;
        document.getElementById('modalProjectDesc').textContent = project.description;
        
        document.getElementById('modalProjectTechs').innerHTML = project.technologies
            .map(tech => `<span class="tech-badge">${tech}</span>`)
            .join('');
        
        document.getElementById('modalProjectFeatures').innerHTML = project.features
            .map(feature => `<li>${feature}</li>`)
            .join('');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitContactForm();
        });
        
        // Real-time validation
        document.getElementById('contactName').addEventListener('blur', () => this.validateName());
        document.getElementById('contactEmail').addEventListener('blur', () => this.validateEmail());
        document.getElementById('contactMessage').addEventListener('blur', () => this.validateMessage());
    }
    
    validateName() {
        const nameInput = document.getElementById('contactName');
        const nameError = document.getElementById('nameError');
        const name = nameInput.value.trim();
        
        if (name.length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
            nameInput.style.borderColor = '#ff0066';
            return false;
        }
        nameError.textContent = '';
        nameInput.style.borderColor = '';
        return true;
    }
    
    validateEmail() {
        const emailInput = document.getElementById('contactEmail');
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#ff0066';
            return false;
        }
        emailError.textContent = '';
        emailInput.style.borderColor = '';
        return true;
    }
    
    validateMessage() {
        const messageInput = document.getElementById('contactMessage');
        const messageError = document.getElementById('messageError');
        const message = messageInput.value.trim();
        
        if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = '#ff0066';
            return false;
        }
        messageError.textContent = '';
        messageInput.style.borderColor = '';
        return true;
    }
    
    submitContactForm() {
        // Validate all fields
        if (!this.validateName() || !this.validateEmail() || !this.validateMessage()) {
            return;
        }
        
        const submitBtn = document.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formStatus = document.getElementById('formStatus');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Simulate sending (in real implementation, would be actual API call)
        setTimeout(() => {
            // Get form data
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            // Log data (in real implementation, would send to server)
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            formStatus.textContent = '✓ Transmission successful! Your message has been encrypted and sent.';
            formStatus.classList.add('success');
            
            // Reset form
            setTimeout(() => {
                document.getElementById('contactForm').reset();
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                formStatus.textContent = '';
                formStatus.classList.remove('success');
            }, 3000);
        }, 1500);
    }
    
    startSimulation() {
        let threatCount = 0;
        let integrity = 100;
        
        // Animate threat counter
        setInterval(() => {
            threatCount = Math.floor(Math.random() * 12);
            document.getElementById('threatCount').textContent = threatCount;
            
            // Update defense status
            const status = threatCount < 5 ? 'ACTIVE' : threatCount < 10 ? 'ELEVATED' : 'CRITICAL';
            const statusElement = document.getElementById('defenseStatus');
            statusElement.textContent = status;
            
            // Update network integrity
            integrity = Math.max(95 - threatCount * 2, 60);
            document.getElementById('networkIntegrity').textContent = integrity.toFixed(0) + '%';
            
            // Update visual indicators
            if (threatCount > 8) {
                document.querySelector('.simulation-canvas').style.filter = 'hue-rotate(20deg)';
            } else {
                document.querySelector('.simulation-canvas').style.filter = 'none';
            }
        }, 2000);
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        // Navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Scroll to section
                const section = link.getAttribute('href');
                document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    initScrollIndicators() {
        const scrollDots = document.querySelectorAll('.scroll-dot');
        const sections = document.querySelectorAll('.section');
        
        // Update active dot on scroll
        window.addEventListener('scroll', () => {
            let currentSection = 0;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2) {
                    currentSection = index;
                }
            });
            
            scrollDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSection);
            });
        });
        
        // Click on dots to scroll to section
        scrollDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    setupEventListeners() {
        // Close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
        
        // Close on background click
        document.getElementById('skillModal').addEventListener('click', (e) => {
            if (e.target.id === 'skillModal') {
                this.closeSkillModal();
            }
        });
        
        document.getElementById('projectModal').addEventListener('click', (e) => {
            if (e.target.id === 'projectModal') {
                this.closeProjectModal();
            }
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLinks[index].classList.add('active');
                }
            });
        });
        
        // Add navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 14, 39, 0.95)';
                navbar.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 14, 39, 0.85)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    closeAllModals() {
        document.getElementById('skillModal').classList.remove('active');
        document.getElementById('projectModal').classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Global close functions
function closeSkillModal() {
    document.getElementById('skillModal').classList.remove('active');
    document.body.style.overflow = '';
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize portfolio on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new CyberPortfolio();
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll polyfill for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.addEventListener('click', function(e) {
        if (e.target.matches('[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'auto' });
            }
        }
    });
}

// Detect when user finishes scrolling for optimization
let scrollTimer;
window.addEventListener('scroll', () => {
    if (window.cyberScene && window.cyberScene.renderer) {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            // Resume full render quality after scrolling
        }, 150);
    }
});

// Prevent FOUC (Flash of Unstyled Content)
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Log to console that portfolio is loaded
console.log('%cCYBER DEFENSE CONTROL ROOM ONLINE', 'color: #00d9ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00d9ff;');
console.log('%cPortfolio Owner: Ashwin Mishra | Security Focused Developer', 'color: #8b5cf6; font-size: 12px;');
