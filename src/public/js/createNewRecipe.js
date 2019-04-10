const bttnSaveRecipe = document.querySelector('#saveBtnDish');
const titleDish = document.getElementById('titleDish');
const descriptionDish = document.getElementById('descriptionDish');
const imgDish = document.getElementById('imgDish');
const stepAdd = document.getElementById('step');
const moduleSaveBtn = document.getElementById('moduleBtn');
let countStep = 0;
const userData = JSON.parse(localStorage.getItem('recipeUserId'));

stepAdd.addEventListener('click', () => {
    countStep++;
    const divStep = document.createElement('div');
    divStep.classList.add('create-dish');
    divStep.id = `divFormStep_${countStep}`;
    divStep.innerHTML = `<form id="formStep_${countStep}" method="post" enctype="multipart/form-data"> 
        <div class="title-dish"> 
        <input id="inputStepTitle_${countStep}" type="text" required> 
        <label>Title Step</label> </div><p>Description</p>
        <textarea id="textDescrStep_${countStep}" class="dish-description"></textarea> 
        <div class="dish-button"> 
        <button id="btnRemoveStep_${countStep}" class="dish-button__btn dish-button__btn-remove">Remove</button> 
        </div><input id="imgStep_${countStep}" class="ugly" type="file" name="image" accept="image/png,image/jpeg"/> 
        <label class="label">Add Photo</label> 
        </form>`;
    document.body.insertBefore(divStep, moduleSaveBtn);
    const removeBtn = document.querySelectorAll('.dish-button__btn-remove');
    for(let btn of removeBtn) {
        btn.addEventListener('click', removeFormStep);
    }
});
/*
function logout() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/logout', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(responseText);
            }
        }
    };
    xhr.send();
    window.location='authorization.html';
}
*/
function getStepData(counter, id) {
    let stepData = JSON.stringify({
        "title" : document.getElementById(`textDescrStep_${counter}`).value,
        "description" :document.getElementById(`inputStepTitle_${counter}`).value,
        "recipe_id" : id
});
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:3000/api/step");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(stepData);
}

function removeFormStep (e) {
    const idTarget = e.target.id;
    const id = idTarget[idTarget.length-1];
    const divForm = document.getElementById(`divFormStep_${id}`);
    document.body.removeChild(divForm);
}

bttnSaveRecipe.addEventListener('click', () => {
    createAJAXAddDish();
    setTimeout(changeLocation,1000);
});

function changeLocation() {
    window.location.replace("http://localhost:3000/index.html");
}

function createAJAXAddDish() {
    let obj ={};
    const data = JSON.stringify({
      "title": `${titleDish.value}`,
      "description": `${descriptionDish.value}`,
        "user_id": `${userData.id}`
    });
    
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        obj = JSON.parse(this.responseText);
          for(let i = 1; i <= countStep; i++){
              getStepData(i, obj.id);
          }
        }
    });
    
    xhr.open("POST", "http://localhost:3000/api/recipe");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
    //return id;
}