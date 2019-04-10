const step = document.querySelector('#step');
const some = document.querySelector('#some');
const elTemplate = document.getElementById('elTemplate');
step.addEventListener('click', () => createStep());

function createStep() {
    const el = document.importNode(elTemplate, true).content.querySelector('.create-dish');
    el.id = `_${counter()}`;
    const rem = el.getElementsByClassName('dish-button__btn-remove')[0];
    rem.addEventListener('click', (event) => {
        const delElem = event.target.parentNode.parentNode.parentNode;
        deleteDescription(delElem)});
    some.appendChild(el);
}

function makeCounter() {
    let currentCount = 0;
    return function() {
        currentCount++;
        return currentCount;
    };
}
let counter = makeCounter();

function deleteDescription(el){
            el.remove();
}


