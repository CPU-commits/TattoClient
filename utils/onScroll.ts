export default function (config: {
	total: number
	fx: (page: number) => Promise<boolean>
	countReturnedItems: number
	element?: HTMLElement
}) {
	// Init
	let count = config.countReturnedItems
	let running = false
	// Body
	let elementScroll: HTMLElement
	if (config.element) {
		elementScroll = config.element
	} else {
		elementScroll = document.body
	}
	if (config.total > config.countReturnedItems) {
		elementScroll.onscroll = async () => {
			let myPosition: number
			if (elementScroll !== document.body) {
				myPosition =
					elementScroll.scrollTop + elementScroll.clientHeight
			} else {
				myPosition =
					elementScroll.clientHeight -
					(elementScroll.getBoundingClientRect().bottom -
						window.innerHeight)
			}
			if (
				myPosition / elementScroll.scrollHeight >= 0.6 &&
				!running &&
				count < config.total
			) {
				running = true
				const works = await config.fx(
					Math.ceil(count / config.countReturnedItems),
				)
				if (works) count += config.countReturnedItems
				running = false
			}
		}
	}
}
