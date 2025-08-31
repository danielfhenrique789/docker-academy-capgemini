document.addEventListener('DOMContentLoaded', function() {
    // For demonstration, we'll use your provided JSON directly
    // In a real application, you would fetch this from an API endpoint
    /*
    const data = {
        "items": [
            {
                "item_name": "item1",
                "item_id": "1",
                "item_icon": "http://www.somepage.com/default_icon.png",
                "url": "content_loader.html"
            },
            {
                "item_name": "item2",
                "item_id": "2",
                "item_icon": "http://www.somepage.com/default_icon.png",
                "url": "content_loader.html"
            }
            // You can add more items here
        ]
    }; 

    renderItems(data.items);
    */

    // Alternatively, if you want to fetch from a JSON file or API:
    
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
    
});

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