/* ============================================
   CYBER DEFENSE PORTFOLIO - THREE.JS SCENE
   ============================================ */

class CyberDefenseScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        this.init();
    }
    
    init() {
        const container = document.getElementById('canvas-container');
        
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        container.appendChild(this.renderer.domElement);
        
        // Setup camera
        this.camera.position.z = 5;
        this.camera.lookAt(0, 0, 0);
        
        // Create scene elements
        this.createLights();
        this.createGlobe();
        this.createNetworkNodes();
        this.createShield();
        this.createParticleSystem();
        this.createFloatingElements();
        
        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        // Start animation loop
        this.animate();
    }
    
    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x4444ff, 0.5);
        this.scene.add(ambientLight);
        
        // Point light - Cyan
        const pointLight1 = new THREE.PointLight(0x00d9ff, 1.5, 100);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);
        
        // Point light - Purple
        const pointLight2 = new THREE.PointLight(0x8b5cf6, 1, 100);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);
        
        // Directional light for shadow
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(0, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }
    
    createGlobe() {
        // Create globe with wireframe and solid geometry
        const geometry = new THREE.IcosahedronGeometry(1.5, 32);
        
        // Wireframe material
        const wireframeMaterial = new THREE.MeshPhongMaterial({
            color: 0x00d9ff,
            emissive: 0x00d9ff,
            wireframe: true,
            wireframeLinewidth: 2,
            transparent: true,
            opacity: 0.8
        });
        
        this.globe = new THREE.Mesh(geometry, wireframeMaterial);
        this.globe.position.set(-3, 0, 0);
        this.globe.castShadow = true;
        this.scene.add(this.globe);
        
        // Add solid sphere inside for glow
        const solidGeometry = new THREE.IcosahedronGeometry(1.4, 16);
        const solidMaterial = new THREE.MeshPhongMaterial({
            color: 0x003366,
            emissive: 0x004488,
            transparent: true,
            opacity: 0.2
        });
        
        const solidGlobe = new THREE.Mesh(solidGeometry, solidMaterial);
        solidGlobe.position.set(-3, 0, 0);
        this.scene.add(solidGlobe);
    }
    
    createNetworkNodes() {
        this.networkNodes = new THREE.Group();
        
        // Create multiple nodes around the scene
        const nodePositions = [
            { pos: [2, 2, -2], color: 0x00d9ff },
            { pos: [2, -2, -2], color: 0x8b5cf6 },
            { pos: [-2, 2, -2], color: 0x00ff99 },
            { pos: [-2, -2, -2], color: 0x00d9ff },
            { pos: [0, 3, 0], color: 0x8b5cf6 }
        ];
        
        this.nodes = [];
        
        nodePositions.forEach((nodeData, index) => {
            const geometry = new THREE.SphereGeometry(0.3, 16, 16);
            const material = new THREE.MeshPhongMaterial({
                color: nodeData.color,
                emissive: nodeData.color,
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });
            
            const node = new THREE.Mesh(geometry, material);
            node.position.set(...nodeData.pos);
            node.originalPosition = nodeData.pos;
            node.color = nodeData.color;
            node.castShadow = true;
            
            this.networkNodes.add(node);
            this.nodes.push(node);
        });
        
        this.scene.add(this.networkNodes);
        
        // Create connecting lines
        this.createNetworkLines();
    }
    
    createNetworkLines() {
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00d9ff,
            transparent: true,
            opacity: 0.4,
            linewidth: 1
        });
        
        // Connect nodes to create network
        for (let i = 0; i < this.nodes.length - 1; i++) {
            const points = [
                this.nodes[i].position,
                this.nodes[i + 1].position
            ];
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            this.networkNodes.add(line);
        }
    }
    
    createShield() {
        // Create a protective shield visualization
        const shieldGroup = new THREE.Group();
        
        // Outer ring
        const ringGeometry = new THREE.TorusGeometry(2, 0.2, 16, 32);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0066,
            emissive: 0xff0066,
            transparent: true,
            opacity: 0.6
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2.5;
        shieldGroup.add(ring);
        
        // Inner protective layer
        const shieldGeometry = new THREE.DodecahedronGeometry(1, 1);
        const shieldMaterial = new THREE.MeshPhongMaterial({
            color: 0x00d9ff,
            emissive: 0x00d9ff,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        
        const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
        shieldGroup.add(shield);
        
        shieldGroup.position.set(3, 0, 0);
        this.shield = shieldGroup;
        this.scene.add(shieldGroup);
    }
    
    createParticleSystem() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;      // x
            positions[i + 1] = (Math.random() - 0.5) * 20;  // y
            positions[i + 2] = (Math.random() - 0.5) * 20;  // z
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x00d9ff,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });
        
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
        
        // Store initial positions for animation
        this.particlesPositions = positions;
    }
    
    createFloatingElements() {
        this.floatingElements = new THREE.Group();
        
        // Create small rotating cubes
        for (let i = 0; i < 3; i++) {
            const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
            const material = new THREE.MeshPhongMaterial({
                color: i % 2 === 0 ? 0x8b5cf6 : 0x00d9ff,
                emissive: i % 2 === 0 ? 0x8b5cf6 : 0x00d9ff,
                wireframe: true,
                transparent: true,
                opacity: 0.7
            });
            
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                Math.cos(i * Math.PI * 2 / 3) * 4,
                Math.sin(i * Math.PI * 2 / 3) * 4,
                Math.cos(i * Math.PI) * 2
            );
            cube.userData.originalPos = cube.position.clone();
            cube.userData.floatSpeed = 1 + Math.random() * 0.5;
            cube.userData.rotSpeed = Math.random() * 0.01 + 0.003;
            
            this.floatingElements.add(cube);
        }
        
        this.scene.add(this.floatingElements);
    }
    
    onMouseMove(event) {
        this.mouseX = event.clientX / window.innerWidth;
        this.mouseY = event.clientY / window.innerHeight;
    }
    
    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.0001;
        
        // Rotate globe
        if (this.globe) {
            this.globe.rotation.x += 0.0003;
            this.globe.rotation.y += 0.0005;
        }
        
        // Rotate network nodes
        if (this.networkNodes) {
            this.networkNodes.rotation.x = Math.sin(time) * 0.5;
            this.networkNodes.rotation.y += 0.0005;
        }
        
        // Animate individual nodes with pulsing effect
        this.nodes.forEach((node, index) => {
            const scale = 1 + Math.sin(time * 3 + index) * 0.2;
            node.scale.set(scale, scale, scale);
        });
        
        // Rotate shield
        if (this.shield) {
            this.shield.rotation.x += 0.002;
            this.shield.rotation.y += 0.003;
            this.shield.rotation.z += 0.001;
        }
        
        // Animate particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += Math.sin(time + i) * 0.01;     // x
                positions[i + 1] += Math.cos(time + i) * 0.01; // y
                positions[i + 2] += Math.sin(time * 0.5 + i) * 0.005; // z
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Animate floating elements
        this.floatingElements.children.forEach((cube, index) => {
            const originalPos = cube.userData.originalPos;
            cube.position.x = originalPos.x + Math.sin(time * cube.userData.floatSpeed) * 0.5;
            cube.position.y = originalPos.y + Math.cos(time * cube.userData.floatSpeed) * 0.5;
            
            cube.rotation.x += cube.userData.rotSpeed;
            cube.rotation.y += cube.userData.rotSpeed * 1.5;
            cube.rotation.z += cube.userData.rotSpeed * 0.7;
        });
        
        // Mouse-based parallax effect
        const targetX = (this.mouseX || 0.5) * 0.5;
        const targetY = (this.mouseY || 0.5) * 0.5;
        
        this.camera.position.x += (targetX - this.camera.position.x) * 0.01;
        this.camera.position.y += (targetY - this.camera.position.y * -1) * 0.01;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scene when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cyberScene = new CyberDefenseScene();
});
