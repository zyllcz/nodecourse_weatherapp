//client side javascript
console.log('client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

     
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageTwo.textContent = ''
            messageThree.textContent = ''
            return messageOne.textContent = data.error
        }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            messageThree.src = data.forecastIcon
    })
})
})