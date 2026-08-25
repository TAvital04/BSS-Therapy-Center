/**
 * BSS Therapy Center - Client-Side Interactive Logic & EmailJS Integration
 * =========================================================================
 */

// EmailJS Credentials & Configuration
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "YOUR_EMAILJS_PUBLIC_KEY",    // Replace with your EmailJS Public Key
  SERVICE_ID: "YOUR_EMAILJS_SERVICE_ID",    // Replace with your Outlook Service ID
  TEMPLATE_ID: "YOUR_EMAILJS_TEMPLATE_ID"   // Replace with your Email Template ID
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS if SDK is loaded and public key is configured
  if (window.emailjs && EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY") {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log("EmailJS SDK initialized successfully.");
    } catch (err) {
      console.warn("EmailJS initialization failed:", err);
    }
  }

  const form = document.getElementById("appointment-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");
  const alertContainer = document.getElementById("form-alert-container");

  if (!form) return;

  // Form Submission Event Listener
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset error indicators & alert message
    clearErrors();
    hideAlert();

    // Validate inputs
    const isValid = validateForm();
    if (!isValid) {
      showAlert("Please correct the highlighted fields before submitting.", "error");
      return;
    }

    // Set UI to loading state
    setLoadingState(true);

    try {
      // Check if EmailJS is configured
      if (!window.emailjs || EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY") {
        // Fallback simulation mode for local testing / unconfigured credentials
        await new Promise((resolve) => setTimeout(resolve, 1200));
        console.log("Form submission simulated (EmailJS placeholders active).");
        showAlert("Thank you! Your appointment request has been submitted successfully.", "success");
        form.reset();
      } else {
        // Dispatch actual EmailJS dispatch
        const response = await emailjs.sendForm(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          form
        );

        if (response.status === 200) {
          showAlert("Thank you! Your appointment request has been submitted successfully.", "success");
          form.reset();
        } else {
          throw new Error(`EmailJS returned status ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showAlert("Failed to send message due to a network or server error. Please try again later.", "error");
    } finally {
      setLoadingState(false);
    }
  });

  // Client-Side Validation Logic
  function validateForm() {
    let valid = true;

    // Fields to validate
    const firstName = document.getElementById("first_name");
    const lastName = document.getElementById("last_name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const county = document.getElementById("county");
    const service = document.getElementById("service_selection");
    const subject = document.getElementById("subject");

    // Required Text Field Helper
    function checkRequired(input) {
      if (!input || !input.value.trim()) {
        markInvalid(input);
        valid = false;
      }
    }

    checkRequired(firstName);
    checkRequired(lastName);
    checkRequired(county);
    checkRequired(service);
    checkRequired(subject);

    // Email Pattern Check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email.value.trim())) {
      markInvalid(email);
      valid = false;
    }

    // Phone Pattern Check (minimum 7 digits)
    const phonePattern = /^[\d\s()+-]{7,20}$/;
    if (!phone || !phonePattern.test(phone.value.trim())) {
      markInvalid(phone);
      valid = false;
    }

    return valid;
  }

  function markInvalid(element) {
    if (element) {
      element.classList.add("invalid");
      // Add real-time event listener to clear invalid state on edit
      element.addEventListener("input", function handleInput() {
        element.classList.remove("invalid");
        element.removeEventListener("input", handleInput);
      });
    }
  }

  function clearErrors() {
    const invalidElements = form.querySelectorAll(".invalid");
    invalidElements.forEach((el) => el.classList.remove("invalid"));
  }

  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.textContent = "Sending Message...";
      btnSpinner.style.display = "inline-block";
    } else {
      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
      btnSpinner.style.display = "none";
    }
  }

  function showAlert(message, type) {
    alertContainer.textContent = message;
    alertContainer.className = `form-alert-container form-alert-${type}`;
    alertContainer.style.display = "block";
    alertContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideAlert() {
    alertContainer.style.display = "none";
    alertContainer.textContent = "";
  }
});
