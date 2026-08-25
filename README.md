# BSS Therapy Center | Website & Deployment Guide

Production-ready, modern static website for **BSS Therapy Center** (Better Support and Service). Built with HTML5, Vanilla CSS, and JavaScript, fully configured for deployment on **GitHub Pages** with custom domain support and client-side email handling via **EmailJS (Outlook / Microsoft 365)**.

---

## 🌟 Overview & Architecture

- **Frontend:** Semantic HTML5, CSS Grid & Flexbox, Vanilla JS (No build step required).
- **Hosting Target:** GitHub Pages (deployable from root `/` or `/docs`).
- **Domain Configuration:** Custom domain integration via `CNAME`.
- **Contact Form:** Client-side email dispatching via EmailJS SDK routed through an Outlook / Microsoft 365 account.

---

## 🛠️ Step-by-Step Setup & Configuration Guide

### 1. Linking an Outlook / Microsoft 365 Account in EmailJS

1. **Sign Up / Log In to EmailJS:**
   - Create a free account at [https://www.emailjs.com/](https://www.emailjs.com/).
2. **Add Email Service (Outlook / Office 365):**
   - In the EmailJS Dashboard, navigate to **Email Services** → **Add New Service**.
   - Select **Outlook** or **Office 365** (Microsoft Exchange).
   - Click **Connect Account** and log in with your BSS Therapy Center Outlook email credentials.
   - Save the service and note your **`SERVICE_ID`** (e.g., `service_abc123`).
3. **Create an Email Template:**
   - Navigate to **Email Templates** → **Create New Template**.
   - Set the email content to use the form variables:
     - **To Email:** `your-recipient@bsstherapycenter.com`
     - **Subject:** `{{subject}}`
     - **Body:**
       ```
       New Appointment Request from BSS Therapy Center Website:

       Name: {{first_name}} {{last_name}}
       Email: {{email}}
       Phone: {{phone}}
       County: {{county}}
       Selected Service: {{service_selection}}

       Additional Details:
       {{more_details}}
       ```
   - Save the template and note your **`TEMPLATE_ID`** (e.g., `template_xyz789`).
4. **Get Your Public Key:**
   - Navigate to **Account** → **API Keys** and copy your **`PUBLIC_KEY`** (e.g., `user_123456789`).
5. **Update `script.js`:**
   - Open [`script.js`](file:///c:/Users/talav/Documents/Github/Orly/script.js) and replace the placeholder values at the top:
     ```javascript
     const EMAILJS_CONFIG = {
       PUBLIC_KEY: "your_actual_public_key",
       SERVICE_ID: "your_actual_service_id",
       TEMPLATE_ID: "your_actual_template_id"
     };
     ```

---

### 2. Enabling GitHub Pages Deployment

1. **Push Code to GitHub Repository:**
   ```bash
   git add .
   git commit -m "Deploy BSS Therapy Center website"
   git push origin main
   ```
2. **Configure GitHub Pages in Repository Settings:**
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages** (under Code and automation).
   - Under **Build and deployment**:
     - **Source:** Select `Deploy from a branch`.
     - **Branch:** Select `main` and folder `/ (root)`.
   - Click **Save**.

---

### 3. Custom Domain Setup & DNS Configuration

1. **Update `CNAME` File:**
   - Open [`CNAME`](file:///c:/Users/talav/Documents/Github/Orly/CNAME) and replace `example.com` with your registered domain (e.g., `bsstherapycenter.com`).
2. **Configure DNS Records at Domain Registrar (GoDaddy, Namecheap, Cloudflare, etc.):**
   Add the following DNS records at your domain registrar:

   - **Apex / Root Domain A Records (Point to GitHub Pages IPs):**
     | Type | Host / Name | Target IP Address |
     | :--- | :--- | :--- |
     | `A` | `@` | `185.199.108.153` |
     | `A` | `@` | `185.199.109.153` |
     | `A` | `@` | `185.199.110.153` |
     | `A` | `@` | `185.199.111.153` |

   - **Subdomain CNAME Record:**
     | Type | Host / Name | Target Value |
     | :--- | :--- | :--- |
     | `CNAME` | `www` | `<your-github-username>.github.io` |

3. **Enforce HTTPS in GitHub Settings:**
   - In GitHub Repository **Settings** → **Pages**, check **Enforce HTTPS** (TLS certificate will issue automatically within minutes).

---

## 🧪 Local Testing & Verification

To run and preview the website locally without an external web server build step:

```bash
# Using Python's built-in HTTP server
py -m http.server 8080
```

Open `http://localhost:8080` in your web browser to test responsiveness, card hover states, form input validations, and simulated EmailJS submissions.

---

## 📂 Asset Library Reference

The extracted image assets and content data are organized in the workspace as follows:

```
Orly/
├── CNAME                           # Domain mapping file
├── .nojekyll                       # Jekyll build bypass flag
├── index.html                      # Main HTML page
├── styles.css                      # Custom design system stylesheet
├── script.js                       # Interactive logic & EmailJS dispatch
├── ASSET_MANIFEST.json             # Master index of extracted JPEG image assets
├── assets/
│   ├── content/                    # Content JSON & design tokens
│   └── images/                     # Extracted JPEG images by category
│       ├── hero/
│       ├── insurances/
│       ├── locations/
│       ├── logo/
│       ├── services/
│       └── social/
└── content/                        # Human-readable copy in Markdown & JSON
```
