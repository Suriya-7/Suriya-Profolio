function showToast(message, type) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: type === "success" ? "green" : type === "error" ? "red" : "orange",
      close: true
    }).showToast();
  }
  
  function validateAndSend() {
    // Clear previous errors
    document.getElementById("firstNameError").textContent = "";
    document.getElementById("lastNameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
  
    // Get input values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    let isValid = true;
  
    // Validate form inputs
    if (firstName === "") {
      document.getElementById("firstNameError");
      showToast("First name is required.", "warning");
      isValid = false;
    }
  
    if (lastName === "") {
      document.getElementById("lastNameError");
      showToast("Last name is required.", "warning");
      isValid = false;
    }
  
    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      document.getElementById("emailError");
      showToast("Please enter a valid email.", "warning");
      isValid = false;
    }
  
    if (message === "") {
      document.getElementById("messageError");
      showToast("Message is required.", "warning");
      isValid = false;
    }
  
    if (isValid) {
      sendEmail(firstName, lastName, email, message);
    }
  }
  
  function sendEmail(firstName, lastName, email, message) {
    const formData = new FormData();
    formData.append("access_key", "06a6e1d4-50b7-4aca-a6b7-d37325f88abf");
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("message", message);
  
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast("Email sent successfully!", "success");
          document.getElementById("contactForm").reset();
        } else {
          showToast("Failed to send email. Please try again.", "error");
        }
      })
      .catch(error => {
        showToast("Error: " + error, "error");
      });
  }
  