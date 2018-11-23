(function () {

    function move(moveBy) {
        const sectionNumber = parseInt((location.hash).substr(2))
        const newId = `s${sectionNumber + moveBy}`
        if (document.getElementById(newId)) {
            location.hash = `#${newId}`
        }
    }

    document.addEventListener('keydown', e => {
        if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) { //space or right or down
            move(1)
            e.preventDefault()
        }

        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 8) { //backspace or left or up
            move(-1)
            e.preventDefault()
        }
    })

    document.addEventListener('mousedown', e => {
        if (e.ctrlKey || e.altKey) {
            return
        }
        if (e.which === 1) {
            move(1)
        } else if (e.which === 3) {
            move(-1)
        }

        e.preventDefault()
    })

    document.addEventListener('wheel', e => {
        if (e.ctrlKey || e.altKey) {
            return
        }
        if (e.deltaY > 0) {
            move(1)
        } else if (e.deltaY < 0) {
            move(-1)
        }

        e.preventDefault()
    })

    document.addEventListener('contextmenu', e => {
        e.preventDefault()
    })

    const slides = document.querySelectorAll('body > code')

    Array.prototype.forEach.call(slides, (e, index) => {
        e.id = `s${index + 1}`
        e.innerHTML = marked(e.innerHTML)
        e.dataset.page = index + 1
        e.dataset.total = slides.length
    })

    if (!location.hash) {
        location.hash = '#s1'
    }
})()