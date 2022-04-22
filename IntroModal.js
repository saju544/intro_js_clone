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
	constructor(introElements, introDescriptions) {
		super()
		const root = this.attachShadow({ mode: 'open' })
		root.append(modalTemplate.content.cloneNode(true))
		this.#closeBtn = root.querySelector('.close-btn')
		this.#backBtn = root.querySelector('.back-btn')
		this.#nextBtn = root.querySelector('.next-btn')
		this.#heading = root.querySelector('.heading')
		this.#description = root.querySelector('.description')
		this.#introElements = introElements
		this.#introDescriptions = introDescriptions
		this.#currentIndex = -1
		this.#prevoisIndex = null
		this.#introElementsBackgroundColors = new WeakMap()
		this.#dimStyle = document.createElement('style')
	}
	connectedCallback() {
		this.#setInitiateState()

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
					filter: grayscale(100%);
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
		currentIntroElement.style.backgroundColor = 'white'
		currentIntroElement.style.filter = 'none'
		if (prevoiusElement) {
			prevoiusElement.style.backgroundColor = 'dimgray'
			prevoiusElement.style.filter = 'grayscale(100%)'
		}
		console.log(currentIntroElement)
	}
}
customElements.define('intro-modal', IntroModal)
