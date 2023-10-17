// To Display if no characters found in Favourite page
const noFavChar = document.getElementById('noFavChar');

// looping over all the elements found in local storage if found
if(localStorage.length !== 0){
    for (var i = 0; i < localStorage.length; i++) {
        // set iteration key name
        var key = localStorage.key(i);
        
        // use key name to retrieve the corresponding value
        var value = localStorage.getItem(key);
        
        const charById = `http://gateway.marvel.com/v1/public/characters/${value}?&ts=1&apikey=4906069c197e411cb19caa044c992842&hash=409eb1707112052380109d1472a0dc44`
        favChar(charById)
    }
}else{
    noFavChar.style.display = 'block';
}

// Calling api to fetch data of all characters in LocalStorage
async function favChar(charById){
    const res = await fetch(charById)
    const data = await res.json()
    renderFavChar(data.data.results)
    removeSeletedChar()
}

// Rendering all the characters present in localStorage
function renderFavChar(data){
    const ul = document.getElementById('ul')
    const li = document.createElement('li')
    li.className = "char"
    li.innerHTML = 
    `
                <div class="img">
                    <img class="charImg" src="${data[0].thumbnail.path}.jpg" alt="Not Found">
                </div>
                <div class="content">
                    <p class="name">${data[0].name}</p>
                   <a href="more-info.html?id=${data[0].id}" class="moreInfoBtn">More Info</a>
                   <button class="delBtn"name="${data[0].name}"><i class="fa-solid fa-trash "></i></button>
                </div>
    `
    ul.append(li)
}

// Removing the selected character
function removeSeletedChar(){
    const delBtn = document.querySelectorAll('.delBtn')
    delBtn.forEach((data)=>{
        console.log(data)
        data.addEventListener('click',function(){
            localStorage.removeItem(data.name)
            location.reload()
        })
    })
}