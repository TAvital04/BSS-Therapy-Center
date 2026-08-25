/**
 * BSS Therapy Center - Client-Side Interactive Logic & Web3Forms Integration
 * ===========================================================================
 * Web3Forms handles contact submissions directly to your inbox with zero OAuth.
 * Automatically sets Reply-To header so hitting 'Reply' in your inbox responds to the patient.
 */

// Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = "f2404bb2-5fb2-4a19-ab72-e6f977eecc50";

document.addEventListener("DOMContentLoaded", () => {
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

    // 1. Client-Side Honeypot & Input Validation
    const botCheck = form.querySelector('input[name="botcheck"]');
    if (botCheck && botCheck.checked) {
      console.warn("Spambot detected via honeypot field. Submission dropped.");
      form.reset();
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      showAlert("Please correct the highlighted fields before submitting.", "error");
      return;
    }

    // 2. Set UI Loading State
    setLoadingState(true);

    try {
      // 3. Live Web3Forms Dispatch
      const formData = new FormData(form);
      formData.set("access_key", WEB3FORMS_ACCESS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        showAlert("Thank you! Your appointment request has been submitted successfully.", "success");
        form.reset();
      } else {
        throw new Error(result.message || "Web3Forms submission error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showAlert("Failed to send message due to a network error. Please try again later.", "error");
    } finally {
      setLoadingState(false);
    }
  });

  // Client-Side Input Validation
  function validateForm() {
    let valid = true;

    const firstName = document.getElementById("first_name");
    const lastName = document.getElementById("last_name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const county = document.getElementById("county");
    const service = document.getElementById("service_selection");

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

    // Email Pattern Check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.value.trim() || !emailPattern.test(email.value.trim())) {
      markInvalid(email);
      valid = false;
    }

    // Phone Pattern Check (accepts numbers, spaces, dashes, parentheses: 7-20 chars)
    const cleanPhone = phone ? phone.value.replace(/[\s()+-]/g, "") : "";
    if (!phone || !phone.value.trim() || cleanPhone.length < 7 || isNaN(cleanPhone)) {
      markInvalid(phone);
      valid = false;
    }

    return valid;
  }

  function markInvalid(element) {
    if (element) {
      element.classList.add("invalid");
      // Add real-time event listener to clear invalid state on edit
      const eventType = element.tagName === "SELECT" ? "change" : "input";
      element.addEventListener(eventType, function handleInput() {
        element.classList.remove("invalid");
        element.removeEventListener(eventType, handleInput);
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
