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
		this.#introElementsBackgroundColors = new WeakMap()
		this.#dimStyle = document.createElement('style')
	}
	connectedCallback() {
		this.#setInitiateState()
		// this.#createBackdrop()

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
			console.log(this.#currentIndex)
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
		this.#introElements.forEach((element) => {
			this.#introElementsBackgroundColors.set(
				element,
				getComputedStyle(element).backgroundColor
			)
		})
		this.#dimStyle.innerHTML = `
				body > * {
					background-color: dimgray;
				}
				body {
					background-color: dimgray;
				}
		
		`
	}

	#handelClick() {
		const currentIntroElement = this.#introElements[this.#currentIndex]
		const prevoiusElement = this.#introElements[this.#prevoisIndex]
		this.#description.textContent =
			this.#introDescriptions[this.#currentIndex].description
		this.#heading.textContent =
			this.#introDescriptions[this.#currentIndex].heading
		document.head.append(this.#dimStyle)
		this.style.filter = 'none'
		this.style.backgroundColor = 'white'
		this.style.zIndex = '100'
		let bgColor =
			this.#introElementsBackgroundColors.get(currentIntroElement)
		if (bgColor === 'rgba(0, 0, 0, 0)') {
			bgColor = 'white'
		}
		currentIntroElement.style.backgroundColor = bgColor
		currentIntroElement.style.filter = 'none'
		if (prevoiusElement) {
			prevoiusElement.style.backgroundColor = 'dimgray'
		}
		const { top, left, height, width, bottom } =
			currentIntroElement.getBoundingClientRect()
		const scrollHeight = document.documentElement.scrollHeight
		const scrollTop = document.documentElement.scrollTop

		if (scrollHeight - (scrollTop + bottom) > height) {
			this.style.top = `${
				document.documentElement.scrollTop + top + height + 10
			}px`
		} else if (top > height) {
			this.style.top = `${
				document.documentElement.scrollTop +
				top -
				(this.offsetHeight + 10)
			}px`
		} else {
			this.style.top = `${
				document.documentElement.scrollTop +
				top +
				height / 2 -
				this.offsetHeight / 2
			}px`
		}

		currentIntroElement.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
		// this.#backdropElement.style.top = `${top}px`
		// this.#backdropElement.style.left = `${left}px`
		// this.#backdropElement.style.height = `${height}px`
		// this.#backdropElement.style.width = `${width}px`
	}

	#createBackdrop() {
		this.#backdropElement = document.createElement('div')
		this.#backdropElement.style.height = '100px'
		this.#backdropElement.style.width = '200px'
		this.#backdropElement.style.backgroundColor = 'red'
		this.#backdropElement.style.position = 'absolute'
		document.body.prepend(this.#backdropElement)
	}
}
customElements.define('intro-modal', IntroModal)
