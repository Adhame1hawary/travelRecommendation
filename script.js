// Fetch data from JSON file
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    console.log('Data loaded successfully:', data);

    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchBtn');
    const clearButton = document.getElementById('clearBtn');
    const resultsDiv = document.getElementById('results');

    // Search button logic
    searchButton.addEventListener('click', () => {
      const keyword = searchInput.value.toLowerCase().trim();
      if (!keyword) {
        alert('Please enter a keyword like beach, temple, or country.');
        return;
      }
      showRecommendations(keyword, data);
    });

    // Clear button logic
    clearButton.addEventListener('click', () => {
      resultsDiv.innerHTML = '';
      searchInput.value = '';
    });

    // Function to display recommendations
    function showRecommendations(keyword, data) {
      resultsDiv.innerHTML = '<p>Loading recommendations...</p>';
      let results = [];

      if (keyword.includes('beach')) {
        results = data.beaches;
      } else if (keyword.includes('temple')) {
        results = data.temples;
      } else if (keyword.includes('country')) {
        results = data.countries;
      }

      resultsDiv.innerHTML = '';

      if (!results || results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found. Try another keyword.</p>';
        return;
      }

      results.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${place.imageUrl}" alt="${place.name}">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
        `;
        resultsDiv.appendChild(card);
      });
    }
  })
  .catch(error => console.error('Error loading data:', error));
