document.addEventListener("DOMContentLoaded", () => {
    fetch('/headers.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

    fetch('/footers.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });
})