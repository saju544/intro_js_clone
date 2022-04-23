const modalTemplate = document.querySelector('#modal')

export default class IntroModal extends HTMLElement {
	#closeBtn
	#backBtn
	#nextBtn
	#heading
	#description
	#introElements
	#introDescriptions
	#currentIndex
	#backdropElement
	#initialDescription
	#progressbar
	#dots
	#previousIndex
	constructor(
		introElements,
		introDescriptions,
		initialDescription = {
			heading: 'Start Intro',
			description: 'Lets satrt the introduction',
		}
	) {
		super()
		const root = this.attachShadow({ mode: 'open' })
		root.append(modalTemplate.content.cloneNode(true))
		this.#closeBtn = root.querySelector('.close-btn')
		this.#backBtn = root.querySelector('.back-btn')
		this.#nextBtn = root.querySelector('.next-btn')
		this.#heading = root.querySelector('.heading')
		this.#description = root.querySelector('.description')
		this.#progressbar = root.querySelector('.progess-bar')
		this.#dots = []
		this.#initialDescription = initialDescription
		this.#backdropElement = null
		this.#introElements = introElements
		this.#introDescriptions = introDescriptions
		this.#currentIndex = -1
		this.#previousIndex = 0
	}
	connectedCallback() {
		this.#setInitiateState()
		this.#createBackdrop()

		this.#closeBtn.addEventListener('click', () => {
			this.end()
		})

		document.addEventListener('click', (ev) => {
			if (ev.target === this) {
				return
			}
			this.end()
		})

		this.#backBtn.addEventListener('click', () => {
			this.#currentIndex--
			if (this.#currentIndex < 0) {
				this.#currentIndex = 0
				return
			}
			this.#previousIndex = this.#currentIndex + 1
			this.#handelClick()
		})

		this.#nextBtn.addEventListener('click', () => {
			this.#currentIndex++
			if (this.#currentIndex >= this.#introElements.length) {
				this.#currentIndex = this.#introElements.length - 1
				return
			}
			this.#previousIndex = this.#currentIndex - 1
			this.#handelClick()
		})
	}

	#setInitiateState() {
		this.#description.textContent = this.#initialDescription.description
		this.#heading.textContent = this.#initialDescription.heading

		this.style.top = `${window.innerHeight / 2 - this.offsetHeight / 2}px`
		this.style.left = `${window.innerWidth / 2 - this.offsetWidth / 2}px`

		for (let i = 0; i < this.#introElements.length; i++) {
			const dot = document.createElement('div')
			this.#dots.push(dot)
			this.#progressbar.append(dot)
		}
	}

	#handelClick() {
		const currentIntroElement = this.#introElements[this.#currentIndex]
		this.#description.textContent =
			this.#introDescriptions[this.#currentIndex].description
		this.#heading.textContent =
			this.#introDescriptions[this.#currentIndex].heading

		const { top, left, right, height, width, bottom } =
			currentIntroElement.getBoundingClientRect()
		const scrollHeight = document.documentElement.scrollHeight
		const scrollTop = document.documentElement.scrollTop

		this.#backdropElement.style.top = `${scrollTop + top}px`
		this.#backdropElement.style.left = `${left}px`
		this.#backdropElement.style.height = `${height}px`
		this.#backdropElement.style.width = `${width}px`
		const modalHeight = this.offsetHeight
		const modalWidth = this.offsetWidth

		if (window.innerHeight - height <= modalHeight * 2) {
			this.style.top = `${
				document.documentElement.scrollTop +
				top +
				height / 2 -
				modalHeight / 2
			}px`
		} else if (scrollHeight - (scrollTop + bottom) >= modalHeight + 10) {
			this.style.top = `${
				document.documentElement.scrollTop + top + height + 10
			}px`
		} else {
			this.style.top = `${
				document.documentElement.scrollTop + top - (modalHeight + 10)
			}px`
		}

		if (left >= modalWidth + 10) {
			this.style.left = `${left - (modalWidth + 10)}px`
			this.style.top = `${
				document.documentElement.scrollTop +
				top +
				height / 2 -
				modalHeight / 2
			}px`
		} else if (window.innerWidth - right >= modalWidth + 10) {
			this.style.left = `${right + 10}px`
			this.style.top = `${
				document.documentElement.scrollTop +
				top +
				height / 2 -
				modalHeight / 2
			}px`
		} else {
			this.style.left = `${window.innerWidth / 2 - modalWidth / 2}px`
		}

		this.#dots[this.#currentIndex].style.width = '1.5rem'
		this.#dots[this.#currentIndex].style.borderRadius = '1rem'

		if (this.#previousIndex >= 0) {
			this.#dots[this.#previousIndex].style.width = '0.5rem'
			this.#dots[this.#previousIndex].style.borderRadius = '50%'
		}

		currentIntroElement.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}

	#createBackdrop() {
		this.#backdropElement = document.createElement('div')
		this.#backdropElement.style.position = 'absolute'
		this.#backdropElement.style.top = '-10px'
		this.#backdropElement.style.boxSizing = 'border-box'
		this.#backdropElement.style.transition = 'all 0.3s'
		this.#backdropElement.style.zIndex = '999998'
		this.#backdropElement.style.boxShadow =
			'0 0 0 5000px rgba(0, 0, 0, 0.533), 0 0 0 2px black'
		document.body.prepend(this.#backdropElement)
	}
	start() {
		document.body.append(this)
	}
	end() {
		this.#backdropElement.remove()
		this.remove()
	}
}
customElements.define('intro-modal', IntroModal)
