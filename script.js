
const find = document.querySelector('#find');
const status = document.querySelector('#status');

function lookUp() {
    status.textContent = 'Loading…';
    find.disabled = true;
}

if (find) {
    find.addEventListener('click', lookUp);
}
