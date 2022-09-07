function verify(){
    xhttp.open('POST' , 'http://localhost:8000/auth/verify' , true)
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(`{
        "token": "${tokn}"
      }`)
      
}


let xhttp_request = (url , method , e) => {
    xhttp.open(method , url)
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(`{
        "username": "${e.target.username.value}",
        "password": "${e.target.password.value}"
      }`)
}

let signed_in = (flag) => {
    if(!flag){
        document.querySelector('h2').innerText = 'logged in'
        document.querySelector('h2').classList.remove(['logged-out' , 'logged-in'])
        document.querySelector('h2').classList.add('logged-in')
    }
    else{
        document.querySelector('h2').innerText = 'logged out'
        document.querySelector('h2').classList.remove(['logged-out' , 'logged-in'])
        document.querySelector('h2').classList.add('logged-out')
    }
 
}
