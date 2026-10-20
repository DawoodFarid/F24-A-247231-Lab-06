
const find = document.querySelector('#find');
const item = document.querySelector('#item');
const status = document.querySelector('#status');
const cardName = document.querySelector('#card-name');
const cardPrice = document.querySelector('#card-price');

async function lookUp() {
    const name = item.value.trim();

    if (!name) {
        return;
    }

    status.textContent = 'Loading…';
    find.disabled = true;

    try {
        const response = await fetch(`/lookup?item=${encodeURIComponent(name)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Lookup failed');
        }

        status.textContent = `${data.name}: Rs ${data.price}`;
        cardName.textContent = data.name;
        cardPrice.textContent = data.price;
    } catch (error) {
        status.textContent = 'Lookup failed.';
    } finally {
        find.disabled = false;
    }
}

if (find) {
    find.addEventListener('click', lookUp);
}
