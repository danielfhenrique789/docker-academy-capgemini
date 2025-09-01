# Use a lightweight official Python image as the base
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /code

# Copy the requirements file into the container
COPY ./requirements.txt /code/

# Install the required Python packages
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of the application code into the container
COPY ./main.py /code/
COPY ./modules/ /code/modules/
COPY ./static/ /code/static/

# Expose port 80 to the outside world
EXPOSE 80

# The command to run the application when the container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]