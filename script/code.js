
async function fetchRandomPeople() {
    try {
      const response = await fetch(' https://randomuser.me/api?results=50')
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching random people:', error);
    }
  }
  

  function displayPeople(people) {
    const peopleContainer = document.getElementById('peopleContainer');
    peopleContainer.innerHTML = '';
  
    if (people.length === 0) {
      const messageDiv = document.getElementById('message');
      messageDiv.innerText = 'Name not found.';
    } else {
      const messageDiv = document.getElementById('message');
      messageDiv.innerText = '';
  
      people.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');
        personDiv.innerHTML = `
          <img src="${person.picture.medium}" alt="${person.name.first}">
          <p>${person.name.first} ${person.name.last}</p>
        `;
        peopleContainer.appendChild(personDiv);
      });
    }
  }
  
  document.getElementById('searchInput').addEventListener('input', async function(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    
    if (searchTerm === '') {
      const randomPeople = await fetchRandomPeople();
      displayPeople(randomPeople);
    } else {
      const randomPeople = await fetchRandomPeople();
      const filteredPeople = randomPeople.filter(person => person.name.first.toLowerCase().includes(searchTerm));
      displayPeople(filteredPeople);
    }
  });
  
  
  window.addEventListener('DOMContentLoaded', async () => {
    const randomPeople = await fetchRandomPeople();
    displayPeople(randomPeople);
  });
  