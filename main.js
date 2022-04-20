import IntroModal from './IntroModal.js'

const introElements = [...document.querySelectorAll('.intro')]
const introDescriptions = [
	{
		heading: 'heading 1',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ducimus adipisci',
	},
	{
		heading: 'heading 2',
		description: 'Lorem ipsum dolor sit amet',
	},
	{
		heading: 'heading 3',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ducimus adipisci  consectetur adipisicing e',
	},
	{
		heading: 'heading 4',
		description: 'Lorem ipsum dolor sit',
	},
	{
		heading: 'heading 5',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ducimus adipisc Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ducimus adipisci',
	},
	{
		heading: 'heading 6',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ducimus adipisci',
	},
]
const m = new IntroModal(introElements, introDescriptions)

document.body.prepend(m)
