const favMealContainer = document.getElementById('favMealContainer');
// console.log('Current favorites:', favIds);

function displayFavMeal(){
    let favIds = JSON.parse(localStorage.getItem('fetchId'));
    const apiKey = 'fd3972c258e5486a807e654638c235a8'; 
    favIds.forEach(element => {
        const fetchDetails = fetch(`https://api.spoonacular.com/food/menuItems/${element}?&apiKey=${apiKey}`);
        fetchDetails.then(foodResponse => {
            if (!foodResponse.ok) {
                throw new Error('No fav Fooded Added');
            }
            return foodResponse.json();
        }).then(details =>{
            console.log(details);
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('detailsDiv');
            const nameP = document.createElement('p');
            nameP.textContent = details.title;
            nameP.classList.add('nameP');

            const price = document.createElement('p');
            price.textContent = "$12"
            price.classList.add('price');

            const imgDiv = document.createElement('div');
            // console.log(details.images);
            imgDiv.classList.add('imgDiv');
                const img = document.createElement('img');
                if (details.image) {
                    img.src = details.image;
                    img.alt = 'Image not available';
                } else {
                    // Replace with your placeholder image or text
                    img.src = 'logo/placeholder.jpg'; 
                    img.alt = 'Image not available';
                }
                img.classList.add('img');
                imgDiv.appendChild(img);
            const DetailButton = document.createElement('button');
            DetailButton.classList.add('DetailButton');
            DetailButton.textContent = 'Details';
            const spanStar = document.createElement('span');
            spanStar.innerHTML = `<i class="fa-solid fa-heart">`;
            spanStar.classList.add('star');
            spanStar.classList.add('starBackground');

            //detail Section
            const nutritionDiv = document.createElement('div');
            nutritionDiv.classList.add('hidden', 'nutritionDiv');
            details.nutrition.nutrients.forEach(nutrient =>{
                const nutrientP = document.createElement('p');
                nutrientP.textContent = `${nutrient.name}: ${nutrient.amount}${nutrient.unit}`;
                nutrientP.classList.add('nutrientP');
                nutritionDiv.appendChild(nutrientP);
            });

            DetailButton.addEventListener('click', ()=>{
                nutritionDiv.classList.toggle('hidden');
                detailsDiv.appendChild(nutritionDiv);
            })
            spanStar.addEventListener('click', () => {
                    // Retrieve favIds from localStorage
                    let favIds = JSON.parse(localStorage.getItem('fetchId'));
                    if (!Array.isArray(favIds)) {
                        favIds = [];
                    }

                    // Toggle favorite status
                    if (spanStar.classList.contains('starBackground')) {
                        spanStar.classList.remove('starBackground');
                        const removeFav = favIds.indexOf(element);
                        if (removeFav !== -1) {
                            favIds.splice(removeFav, 1);
                        }
                     }

                    // Save updated favIds to localStorage
                    localStorage.setItem('fetchId', JSON.stringify(favIds));
                    console.log('Updated favIds:', favIds);
                    favMealContainer.innerHTML='';
                    displayFavMeal();

                });
            
            detailsDiv.appendChild(imgDiv);
            detailsDiv.appendChild(spanStar);
            detailsDiv.appendChild(nameP);
            detailsDiv.appendChild(price);
            detailsDiv.appendChild(DetailButton);
            favMealContainer.appendChild(detailsDiv);

        })
        // .catch(err => {
        //     console.error(err);
        // });
    });


}

displayFavMeal();
document.addEventListener('DOMContentLoaded', () => {
            const favIds = JSON.parse(localStorage.getItem('fetchId')) || [];
            console.log('Current favorites:', favIds);
        });
