
let xhttp = new XMLHttpRequest()
let tokn


//check if the user is logged in
verify()




$('.faker').on('click' , () => {
  
    $('#reg-user').val(faker.name.findName())
})

xhttp.onreadystatechange = () => {

    if(xhttp.readyState == XMLHttpRequest.DONE)
    {
        console.log({status : xhttp.status })
        document.querySelector('textarea').innerText = xhttp.responseText
        tokn = xhttp.responseText
        signed_in( xhttp.status > 200 ? true  : false)
       
    }

}
$('form').submit((e) => {
    e.preventDefault()
    xhttp_request(e.target.action , 'POST' , e)
})


document.querySelector('.verify-jwt').addEventListener('click' , () => {
    console.log('verify-jwt with body')
    verify()

})



