const content = /*html*/ `
        <div class="intro-modal">
            <button class="close-btn">X</button>
            <div class="heading">Heading</div>
            <div class="description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Libero, eaque.
            </div>
            <div class="progess-bar"></div>
            <div class="button-group">
                <button class="back-btn">Back</button
                ><button class="next-btn">Next</button>
            </div>
        </div>
		<style>
			.intro-modal * {
				box-sizing: border-box;
				font-family: sans-serif;
				margin: 0;
				padding: 0;
			}
			
			.intro-modal {
				transition: all 0.3s;
				width: fit-content;
				max-width: 20rem;
				min-width: 10rem;
				box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.233);
				border-radius: 1rem;
				padding: 1rem;
				position: fixed;
                background-color: white;
			}

			.close-btn {
				background-color: tomato;
				border-radius: 50%;
				color: white;
				border: none;
				width: 1.5rem;
				display: flex;
				justify-content: center;
				align-items: center;
				aspect-ratio: 1;
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;
				transition: transform 0.1s;
			}

			.heading {
				font-size: 1.3rem;
			}

			.description {
				padding: 0.5rem 0 0.8rem;
				line-height: 1.3rem;
			}
			.button-group {
				display: flex;
				justify-content: space-between;
			}

			.button-group button {
				font-size: 1rem;
				padding: 0.2rem 0.5rem;
				border-radius: 0.5rem;
				border: none;
				background-color: slateblue;
				color: white;
			}

			.button-group button:hover,
			.close-btn:hover {
				filter: saturate(300%);
				cursor: pointer;
				transform: scale(1.05);
			}
			.button-group button:active,
			.close-btn:active {
				transform: scale(0.95);
			}

		</style>
`

export default class IntroModal extends HTMLElement {
	constructor(introElements, introDescriptions) {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.innerHTML = content
		this.modal = this.shadowRoot.children[0]
		this.closeBtn = this.modal.querySelector('.close-btn')
		this.backBtn = this.modal.querySelector('.back-btn')
		this.nextBtn = this.modal.querySelector('.next-btn')
		this.heading = this.modal.querySelector('.heading')
		this.description = this.modal.querySelector('.description')
		this.introElements = introElements
		this.introDescriptions = introDescriptions
	}
	connectedCallback() {
		this.closeBtn.addEventListener('click', () => {
			this.modal.remove()
		})
		let count = -1
		this.backBtn.addEventListener('click', () => {
			count--
			if (count < 0) {
				count = 0
				return
			}
			console.log(count)
			handelClick()
		})

		this.nextBtn.addEventListener('click', () => {
			count++
			if (count >= this.introElements.length) {
				count = this.introElements.length - 1
				return
			}
			console.log(count)
			handelClick()
		})

		const handelClick = () => {
			const cuurentIntroElement = this.introDescriptions[count]
			this.description.textContent = cuurentIntroElement.description
			this.heading.textContent = cuurentIntroElement.heading
		}
	}
}
customElements.define('intro-modal', IntroModal)
