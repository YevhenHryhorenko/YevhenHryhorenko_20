let add__input = document.querySelector('.add__input');
let add__btn = document.querySelector('.add__btn');
let items_count = document.querySelector('.items_count');

let localSt = JSON.parse(localStorage.getItem('localData')) || [];

function render() {
    items_count.innerHTML = '';

    for (let i = 0; i < localSt.length; i++) {
        let pos = i;

        let item = document.createElement('div');
        item.classList.add('item');

        let item__text = document.createElement('input');
        item__text.classList.add('item__text');
        item__text.setAttribute('type', 'text');
        item__text.value = localSt[i];
        let message = document.createTextNode(localSt[i]);
        item__text.appendChild(message);

        let button = document.createElement('button');
        button.classList.add('item__delBtn');
        let buttonName = document.createTextNode('del');
        button.appendChild(buttonName);
        button.setAttribute('onclick', 'delItem(' + pos + ')');

        let saveButton = document.createElement('button');
        saveButton.classList.add('item__saveBtn');
        let saveButtonName = document.createTextNode('save');
        saveButton.appendChild(saveButtonName);
        saveButton.setAttribute('onclick', 'saveItem(' + pos + ')');

        item.appendChild(item__text);
        item.appendChild(button);
        item.appendChild(saveButton);
        items_count.appendChild(item);
    }
}

render();

function addItem() {
    let item = add__input.value;
    if (item.trim() === '') {
        return;
    }
    localSt.push(item);
    add__input.value = '';
    render();
    saveInLocalSt();
}

add__btn.onclick = addItem;

function delItem(pos) {
    localSt.splice(pos, 1);
    render();
    saveInLocalSt();
}

function saveItem(pos) {
    let editInput = document.querySelectorAll('.item__text')[pos];
    let newText = editInput.value;
    localSt[pos] = newText;
    render();
    saveInLocalSt();
}

function saveInLocalSt() {
    localStorage.setItem('localData', JSON.stringify(localSt));
}
