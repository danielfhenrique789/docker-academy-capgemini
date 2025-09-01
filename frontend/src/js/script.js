document.addEventListener('DOMContentLoaded', function() {
    

    // Read from file
    //get_data()
    get_data_request()
});

function get_data_request() {
    // URL of your FastAPI endpoint
    const apiUrl = 'http://localhost:8000/';

    // Make a GET request using the Fetch API
    fetch(apiUrl)
        .then(response => {
            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON from the response
            return response.json();
        })
        .then(data => {
            renderItems(data.items);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error fetching data:', error);
        });
}

function get_data() {
    fetch('items.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderItems(data.items);
        })
        .catch(error => {
            console.error('Error fetching items:', error);
            document.getElementById('items-grid').innerHTML = '<p class="error">Failed to load items. Please try again later.</p>';
        });
}

function renderItems(items) {
    const gridContainer = document.getElementById('items-grid');
    
    // Clear any existing content
    gridContainer.innerHTML = '';
    
    // Create and append item elements
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.setAttribute('data-id', item.item_id);
        
        // Make the entire item clickable
        itemElement.addEventListener('click', function() {
            window.location.href = item.url;
        });
        
        // Create item content
        itemElement.innerHTML = `
            <img src="${item.item_icon}" alt="${item.item_name}" class="item-icon">
            <div class="item-name">${item.item_name}</div>
        `;
        
        gridContainer.appendChild(itemElement);
    });
}