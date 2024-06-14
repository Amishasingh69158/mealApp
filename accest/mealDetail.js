window.onload = function() {
    try {
        const foodDetailDiv = document.getElementById('foodDetail');
        const ingredientsDiv = document.getElementById('ingredients');
        const urlParams = new URLSearchParams(window.location.search);
        const data1 = urlParams.get('data1');
        const data2 = urlParams.get('data2');

        console.log("Data from URL:", data1); // Log the raw data
        console.log("Data from URL:", data2);

        if (data2) {
            const decodedData = decodeURIComponent(data2);
            console.log("Decoded Data:", decodedData); // Log the decoded data

            const iduy = JSON.parse(decodedData);
            const element = iduy.id;
            console.log("Decoded Data:", iduy);
            console.log("Decoded Data:", element);
            const apiKey = 'fd3972c258e5486a807e654638c235a8'; 
            fetch(`https://api.spoonacular.com/food/menuItems/${element}?&apiKey=${apiKey}`)
                .then(foodResponse => {
                    if (!foodResponse.ok) {
                        throw new Error('No favorite food added');
                    }
                    return foodResponse.json();
                })
                .then(details => {
                    console.log(details);
                    const detailsDiv = document.createElement('div');
                    detailsDiv.classList.add('detailsDiv');

                    const nameP = document.createElement('p');
                    nameP.textContent = details.title;
                    nameP.classList.add('nameP');

                    const price = document.createElement('p');
                    price.textContent = "$12";
                    price.classList.add('price');

                    const imgDiv = document.createElement('div');
                    imgDiv.classList.add('imgDiv');
                    const img = document.createElement('img');
                    img.src = details.image || 'logo/placeholder.jpg'; 
                    img.alt = 'Image not available';
                    img.classList.add('img');
                    imgDiv.appendChild(img);

                    const DetailButton = document.createElement('button');
                    DetailButton.classList.add('DetailButton');
                    DetailButton.textContent = 'Details';
                    const spanStar = document.createElement('span');
                    spanStar.innerHTML = `<i class="fa-solid fa-heart"></i>`;
                    spanStar.classList.add('star', 'starBackground');

                    const nutritionDiv = document.createElement('div');
                    nutritionDiv.classList.add('hidden', 'nutritionDiv');
                    details.nutrition.nutrients.forEach(nutrient => {
                        const nutrientP = document.createElement('p');
                        nutrientP.textContent = `${nutrient.name}: ${nutrient.amount}${nutrient.unit}`;
                        nutrientP.classList.add('nutrientP');
                        nutritionDiv.appendChild(nutrientP);
                    });

                    DetailButton.addEventListener('click', () => {
                        nutritionDiv.classList.toggle('hidden');
                        detailsDiv.appendChild(nutritionDiv);
                    });

                    spanStar.addEventListener('click', () => {
                        let favIds = JSON.parse(localStorage.getItem('fetchId')) || [];
                        if (spanStar.classList.contains('starBackground')) {
                            spanStar.classList.remove('starBackground');
                            const removeFav = favIds.indexOf(element);
                            if (removeFav !== -1) {
                                favIds.splice(removeFav, 1);
                            }
                        }

                        localStorage.setItem('fetchId', JSON.stringify(favIds));
                        console.log('Updated favIds:', favIds);
                        favMealContainer.innerHTML = '';
                        displayFavMeal();
                    });

                    detailsDiv.appendChild(imgDiv);
                    detailsDiv.appendChild(spanStar);
                    detailsDiv.appendChild(nameP);
                    detailsDiv.appendChild(price);
                    detailsDiv.appendChild(DetailButton);

                    // Append detailsDiv to ingredientsDiv first
                    foodDetailDiv.appendChild(detailsDiv);

                })
                .catch(err => {
                    console.log(err);
                });

        } else {
            foodDetailDiv.innerText = 'No data found...';
        }

        if (data1) {
            const decodedData = decodeURIComponent(data1);
            console.log("Decoded Data:", decodedData); // Log the decoded data

            const parsedData = JSON.parse(decodedData);
            parsedData.ingredients.forEach(ingredient => {
                const ingredientDiv = document.createElement('div');
                ingredientDiv.classList.add('ingredientDiv'); // Adding class for styling/debugging

                const ingredientName = document.createElement('span');
                ingredientName.classList.add('ingredientName');
                ingredientName.textContent = ingredient.name;

                const ingredientAmount = document.createElement('span');
                ingredientAmount.classList.add('ingredientAmount');
                ingredientAmount.textContent = `${ingredient.amount.metric.unit}: ${ingredient.amount.metric.value}`;

                const ingredientMeasure = document.createElement('span');
                ingredientMeasure.classList.add('ingredientMeasure');
                ingredientMeasure.textContent = `${ingredient.amount.us.unit}: ${ingredient.amount.us.value}`;

                ingredientDiv.appendChild(ingredientName);
                ingredientDiv.appendChild(ingredientAmount);
                ingredientDiv.appendChild(ingredientMeasure);

                console.log("Appending ingredientDiv:", ingredientDiv); // Log the div to be appended
                // Append each ingredientDiv after appending detailsDiv
                ingredientsDiv.appendChild(ingredientDiv);
            });
            console.log("Parsed Data:", parsedData); // Log the parsed data

        } else {
            foodDetailDiv.innerText = 'No data found...';
        }

    } catch (error) {
        console.error('Error processing data:', error);
        foodDetailDiv.innerText = 'Error processing data.';
    }
};
