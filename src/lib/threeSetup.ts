import * as THREE from 'three'
// import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// import gsap from 'gsap'

export const setupThree = (canvas: HTMLCanvasElement) => {
	const loader = new GLTFLoader()

	loader.load('/models/blackhole/scene.gltf', (gltf) => {
		const parameters = {
			materialColor: '#ffeded',
		}

		// Scene
		const scene = new THREE.Scene()

		// 3d Model
		let model = gltf.scene

		model.scale.set(0.8, 0.8, 0.8)
		model.rotation.set(Math.PI / 30,0, Math.PI / 70)
		model.position.set(0, -1, 0)
		// scene.add(model)
		

		const mixer = new THREE.AnimationMixer(model)
		const animationClip = gltf.animations[0]
		const action = mixer.clipAction(animationClip)

		// Start playing the animation immediately
		action.play()

		// Update the animation mixer in your render loop
		function animate() {
			requestAnimationFrame(animate)
			mixer.update(0.01) // You can adjust the time delta as needed
			// Your other rendering logic goes here
		}
		animate()

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
		scene.add(ambientLight)

		const pointLight = new THREE.PointLight(0xffffff, 0.5)
		pointLight.position.x = 2
		pointLight.position.y = 3
		pointLight.position.z = 4
		scene.add(pointLight)

		/**
		 * Particles
		 */
		// Geometry
		const particlesCount = 500
		const positions = new Float32Array(particlesCount * 3)

		for (let i = 0; i < particlesCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 10
			positions[i * 3 + 1] =
				2 - Math.random() * 4
			positions[i * 3 + 2] = (Math.random() - 0.5) * 10
		}

		const particlesGeometry = new THREE.BufferGeometry()
		particlesGeometry.setAttribute(
			'position',
			new THREE.BufferAttribute(positions, 3)
		)

		// Texture
		const textureLoader = new THREE.TextureLoader()
		const discTexture = textureLoader.load('textures/disc.png')

		// Material
		const particlesMaterial = new THREE.PointsMaterial({
			// color: parameters.materialColor,
			alphaMap: discTexture,
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			sizeAttenuation: true,
			size: 0.05,
		})

		// Points
		const particles = new THREE.Points(particlesGeometry, particlesMaterial)
		scene.add(particles)

		/**
		 * Lights
		 */
		const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
		directionalLight.position.set(1, 1, 0)
		scene.add(directionalLight)

		/**
		 * Sizes
		 */
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		}

		window.addEventListener('resize', () => {
			// Update sizes
			sizes.width = window.innerWidth
			sizes.height = window.innerHeight

			// Update camera
			camera.aspect = sizes.width / sizes.height
			camera.updateProjectionMatrix()

			// Update renderer
			renderer.setSize(sizes.width, sizes.height)
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})

		/**
		 * Camera
		 */
		//Group
		const cameraGroup = new THREE.Group()
		scene.add(cameraGroup)

		// Base camera
		const camera = new THREE.PerspectiveCamera(
			35,
			sizes.width / sizes.height,
			0.1,
			100
		)
		// camera.position.set(-2, 0, 6)
		camera.position.z = 8
		cameraGroup.add(camera)
		
		// Controls
		const controls = new OrbitControls(camera, canvas)
		controls.enableDamping = true
		
		/**
		 * Renderer
		 */
		const renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			alpha: true,
		})
		// renderer.setClearAlpha(0.3)
		renderer.outputColorSpace = THREE.LinearSRGBColorSpace
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		/**
		 * Scroll
		 */
		let scrollY = window.scrollY
		let currentSection = 0

		window.addEventListener('scroll', () => {
			scrollY = window.scrollY

			const newSection = Math.round(scrollY / sizes.height)

			if (newSection != currentSection) {
				currentSection = newSection

				// tweeen
				// gsap.to(sectionMeshes[currentSection].rotation, {
				// 	duration: 1.5,
				// 	ease: 'power2.inOut',
				// 	x: '+=6',
				// 	y: '+=3',
				// 	z: '+=1.5',
				// })
			}
		})

		/**
		 * Cursor
		 */
		const cursor = {
			x: 0,
			y: 0,
		}

		window.addEventListener('mousemove', (event) => {
			cursor.x = event.clientX / sizes.width - 0.5
			cursor.y = event.clientY / sizes.height - 0.5
		})

		/**
		 * Animate
		 */
		const clock = new THREE.Clock()
		// let deltaTime = 0
		let previousTime = 0

		const tick = () => {
			const elapsedTime = clock.getElapsedTime()
			// deltaTime = elapsedTime - deltaTime
			// console.log(deltaTime);
			const deltaTime = elapsedTime - previousTime
			previousTime = elapsedTime

			// Animate camera
			camera.position.y = (-scrollY / sizes.height) * 4

			const parallaxX = cursor.x * 0.2
			const parallaxY = -cursor.y * 0.2
			// cameraGroup.position.x = parallaxX * 0.5
			// cameraGroup.position.y = parallaxY * 0.5
			cameraGroup.position.x +=
				(parallaxX - cameraGroup.position.x) * 3 * deltaTime
			cameraGroup.position.y +=
				(parallaxY - cameraGroup.position.y) * 3 * deltaTime

			// Animated model
			
			model.scale.x += Math.sin(elapsedTime * 0.1) * 0.0003
			model.scale.y += Math.sin(elapsedTime * 0.1) * 0.0001
			
			// Update controls
			controls.update()
			
			// Render
			renderer.render(scene, camera)

			// Call tick again on the next frame
			window.requestAnimationFrame(tick)
		}

		tick()
	})
}
