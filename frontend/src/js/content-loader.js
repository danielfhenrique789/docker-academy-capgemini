document.addEventListener('DOMContentLoaded', function() {
    // Initialize content loader functionality
    initContentLoader();
    
    // Check if there's a content parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const contentId = urlParams.get('content');
    
    if (contentId) {
        loadContent(contentId);
    }
    
    // Modify the item click behavior to load content instead of navigating
    modifyItemClickBehavior();
});

function initContentLoader() {
    // Set up close button functionality
    const closeButton = document.getElementById('close-content');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            // Clear the content area
            document.getElementById('content-area').innerHTML = `
                <div class="loading-indicator">
                    <div class="spinner" style="display: none;"></div>
                    <p>Please select content to load</p>
                </div>
            `;
            
            // Update the URL to remove the content parameter
            const url = new URL(window.location);
            url.searchParams.delete('content');
            window.history.pushState({}, '', url);
            
            // Reset the title
            document.getElementById('content-title').textContent = 'Content';
        });
    }
}

function modifyItemClickBehavior() {
    // Override the default click behavior in the renderItems function
    window.renderItems = function(items) {
        const gridContainer = document.getElementById('items-grid');
        
        // Clear any existing content
        gridContainer.innerHTML = '';
        
        // Create and append item elements
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.setAttribute('data-id', item.item_id);
            itemElement.setAttribute('role', 'button');
            itemElement.setAttribute('tabindex', '0');
            itemElement.setAttribute('aria-label', `Load ${item.item_name} content`);
            
            // Make the item load content instead of navigating
            itemElement.addEventListener('click', function() {
                loadContent(item.item_id, item.item_name);
                
                // Update URL with the content parameter
                const url = new URL(window.location);
                url.searchParams.set('content', item.item_id);
                window.history.pushState({}, '', url);
            });
            
            itemElement.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    loadContent(item.item_id, item.item_name);
                    
                    // Update URL with the content parameter
                    const url = new URL(window.location);
                    url.searchParams.set('content', item.item_id);
                    window.history.pushState({}, '', url);
                }
            });
            
            // Create item content
            itemElement.innerHTML = `
                <img src="${item.item_icon}" alt="${item.item_name}" class="item-icon">
                <div class="item-name">${item.item_name}</div>
            `;
            
            gridContainer.appendChild(itemElement);
        });
    };
}

function loadContent(contentId, contentName) {
    console.log("I am here: "+window.location.href)
    const contentArea = document.getElementById('content-area');
    const contentTitle = document.getElementById('content-title');
    
    // Update title if provided
    if (contentName) {
        contentTitle.textContent = contentName;
    } else {
        contentTitle.textContent = `Content #${contentId}`;
    }
    
    // Show loading indicator
    contentArea.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Loading content...</p>
        </div>
    `;
    
    // Scroll to content area
    contentArea.scrollIntoView({ behavior: 'smooth' });
    
    // Make AJAX request to get content
     //(`get-content.php?id=${encodeURIComponent(contentId)}`)
    fetch('partials/test.html')
        .then(response => {
            alert("Hey")
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Insert the loaded content
            contentArea.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            showErrorPage(contentArea, contentId);
        });
}

function showErrorPage(container, contentId) {
    container.innerHTML = `
        <div class="error-container">
            <h3>Error Loading Content</h3>
            <p>We couldn't load the requested content (ID: ${contentId}).</p>
            <p>Please check your connection and try again.</p>
            <button class="retry-btn" onclick="retryLoading('${contentId}')">Retry</button>
        </div>
    `;
}

function retryLoading(contentId) {
    loadContent(contentId);
}