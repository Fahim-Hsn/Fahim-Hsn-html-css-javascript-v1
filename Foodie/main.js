const input = document.querySelector('.search-box');
  const button = document.querySelector('.search-button');
  const foodsDiv = document.getElementById('foods');

  button.addEventListener('click', () => {
    const country = input.value.trim();
    foodsDiv.innerHTML = ''; 
    if (!country){
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
      .then(res => res.json())
      .then(data => {
        if (!data.meals) { 
          foodsDiv.innerHTML = '<div class="no-food">No food found</div>'; 
          return; 
        }

        data.meals.forEach(meal => {
          const card = document.createElement('div');
          card.className = 'food-card';

          const img = document.createElement('img');
          img.src = meal.strMealThumb;
          img.alt = meal.strMeal;

          const name = document.createElement('p');
          name.textContent = meal.strMeal;

          card.appendChild(img);
          card.appendChild(name);
          foodsDiv.appendChild(card);
        });
      })

    .catch(() => {
      foodsDiv.innerHTML = '<div class="no-food">Error fetching data</div>';
    });
  });