# BSS Therapy Center Website

Production-ready, modern static website built for **BSS Therapy Center** (Better Support and Service) and configured for deployment on **GitHub Pages** with custom domain support and client-side EmailJS integration.

---

## 📁 Clean Repository Structure

```text
Orly/
├── index.html                 # Core HTML5 semantic page structure
├── styles.css                 # Custom CSS stylesheet with design tokens
├── script.js                  # Client-side form handling & EmailJS integration
├── CNAME                      # Custom domain configuration (example.com)
├── .nojekyll                  # Bypass Jekyll processing on GitHub Pages
├── README.md                  # Setup & deployment documentation
├── assets/
│   └── images/
│       ├── logo/              # BSS Therapy Center brand logo
│       ├── hero/              # Hero outreach booth feature image
│       ├── services/          # Pediatric therapy service cards
│       └── insurances/        # Accepted insurance provider logo icons
└── docs/
    ├── site_manifest.json     # Master JSON content & asset schema
    └── site_spec.md           # Full site specification document
```

---

## 🚀 GitHub Pages & Custom Domain Setup

1. **GitHub Pages Deployment:**
   - Go to your repository settings on GitHub under **Settings > Pages**.
   - Under **Build and deployment**, select **Deploy from a branch**.
   - Set Branch to `main` and Folder to `/ (root)`.

2. **Custom Domain Setup (`CNAME`):**
   - Replace the contents of `CNAME` with your custom domain (e.g. `bsstherapy.com`).
   - At your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), configure DNS records:
     - **A Records** pointing `@` to GitHub Pages IPs:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
     - **CNAME Record** pointing `www` to your GitHub username target (e.g., `<username>.github.io`).

---

## 📧 EmailJS Client Integration

The appointment form uses client-side EmailJS to route submissions through Microsoft 365 / Outlook:

1. Sign up at [EmailJS](https://www.emailjs.com/).
2. Add **Outlook / Microsoft 365** as your Email Service.
3. Update `PUBLIC_KEY`, `SERVICE_ID`, and `TEMPLATE_ID` in `script.js`.

---

## 🛠️ Local Development

Run a local HTTP server from the repository root:

```bash
python -m http.server 8080
```

Open `http://localhost:8080` in your web browser.
