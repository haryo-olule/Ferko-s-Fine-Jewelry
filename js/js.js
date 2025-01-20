// Select the form element using its class name
document.querySelector('.registration-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent default form submission (page reload)

  const form = e.target; // Get the form being submitted
  const formData = new FormData(form); // Collect form data
  const responseMessage = document.createElement('div'); // Create a response message element
  responseMessage.style.marginTop = '20px';
  responseMessage.style.fontSize = '16px';

  // Remove any existing response message before appending a new one
  const existingMessage = form.querySelector('div');
  if (existingMessage) {
    existingMessage.remove();
  }

  form.appendChild(responseMessage); // Append the response message to the form

  try {
    // Send the form data to the specified action URL
    const response = await fetch(form.action, {
      method: form.method, // Use the form's method (POST in this case)
      body: formData, // Pass the form data
    });

    if (response.ok) {
      // Handle success response
      responseMessage.style.color = 'green';
      responseMessage.innerHTML = 'Form submitted successfully! Thank you.';
      form.reset(); // Optionally reset the form fields
    } else {
      // Handle server-side errors
      const errorData = await response.text();
      responseMessage.style.color = 'red';
      responseMessage.innerHTML = 'Failed to submit the form. Please try again later.';
      console.error('Form submission error:', errorData);
    }
  } catch (error) {
    // Handle network or client-side errors
    responseMessage.style.color = 'red';
    responseMessage.innerHTML = 'A network error occurred while submitting the form.';
    console.error('Network error:', error);
  }
});
