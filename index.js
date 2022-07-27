const quoteDisplay = document.querySelector('.quote-display')
const quoteInput = document.querySelector('.quote-input')
const timer = document.querySelector('.timer')

getRandomQuote()

async function getRandomQuote() {
    const response = await fetch('http://api.quotable.io/random')
    const data = await response.json()
    const quote = data.content
    quoteDisplay.innerText = null
    quoteInput.value = null

    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplay.appendChild(characterSpan)        
    });

    startTimer()
}

quoteInput.addEventListener('input', () => {
    const arrayCharacter = quoteDisplay.querySelectorAll('span')
    const arrayValue = quoteInput.value.split('')
    let correct = true

    arrayCharacter.forEach((characterSpan, index) => {
        const character = arrayValue[index]

        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    })

    if (correct) return getRandomQuote()
})

let startTime

function startTimer() {
    timer.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTime()
    }, 1000);
}

function getTime() {
    return Math.floor((new Date() - startTime) / 1000)
}