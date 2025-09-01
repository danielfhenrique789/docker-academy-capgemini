from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

# Create an instance of the FastAPI class
app = FastAPI()

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Mount a directory for static files (like CSS, JS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configure the templates directory
templates = Jinja2Templates(directory="modules")

# The new route to handle dynamic paths and return HTML
@app.get("/{page_name}", response_class=HTMLResponse)
async def serve_page(request: Request, page_name: str):
    return templates.TemplateResponse(f"{page_name}.html", {"request": request})

# Define the root endpoint
@app.get("/")
def read_root():
    """
    Returns a simple JSON response.
    """
    return {
        "host":"http://localhost:8000/",
        "items": [
            {
                "item_name": "Gateway",
                "item_id": "1",
                "item_icon": "http://www.somepage.com/default_icon.png",
                "url": "content_loader.html?content=gateway"
            },
            {
                "item_name": "item 2",
                "item_id": "2",
                "item_icon": "http://www.somepage.com/default_icon.png",
                "url": "content_loader.html?content=item2"
            }
        ]
    }

# You can also define an endpoint that returns more complex data,
# like a list of items.
@app.get("/items/{item_id}")
def read_item(item_id: int, query_param: str = None):
    """
    Returns a JSON object for a specific item.
    - item_id: The unique ID of the item.
    - query_param: An optional query parameter.
    """
    item_data = {
        "item_id": item_id,
        "name": "Example Item",
        "description": "This is a description of the item.",
        "query": query_param
    }
    return item_data