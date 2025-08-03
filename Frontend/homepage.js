document.addEventListener("DOMContentLoaded", () => {
    fetch('/file/headers.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

    fetch('/file/footers.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });
})