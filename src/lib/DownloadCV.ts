export default function downloadCV() {
	var element = document.createElement('a')
	element.setAttribute('href', 'cv.pdf')
	element.setAttribute('download', 'cv_joao_suzana_ferreira.pdf')

	element.style.display = 'none'
	document.body.appendChild(element)

	element.click()

	document.body.removeChild(element)
}