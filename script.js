const find = document.querySelector('#find');
const item = document.querySelector('#item');
const status = document.querySelector('#status');
const cardName = document.querySelector('#card-name');
const cardPrice = document.querySelector('#card-price');
const slip = document.querySelector('#slip');
const found = document.querySelector('#found');
const dearest = document.querySelector('#dearest');

const items = new Map();

async function lookUp() {
    const name = item.value.trim();

    if (!name) {
        status.textContent = 'undefined';
        return;
    }

    status.textContent = 'Loading…';
    find.disabled = true;

    try {
        const response = await fetch(
            `/api/price?item=${encodeURIComponent(name)}`
        );

        const data = await response.json();

        if (response.status === 404) {
            cardName.textContent = '';
            cardPrice.textContent = '';
            status.textContent = `${name} is not in the shop.`;
            return;
        }

        if (!response.ok || !data.item || data.price == null) {
            throw new Error('Server error');
        }

        const itemName = data.item;
        const price = Number(data.price);
        const key = itemName.toLowerCase();

        status.textContent = `${itemName}: Rs ${price}`;
        cardName.textContent = itemName;
        cardPrice.textContent = price;

        if (items.has(key)) {
            items.get(key).times++;
        } else {
            items.set(key, {
                name: itemName,
                price: price,
                times: 1
            });
        }

        slip.replaceChildren();

        for (const entry of items.values()) {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = entry.name;

            const priceCell = document.createElement('td');
            priceCell.textContent = entry.price;

            const timesCell = document.createElement('td');
            timesCell.textContent = entry.times;

            row.append(nameCell, priceCell, timesCell);
            slip.appendChild(row);
        }

        found.textContent = items.size;

        let highest = 0;

        for (const entry of items.values()) {
            if (entry.price > highest) {
                highest = entry.price;
            }
        }

        dearest.textContent = highest;
    } catch (error) {
        cardName.textContent = '';
        cardPrice.textContent = '';
        status.textContent = 'The server is not answering.';
    } finally {
        find.disabled = false;
    }
}

if (find) {
    find.addEventListener('click', lookUp);
}