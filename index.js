const carouselItems = document.querySelectorAll('.carousel__item')
const length = carouselItems.length

const prevButton = document.querySelector('.carousel__button--prev')
const nextButton = document.querySelector('.carousel__button--next')

const menuButton = document.getElementsByClassName('nav__button')[0]

/**
 * Moves carousel prev/next
 * @param  {number} direction
 * @return {void}
 */
const controlCarousel = (direction) => {
    const currentIndex = getCurrentIndex(carouselItems)
    const currentItem = carouselItems[currentIndex]
    const currentContent = currentItem.querySelector('.carousel__content')

    currentContent.classList.add('hide-anim')

    const controller = new AbortController()

    currentContent.addEventListener('webkitAnimationEnd', () => animEndHandler(currentIndex, direction, controller), { signal: controller.signal })
    currentContent.addEventListener('animationend', () => animEndHandler(currentIndex, direction, controller), { signal: controller.signal })
}
/**
 * Handle animationEnd event
 * @param  {number} currentIndex
 * @param  {number} direction
 * @param  {object} controller
 * @return {void}
 */
const animEndHandler = (currentIndex, direction, controller) => {
    const currentItem = carouselItems[currentIndex]
    const currentContent = currentItem.querySelector('.carousel__content')

    currentContent.classList.remove('hide-anim')
    currentItem.setAttribute('aria-current', false)
    updateCurrentItem(currentIndex, direction)

    controller.abort()
}

/**
 * Set aria-current to true for prev/next carousel item
 * @param  {number} currentIndex
 * @param  {number} direction
 * @return {void}
 */
const updateCurrentItem = (currentIndex, direction) => {
    let newIndex = currentIndex + direction
    if (newIndex < 0)
        newIndex = length - 1
    else if (newIndex >= length)
        newIndex = 0

    carouselItems[newIndex].setAttribute('aria-current', true)
}

/**
 * Get index of carousel item with aria-current === true
 * @return {number} index
 */
const getCurrentIndex = () => {
    let index

    for (let i = 0; i < length; i++) {
        if (carouselItems[i].getAttribute('aria-current') === 'true') {
            index = i
            break
        }
    }

    return index
}

/**
 * Toggle menu display
 * @return {void}
 */
const handleMenu = () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true'

    menuButton.setAttribute('aria-expanded', !isOpen)
}

/* Add click event listeners to carousel buttons */
prevButton.addEventListener('click', () => controlCarousel(-1))
nextButton.addEventListener('click', () => controlCarousel(1))

/* Add click event listener to menu button */
menuButton.addEventListener('click', handleMenu)