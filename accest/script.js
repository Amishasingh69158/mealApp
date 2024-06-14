

const search = document.getElementById('search');
const matchMealDiv = document.getElementById('matchMeal');
const matchMealContainer = document.getElementById('matchMealContainer');
const starFav = document.getElementsByClassName('star');

function addEventBody(event){
    matchMealContainer.style.visibility  = 'hidden';
    search.style.border ='2px solid black'
    search.style.borderBottomLeftRadius="18px";
    search.style.borderBottomRightRadius="18px";
}

document.body.addEventListener('dblclick', addEventBody);

//search eventListener

let searchKey = '';
search.addEventListener('keydown', (e) => {
    // Prevent default action for keys that modify the input value
    if (e.key === 'Backspace' || e.key.length===1) {
        e.preventDefault();
        
         // Get the current caret position
        const caretPos = search.selectionStart;


        // Handle backspace
        if (e.key === 'Backspace') {
            // Remove the character at the caret position - 1
            if (caretPos > 0) {
                searchKey = searchKey.slice(0, caretPos - 1) + searchKey.slice(caretPos);
                search.setSelectionRange(caretPos - 1, caretPos - 1); // Move caret back by one position
            }
        } else {
            // Insert the character at the caret position
            searchKey = searchKey.slice(0, caretPos) + e.key + searchKey.slice(caretPos);
            search.setSelectionRange(caretPos + 1, caretPos + 1); // Move caret forward by one position
        }

        // Update the input field value after a short delay
        setTimeout(() => {
            search.value = searchKey;
        }, 0);
    }

    search.style.border ='2px solid #e9d8ce'
    search.style.outline ='none'
    search.style.borderBottomLeftRadius="0px";
    search.style.borderBottomRightRadius="0px";
    matchMealContainer.style.visibility  = 'visible';
    console.log(e.key);
    console.log(searchKey);
    searchMeal(searchKey);
});

search.addEventListener('mousemove', ()=>{

    search.style.border ='2px solid #e9d8ce'
    search.style.outline ='none'
    search.style.borderBottomLeftRadius="0px";
    search.style.borderBottomRightRadius="0px";
    matchMealContainer.style.visibility  = 'visible';

});

function searchMeal(searchKey) {
    const apiKey = 'fd3972c258e5486a807e654638c235a8';
    const fetchFood = fetch(`https://api.spoonacular.com/food/menuItems/search?query=${searchKey}&number=10&apiKey=${apiKey}`);

    fetchFood
        .then(foodResponse => {
            if (!foodResponse.ok) {
                throw new Error('Food not found');
            }
            return foodResponse.json();
        })
        .then(foodResponseJson => {
            matchMealDiv.innerHTML = '';
            foodResponseJson.menuItems.forEach(item => {
                console.log(item.title);
                const divMealFound = document.createElement('div');
                const spanMatchMeal = document.createElement('span');
                const spanStar = document.createElement('span');
                spanMatchMeal.textContent = item.title;
                spanStar.innerHTML = `<i class="fa-solid fa-heart">`;
                divMealFound.classList.add('foundMealContainer');
                spanMatchMeal.classList.add('spanMatchMeal');
                spanStar.classList.add('star');
                // Event listener for the star icon
                let favIds = JSON.parse(localStorage.getItem('fetchId'));
                    if (!Array.isArray(favIds)) {
                        favIds = [];
                    }
                favIds.forEach(favItem =>{
                    if(item.id === favItem){
                        spanStar.classList.add('starBackground');
                    }
                });
         spanMatchMeal.addEventListener('click', async function fetchDataAndRedirect() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${item.id}/ingredientWidget.json?apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        const encodedData1 = encodeURIComponent(JSON.stringify(data));
        const encodedData2 = encodeURIComponent(JSON.stringify(item));
        window.location.href = `mealDetail.html?data1=${encodedData1}&data2=${encodedData2}`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
                spanStar.addEventListener('click', () => {
                    // Retrieve favIds from localStorage
                    let favIds = JSON.parse(localStorage.getItem('fetchId'));
                    if (!Array.isArray(favIds)) {
                        favIds = [];
                    }

                    // Toggle favorite status
                    if (spanStar.classList.contains('starBackground')) {
                        spanStar.classList.remove('starBackground');
                        const removeFav = favIds.indexOf(item.id);
                        if (removeFav !== -1) {
                            favIds.splice(removeFav, 1);
                        }
                    } else {
                        spanStar.classList.add('starBackground');
                        if (!favIds.includes(item.id)) {
                            favIds.push(item.id);
                        }
                    }

                    // Save updated favIds to localStorage
                    localStorage.setItem('fetchId', JSON.stringify(favIds));
                    console.log('Updated favIds:', favIds);
                });


                divMealFound.appendChild(spanMatchMeal);
                divMealFound.appendChild(spanStar);
                matchMealDiv.appendChild(divMealFound);
            });
        })
        .catch(err => {
            console.error(err);
        });
}

Array.from(starFav).forEach(star =>{
    star.addEventListener('click', () => {
    star.classList.toggle('starBackground');
    });
});

document.addEventListener('DOMContentLoaded', () => {
            const favIds = JSON.parse(localStorage.getItem('fetchId')) || [];
            console.log('Current favorites:', favIds);
        });
































// searchMeal(searchKey);

// const fetchFood = fetch('https://api.spoonacular.com/food/search?apiKey=fd3972c258e5486a807e654638c235a8');

// fetchFood.then(foodResponse =>{
//     if(!foodResponse.ok){
//         throw new Error('food is not found');
//     }

//     return foodResponse.json();

// }).then(foodResponseJson =>{
//     console.log(foodResponseJson);
//     foodResponseJson.searchResults.forEach(category => {
//   console.log(`Category: ${category.name}`);
//   category.results.forEach(result => {
//     console.log(`ID: ${result.id}`);
//     console.log(`Name: ${result.name}`);
//     console.log(`Image: ${result.image}`);
//     console.log(`Link: ${result.link}`);
//     console.log(`Content: ${result.content}`);
//     console.log('---');
//   });
// });
// }).catch(err =>{
//     console.log(err);
// })

//https://api.spoonacular.com/recipes/287532/equipmentWidget.json?&apiKey=fd3972c258e5486a807e654638c235a8