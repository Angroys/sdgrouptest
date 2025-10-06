document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const text = document.getElementById('text').value;

    // Send a POST request to the backend
    fetch('/api/reviews/add-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, rating, text }) // Convert data to JSON
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => {
        const responseDiv = document.getElementById('response');
        if (data.success) {
            responseDiv.innerHTML = `<p>${data.message}</p>`;
            document.getElementById('review-form').reset(); // Reset the form
        } else {
            responseDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = '<p>Something went wrong!</p>';
    });
});
