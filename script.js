/**
 * BSS Therapy Center - Client-Side Interactive Logic & Web3Forms Integration
 * ===========================================================================
 * Handles Form Validation & Submission for Appointment Requests and Careers Applications.
 * Displays precise Web3Forms response status & messages.
 */

// Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = "f2404bb2-5fb2-4a19-ab72-e6f977eecc50";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointment-form") || document.getElementById("careers-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");
  const alertContainer = document.getElementById("form-alert-container");

  if (!form) return;

  const isCareersForm = form.id === "careers-form";

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

    const isValid = validateForm(isCareersForm);
    if (!isValid) {
      showAlert("Please correct the highlighted fields before submitting.", "error");
      return;
    }

    // 2. Set UI Loading State
    setLoadingState(true, isCareersForm);

    try {
      // 3. Live Web3Forms Dispatch
      const formData = new FormData(form);
      formData.set("access_key", WEB3FORMS_ACCESS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      let result;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const responseText = await response.text();
        if (responseText.includes("Pro feature") || responseText.includes("upgrade")) {
          result = { success: false, message: "File uploads require a Web3Forms Pro subscription. Please provide a Google Drive / LinkedIn resume link instead." };
        } else {
          result = { success: false, message: `Submission error (Status ${response.status}).` };
        }
      }

      if (response.ok && result.success) {
        const successMsg = isCareersForm
          ? "Thank you for applying! Your application has been submitted successfully."
          : "Thank you! Your appointment request has been submitted successfully.";
        showAlert(successMsg, "success");
        form.reset();
      } else {
        showAlert(result.message || "Web3Forms submission error. Please try again.", "error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showAlert("Failed to send submission due to a network connection error. Please try again later.", "error");
    } finally {
      setLoadingState(false, isCareersForm);
    }
  });

  // Client-Side Input Validation
  function validateForm(checkResume) {
    let valid = true;

    const firstName = document.getElementById("first_name");
    const lastName = document.getElementById("last_name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const county = document.getElementById("county");
    const service = document.getElementById("service_selection");
    const resumeInput = document.getElementById("resume");
    const resumeLink = document.getElementById("resume_link");

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

    // PDF Resume Check (if file input exists)
    if (checkResume && resumeInput) {
      const file = resumeInput.files[0];
      const maxBytes = 5 * 1024 * 1024; // 5MB limit

      if (!file) {
        markInvalid(resumeInput);
        valid = false;
      } else {
        const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";
        const isValidSize = file.size <= maxBytes;

        if (!isPdf || !isValidSize) {
          markInvalid(resumeInput);
          valid = false;
        }
      }
    }

    // Resume Link Check (if link input exists on Careers form)
    if (checkResume && resumeLink) {
      const val = resumeLink.value.trim();
      if (!val || val.length < 5) {
        markInvalid(resumeLink);
        valid = false;
      }
    }

    return valid;
  }

  function markInvalid(element) {
    if (element) {
      element.classList.add("invalid");
      const eventType = element.tagName === "SELECT" || element.type === "file" ? "change" : "input";
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

  function setLoadingState(isLoading, isCareers) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.textContent = isCareers ? "Submitting Application..." : "Sending Message...";
      btnSpinner.style.display = "inline-block";
    } else {
      submitBtn.disabled = false;
      btnText.textContent = isCareers ? "Submit Application" : "Send Message";
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
