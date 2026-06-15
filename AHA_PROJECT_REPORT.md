# AHA Automobiles Project Report

## Project Overview

The AHA Automobiles project was developed as a premium digital marketing funnel for NexCruise by AHA Automobiles. The goal was to create a client-ready experience where users can learn about the product, select their car brand, check compatibility, interact with AHA-specific content, submit callback leads, and continue through WhatsApp.

The project evolved from a basic landing page into a more dynamic compatibility-focused funnel, with Streamlit now treated as the main demo/prototype direction.

## Repository

GitHub repository:
https://github.com/aaryan1107/ahalandingpage

Latest pushed commit:
`c2151eb Add UTM-aware Streamlit funnel personalization`

Current branch:
`main`

Working tree status:
Clean

## Major Work Completed

### 1. Initial React + Vite Website

A complete frontend website was created using React and Vite.

Implemented sections included:

- Hero section
- Dynamic car brand selector
- Compatibility checker
- Feature cards
- Detailed feature tabs
- FAQ accordion
- Updates/news section
- Mini game section
- Lead capture form
- WhatsApp CTAs
- Footer

The React app included responsive layout, dark/light mode, smooth section navigation, and Meta Pixel tracking placeholders.

### 2. Meta Pixel and Event Tracking

Meta Pixel was integrated using the provided Pixel ID:

`2687561291629470`

Tracking support was added for:

- PageView
- Lead
- Used_Tool
- BrandSelected
- CheckCompatibilityClicked
- CompatibilityFormSubmitted
- RequestCallbackSubmitted
- WhatsAppClicked
- FAQOpened
- MiniGameCompleted

The Meta test event code flow was also added:

- Default test event code: `TEST40117`
- Can be overridden using URL query param:
  `?test_event_code=YOUR_CODE`

This was done so events can appear in Meta Events Manager during testing.

### 3. Cloudflare Pages Deployment Setup

The React/Vite app was prepared for Cloudflare Pages deployment.

Recommended Cloudflare Pages settings:

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: blank or `/`
- Production branch: `main`
- Node version: `20`

Important note:

Cloudflare Pages supports the static React build. It does not host the Streamlit app directly.

### 4. Premium React UI Redesign

The React website UI was redesigned after feedback that the earlier version did not feel premium enough.

Changes included:

- Removed weak green-heavy visual direction
- Introduced premium automotive palette
- Used graphite, silver, white, and electric blue styling
- Improved spacing, typography, and card design
- Added stronger hero messaging
- Added dynamic selected-brand context in the hero
- Improved brand cards and button styling
- Fixed brand logo fallback issue where text appeared behind logos

The React redesign was committed as:

`e68878b Upgrade premium automotive UI`

### 5. Streamlit Dashboard Prototype

A separate Streamlit app was created as a premium compatibility dashboard/prototype.

Main files:

- `app.py`
- `components/header.py`
- `components/dashboard_hero.py`
- `components/brand_selector.py`
- `components/compatibility_workspace.py`
- `components/assistant_panel.py`
- `components/vehicle_showcase.py`
- `components/minigame.py`
- `components/lead_capture.py`
- `components/footer.py`
- `data/vehicles.py`
- `styles/theme.py`
- `utils/state.py`

The Streamlit app runs locally on:

`http://127.0.0.1:8502/`

### 6. Streamlit Became the Main Direction

After feedback, the Streamlit UI became the final/main project direction.

The old generic EV dashboard content was removed and replaced with AHA/NexCruise-specific content.

Removed demo-style content such as:

- Volvo
- Tesla
- Mercedes
- BMW
- Generic EV charging language

Replaced with AHA Automobiles content:

- NexCruise by AHA Automobiles
- Plug-and-play cruise control
- Eco / Sport / City modes
- Speed governor
- No wire cutting
- OBD + accelerator pedal coupler
- Steering-mounted dial
- iCAT certified
- 30-minute install path
- 50+ installer cities
- Starting price references
- 7-day trial/support messaging

This work was committed as:

`20cc7a7 Integrate AHA funnel into Streamlit UI`

### 7. Dynamic Brand-Specific Website Logic

The Streamlit app now supports dynamic brand-specific content.

Brands included:

- Tata
- Mahindra
- Hyundai
- Kia
- Maruti Suzuki
- Toyota
- Honda
- MG

For each brand, the app includes:

- Brand name
- Clean logo URL
- Accent color
- Brand-specific tone
- Fleet description
- Sample compatible models
- Fit confidence
- Install notes
- Recommendations

Examples:

Tata:

- Nexon
- Nexon EV
- Harrier
- Safari
- Punch
- Altroz
- Tiago
- Tigor
- Curvv
- Hexa

Mahindra:

- XUV700
- Scorpio N
- Thar
- XUV300
- XUV3XO
- Bolero Neo
- Marazzo
- XUV500

The selected brand changes:

- Model dropdown
- Brand card highlight
- Vehicle showcase
- Compatibility copy
- Assistant recommendations
- Lead form context

### 8. Compatibility Workspace

The Streamlit compatibility workspace was built to act like the core funnel engine.

User can select:

- Car model
- Primary use case
- Variant interest
- City/region

The app then calculates a fit score and shows:

- Fit status
- AHA fit score
- Pedal coupler review
- Cruise behaviour review
- Install complexity
- Region support
- AHA Fitment Assistant recommendations

Statuses include:

- Excellent Fit
- Needs Review
- Limited Fit

### 9. Mini Game

A lightweight automobile-themed game was added:

`AHA Cruise Challenge`

The game supports:

- Start NexCruise
- Eco Mode
- Sport Mode
- AHA Zone
- Reset

It updates:

- Comfort score
- Energy
- Current route/mode decision
- Feedback message

The purpose is to increase user engagement and support retargeting as an interactive tool event.

### 10. Lead Capture / Callback Funnel

A lead capture section was added in Streamlit.

Fields include:

- Full name
- Phone number
- Car brand
- Car model
- City
- Preferred contact time
- Requirement

On submission, the app shows a success message.

Backend/API integration is currently a placeholder. The intended backend path is to send lead data into:

- CRM
- Google Sheets
- Supabase
- Email automation
- Any AHA lead API

### 11. WhatsApp CTA

WhatsApp CTA links were added using placeholder:

`https://wa.me/91XXXXXXXXXX`

This should be replaced with the actual AHA Automobiles WhatsApp number before public launch.

### 12. UTM-Based Dynamic Funnel Personalization

UTM logic was added to make the Streamlit funnel dynamic based on traffic source.

Supported query params:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `brand`
- `model`

Supported source profiles:

- Instagram
- Facebook
- Meta Ads
- WhatsApp
- Google
- Direct

Example URL:

`http://127.0.0.1:8502/?utm_source=instagram&utm_medium=paid_social&utm_campaign=nexcruise_launch&utm_content=reel_01&brand=Mahindra&model=XUV700`

This can dynamically:

- Change hero headline
- Change hero subcopy
- Show campaign/source context
- Preselect brand
- Preselect model
- Carry attribution into the lead form

This work was committed as:

`c2151eb Add UTM-aware Streamlit funnel personalization`

### 13. UI/UX Improvements

The final Streamlit UI was redesigned using the provided inspiration folder:

`C:\Users\Aaryan Kansal\Desktop\AHA\one-page-landing-main\inspo`

Design direction:

- Premium automotive dashboard
- Silver/graphite/blue visual palette
- Strong typography
- Large hero section
- Clean card system
- Better spacing
- Clean brand cards
- Premium CTA buttons
- Modern glass-style panels
- Responsive layout

Reference themes considered:

- Automotive product pages
- Dashboard-style compatibility tools
- Premium car/EV visual language
- Appinventiv-style funnel forms
- GM-style polished product aesthetic

## Testing and Verification Done

### React/Vite

Verified:

- `npm run build` passes
- No broken images
- Brand selection works
- Theme toggle works
- No horizontal overflow
- Meta Pixel test payload present

### Streamlit

Verified:

- Python files compile successfully
- Streamlit runs on `http://127.0.0.1:8502/`
- AHA/NexCruise content appears
- Old demo brands removed
- Indian brand data appears
- Brand logos load
- No broken encoding characters
- No horizontal overflow
- Mahindra/XUV700 dynamic URL works
- UTM personalization works

## Current Local Run Commands

### Streamlit Main App

```bash
cd "C:\Users\Aaryan Kansal\Desktop\AHA\one-page-landing-main"
python -m streamlit run app.py --server.address 127.0.0.1 --server.port 8502 --server.headless true
```

Open:

`http://127.0.0.1:8502/`

### React/Vite Static Site

```bash
cd "C:\Users\Aaryan Kansal\Desktop\AHA\one-page-landing-main"
npm install
npm run dev
```

Build:

```bash
npm run build
```

Output:

`dist`

## Deployment Notes

### Cloudflare Pages

Cloudflare Pages can deploy the React/Vite static site.

Settings:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `20`
- Branch: `main`

### Streamlit

The Streamlit app cannot be deployed as a normal Cloudflare Pages static site.

Recommended hosting options for Streamlit:

- Streamlit Community Cloud
- Render
- Railway
- Hugging Face Spaces
- VPS
- Cloud Run

## Important Replacement Items Before Final Launch

Replace:

- WhatsApp placeholder number: `https://wa.me/91XXXXXXXXXX`
- Any placeholder social links
- Backend lead API/CRM integration
- Final production hosting decision for Streamlit

Optional improvements:

- Add real AHA logo asset if available
- Add actual product images/videos
- Add real backend lead storage
- Add server-side Meta Conversion API
- Add Google Analytics/GA4 ID
- Add form validation and phone formatting
- Add admin lead dashboard

## Commit Timeline

Recent major commits:

- `84766ef` Initial AHA Automobiles website
- `7726814` Redesign premium brand-specific UI
- `d6fbf30` Add Meta test event code payload
- `ef88c78` Clean brand logos and align dashboard styling
- `afc5e74` Add premium Streamlit compatibility dashboard
- `e68878b` Upgrade premium automotive UI
- `20cc7a7` Integrate AHA funnel into Streamlit UI
- `c2151eb` Add UTM-aware Streamlit funnel personalization

## Final Current Status

The AHA project now has:

- A React/Vite marketing funnel suitable for static deployment
- A premium Streamlit compatibility dashboard as the main demo direction
- Dynamic brand-specific content
- AHA/NexCruise product information
- Compatibility checker logic
- Lead capture funnel
- WhatsApp CTA
- Mini game
- FAQ and feature sections
- Meta Pixel/event planning
- UTM-based campaign personalization
- GitHub integration with all changes pushed to `main`

The latest project state is pushed to:

https://github.com/aaryan1107/ahalandingpage
