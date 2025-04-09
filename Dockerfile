# Use a lightweight Python image
FROM python:3.9-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files
COPY server.py .

# Install only required dependencies
RUN pip install --no-cache-dir flask

# Expose port 8080 for the web server
EXPOSE 8085

# Run the server
CMD ["python", "server.py"]
