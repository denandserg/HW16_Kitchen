const logOut = document.querySelector('.logOut');
const createDishBttn = document.querySelector('.create-dish');
const placeForDish = document.querySelector('.everything__dish');
const titleFirstDish = document.querySelector('.title__dish');
let userData = JSON.parse(localStorage.getItem('recipeUserId'));
console.log(userData);
let flagStep = false;

logOut.addEventListener('click', () => {
    localStorage.removeItem('recipeUserId');
    window.location.replace("http://localhost:3000/registration.html");
});

createDishBttn.addEventListener('click', () => {
    window.location.replace("http://localhost:3000/creatNewTitle.html");
});

function getAndRenderAllRecipe() {

    fetch(`http://localhost:3000/api/user/token/${userData.token}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(res => {
            if (userData.id === undefined) {
                userData.id = res[0].id;
                localStorage.setItem('recipeUserId', JSON.stringify(userData));
            }
            return fetch(`http://localhost:3000/api/recipe/user_id/${userData.id}`, {
                    method: 'GET',
                })
                .then(res => res.json())
                .then(res => {
                    let promises = [];
                    res.forEach(el => {
                        //console.log(el);
                        let recipe = el;
                        console.log(recipe.id);
                        promises.push(fetch(`http://localhost:3000/api/step/recipeid/${recipe.id}`)
                            .then(res => res.json())
                            .then(res => {
                                recipe.steps = res;
                                console.log(recipe);
                                return recipe
                            }));
                    });
                    console.log(Promise.all(promises));
                    return Promise.all(promises);
                })

                .then(res => {
                    if (res.length !== 0) {
                        res.forEach((rec) => {
                            renderRecipeTable(rec)
                        })
                    } else {
                        renderRecipeTable('Write your first recipe!');
                    }
                })
        })
}

function renderRecipeTable(recipe) {

    if (typeof (recipe) === 'string') {
        let rowOfDishes = document.createElement('div');
        rowOfDishes.classList.add('my__dish');
        rowOfDishes.setAttribute('id', `${recipe.id}`);
        rowOfDishes.style.pointerEvents = `none`;
        rowOfDishes.innerHTML = `<div class="picture__dish"></div><div class="title-dish">${recipe}</div>`;
        placeForDish.appendChild(rowOfDishes);

    } else {
        let rowOfDishes = document.createElement('div');
        rowOfDishes.setAttribute('id', `${recipe.id}`);
        rowOfDishes.classList.add('my__dish');
        rowOfDishes.innerHTML = `<div class="picture__dish"></div><div class="title-dish">${recipe.title}</div><div class="desDish" id="desDish_${recipe.id}">${recipe.description}</div><button type="button" id="${recipe.id}" class=".delete__dish" style="margin: 10px; width: 50px; height: 30px; border: none; outline: none; color: #ffffff; background: #03a9f4; cursor: pointer; border-radius: 5px;">Delete</button>`;
        for (let i = 0; i < recipe.steps.length; i++) {
            rowOfDishes.innerHTML += `<div id="recDescr_${recipe.id}_${i}" class="recept__descr" data-id="${recipe.id}">${recipe.steps[i].description}</div>`;
            rowOfDishes.innerHTML += `<div id="recTitle_${recipe.id}_${i}" class="recept__title" data-id="${recipe.id}">${recipe.steps[i].title}</div>`;
        }
        placeForDish.appendChild(rowOfDishes);
    }
}

function deleteOneDish(idDish) {

    const myHeaders = new Headers({
        "cache-control": "no-cache"
    })

    const myInit = {
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    fetch(`http://localhost:3000/api/recipe/${idDish}`, myInit)
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
        })
    // .catch(function (error) {
    //     console.log('Request failed', error);
    // })
    // .then(res => {
    //     userId = sessionStorage.getItem('idUser');
    //     getAndRenderUserRecipe(userId)
    // })
}

window.onload = () => {
    getAndRenderAllRecipe();
    setTimeout(addEventDishRow, 500);
    setTimeout(addEventDeleteOneDish, 500);
}

function addEventDishRow() {
    const arrDishRows = document.querySelectorAll('.my__dish');
    arrDishRows.forEach(el => el.addEventListener('click', handlerDishStep));
}

function handlerDishStep(e) {
    if (!flagStep) {
        const buttonsDel = document.querySelectorAll('.my__dish > button');
        const allDishDescr = document.querySelectorAll('.desDish');
        const allStepsTitle = document.querySelectorAll('.recept__title');
        const allStepsDescr = document.querySelectorAll('.recept__descr');

        for (let el of allDishDescr) {
            if (`desDish_${this.id}` === el.id) {
                el.style.display = 'block';
            }
        }
        for (let el of allStepsTitle) {
            if (`${this.id}` === el.dataset.id) {
                el.style.display = 'block';
            }
        }
        for (let el of allStepsDescr) {
            if (`${this.id}` === el.dataset.id) {
                el.style.display = 'block';
            }
        }
        buttonsDel.forEach((bttn) => {
            if (bttn.id === this.id) {
                bttn.style.display = 'none';
            }
        });
        this.style.flexDirection = 'column';
        this.style.alignItems = 'center';
        this.style.height = 'auto';
        flagStep = true;
    } else {
        const buttonsDel = document.querySelectorAll('.my__dish > button');
        const allDishDescr = document.querySelectorAll('.desDish');
        const allStepsTitle = document.querySelectorAll('.recept__title');
        const allStepsDescr = document.querySelectorAll('.recept__descr');
        for (let el of allDishDescr) {
            if (`desDish_${this.id}` === el.id) {
                el.style.display = 'none';
            }
        }
        for (let el of allStepsTitle) {
            if (`${this.id}` === el.dataset.id) {
                el.style.display = 'none';
            }
        }
        for (let el of allStepsDescr) {
            if (`${this.id}` === el.dataset.id) {
                el.style.display = 'none';
            }
        }
        buttonsDel.forEach((bttn) => {
            if (bttn.id === this.id) {
                bttn.style.display = 'block';
            }
        });
        this.style.height = '50px';
        this.style.flexDirection = 'row';
        this.style.alignItems = 'center';
        flagStep = false;
    }
}

function addEventDeleteOneDish(e) {
    const buttonsDel = document.querySelectorAll('.my__dish > button');
    buttonsDel.forEach(el => {
        el.addEventListener('click', deleteOneDish);
    });
}

function deleteOneDish(e) {

    const dishRows = document.querySelectorAll('.my__dish');
    dishRows.forEach(el=>{
        if(el.id===this.id) {
            el.remove();
        }
    })

    const myHeaders = new Headers({
        "cache-control": "no-cache"
    })

    const myInit = {
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    fetch(`http://localhost:3000/api/recipe/${e.target.id}`, myInit)
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        })
        
}