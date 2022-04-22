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
	#prevoisIndex
	#introElementsBackgroundColors
	#dimStyle
	#backdropElement
	constructor(introElements, introDescriptions) {
		super()
		const root = this.attachShadow({ mode: 'open' })
		root.append(modalTemplate.content.cloneNode(true))
		this.#closeBtn = root.querySelector('.close-btn')
		this.#backBtn = root.querySelector('.back-btn')
		this.#nextBtn = root.querySelector('.next-btn')
		this.#heading = root.querySelector('.heading')
		this.#description = root.querySelector('.description')
		this.#backdropElement = null
		this.#introElements = introElements
		this.#introDescriptions = introDescriptions
		this.#currentIndex = -1
		this.#prevoisIndex = null
	}
	connectedCallback() {
		this.#setInitiateState()
		this.#createBackdrop()

		this.#closeBtn.addEventListener('click', () => {
			this.remove()
		})

		this.#backBtn.addEventListener('click', () => {
			this.#currentIndex--
			if (this.#currentIndex < 0) {
				this.#currentIndex = 0
				return
			}
			this.#prevoisIndex = this.#currentIndex + 1
			this.#handelClick()
		})

		this.#nextBtn.addEventListener('click', () => {
			this.#currentIndex++
			if (this.#currentIndex >= this.#introElements.length) {
				this.#currentIndex = this.#introElements.length - 1
				return
			}
			if (this.#currentIndex > 0) {
				this.#prevoisIndex = this.#currentIndex - 1
			}
			this.#handelClick()
		})
	}

	#setInitiateState() {
		this.style.top = `${window.innerHeight / 2 - this.offsetHeight / 2}px`
		this.style.left = `${window.innerWidth / 2 - this.offsetWidth / 2}px`
	}

	#handelClick() {
		const currentIntroElement = this.#introElements[this.#currentIndex]
		const prevoiusElement = this.#introElements[this.#prevoisIndex]
		this.#description.textContent =
			this.#introDescriptions[this.#currentIndex].description
		this.#heading.textContent =
			this.#introDescriptions[this.#currentIndex].heading

		const { top, left, height, width, bottom } =
			currentIntroElement.getBoundingClientRect()
		const scrollHeight = document.documentElement.scrollHeight
		const scrollTop = document.documentElement.scrollTop

		this.#backdropElement.style.top = `${scrollTop + top}px`
		this.#backdropElement.style.left = `${left}px`
		this.#backdropElement.style.height = `${height}px`
		this.#backdropElement.style.width = `${width}px`

		if (window.innerHeight - height <= this.offsetHeight * 2) {
			currentIntroElement.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})

			this.style.top = `${
				document.documentElement.scrollTop +
				top +
				height / 2 -
				this.offsetHeight / 2
			}px`
			console.log(1)
		} else if (scrollHeight - (scrollTop + bottom) >= this.offsetHeight) {
			currentIntroElement.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})

			this.style.top = `${
				document.documentElement.scrollTop + top + height + 10
			}px`
			console.log(2)
		} else {
			this.style.top = `${
				document.documentElement.scrollTop +
				top -
				(this.offsetHeight + 10)
			}px`
			console.log(3)
		}

		// if (scrollHeight - (scrollTop + bottom) > height) {
		// 	this.style.top = `${
		// 		document.documentElement.scrollTop + top + height + 10
		// 	}px`
		// } else if (top > height) {
		// 	this.style.top = `${
		// 		document.documentElement.scrollTop +
		// 		top -
		// 		(this.offsetHeight + 10)
		// 	}px`
		// } else {
		// 	this.style.top = `${
		// 		document.documentElement.scrollTop +
		// 		top +
		// 		height / 2 -
		// 		this.offsetHeight / 2
		// 	}px`
		// }

		// currentIntroElement.scrollIntoView({
		// 	behavior: 'smooth',
		// 	block: 'center',
		// })
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
}
customElements.define('intro-modal', IntroModal)
