// Headers & Footers 

document.addEventListener("DOMContentLoaded" , () =>  {
    fetch('../file/headers.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById("loginPageHeader").innerHTML = data;
    });

     fetch('../file/footers.html')
     .then(res => res.text())
     .then(data => {
        document.getElementById("loginPageFooter").innerHTML = data;
    });
})