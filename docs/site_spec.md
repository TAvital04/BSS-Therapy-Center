# BSS Therapy Center - Site Specification & Documentation

**Project:** BSS Therapy Center Website  
**Hosting Target:** GitHub Pages (`/` root or `/docs`)  
**Last Updated:** August 25, 2026  

---

## 📁 Repository Structure

```text
Orly/
├── index.html                 # Core semantic HTML5 page markup with Honeypot Anti-Spam
├── styles.css                 # Modular CSS stylesheet (Design Tokens, Cards, Form)
├── script.js                  # Form validation & Web3Forms integration
├── CNAME                      # GitHub Pages custom domain configuration
├── .nojekyll                  # Jekyll build bypass file for GitHub Pages
├── README.md                  # Developer documentation & deployment guide
├── assets/
│   └── images/
│       ├── logo/              # Brand logo PNG mark (897x646 px)
│       ├── hero/              # Hero community booth photo (472x340 px)
│       ├── services/          # 5 service photo cards (ABA, HHA, PT, ST, OT)
│       └── insurances/        # 7 official insurance provider logos
└── docs/
    ├── site_manifest.json     # Single authoritative JSON asset & content schema
    └── site_spec.md           # Master site content specification
```

---

## 🛡️ Anti-Spam Implementation

1. **Invisible Honeypot (`name="botcheck"`):**
   - Configured in `index.html` and verified in `script.js`.
   - Invisible to human patients (`display: none !important;`).
   - Automatically tricks and drops automated spambots.
2. **Web3Forms Server-Side Spam Filter:**
   - Web3Forms API validates incoming payloads and filters out spam keywords.

---

## 🎨 Asset Summary

### 1. Logo & Hero
- **Logo:** `assets/images/logo/bss_therapy_center_logo.png` (897×646 px PNG)
- **Hero Photo:** `assets/images/hero/hero_community_booth.jpg` (472×340 px JPEG)

### 2. Services Section (5 Photos)
- **ABA Therapy:** `assets/images/services/applied_behavior_analysis.jpg` (1024×1024 px)
- **Home Health Aid:** `assets/images/services/home_health_aid.jpg` (1200×896 px)
- **Physical Therapy:** `assets/images/services/physical_therapy.jpg` (1024×1024 px)
- **Speech Therapy:** `assets/images/services/speech_therapy.jpg` (1200×896 px)
- **Occupational Therapy:** `assets/images/services/occupational_therapy.jpg` (1024×1024 px)

### 3. Insurances Accepted (7 Logos)
- **Children's Medical Services:** `assets/images/insurances/childrens_medical_services.jpg` (495×495 px)
- **Molina:** `assets/images/insurances/molina.jpg` (360×360 px)
- **Cigna:** `assets/images/insurances/cigna.jpg` (272×257 px)
- **Aetna:** `assets/images/insurances/aetna.jpg` (268×268 px)
- **Carelon:** `assets/images/insurances/carelon.jpg` (200×200 px)
- **Humana:** `assets/images/insurances/humana.jpg` (400×400 px)
- **Community Care Plan:** `assets/images/insurances/community_care_plan.jpg` (225×225 px)
