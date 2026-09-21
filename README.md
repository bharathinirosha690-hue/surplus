# RePlate — Food Waste Prevention & Surplus Redistribution Platform

> **“Good food deserves a second destination.”**

**RePlate** is a professional, modern web application that empowers restaurants, bakeries, grocery stores, hostels, and caterers to turn excess edible meals into immediate community meals before they go to waste.

---

## 🌟 Key Differentiating Features

1. **Food Rescue Lifecycle Timeline (`FoodTimeline`)**
   - Visual step-by-step progress tracking for every food lot:
     `Listed` → `Available` → `Reserved` → `Pickup Scheduled` → `Collected`
   - Real-time stage indicators with animated progress transitions.

2. **Dynamic Food Urgency System (`UrgencyBadge` & `timeCalculator`)**
   - Automated status based on real-time countdown to pickup deadline:
     - **Safe Window**: > 4 hours remaining
     - **Attention Needed**: 1 to 4 hours remaining
     - **Rescue Now**: < 1 hour remaining (dynamic pulse animation)
     - **Expired**: Deadline passed

3. **Multi-Step Rescue Commitment Flow (`/rescue/:id`)**
   - Realistic 3-step structured reservation flow:
     - **Step 1**: Review food specifications and provider location.
     - **Step 2**: Select verified arrival window (15m, 30m, 45m, 1 hr).
     - **Step 3**: Confirm receiver details & generate cryptographic handover pass (`REP-XXXX`).

4. **Waste Prevention Score & ESG Analytics (`impactCalculator`)**
   - Transparent, professional scoring engine:
     - **+20 pts** for successful rescue
     - **+10 pts** speed bonus
     - **+5 pts** for active listing
     - **-10 pts** penalty for unrescued expired food
   - Automated calculations for meals redirected, CO₂e emissions avoided (~2.5 kg CO₂e / kg), and agricultural water conserved (~850 L / kg).

5. **Intelligent Food Match Indicator (`calculateMatchLevel`)**
   - Calculates real-time rescue match levels (**High Match**, **Good Match**, **Limited Match**) based on portion volume, time window, and food category with explanatory reasoning.

6. **Provider Operations Dashboard (`/my-listings`)**
   - Real-time search, category filter, urgency sorting, and custom accessible `ConfirmModal` for deleting listings (no browser alert dialogs).
   - Quick action to mark items as collected.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, JavaScript (ES6+), React Router DOM (v6), React Icons
- **Styling**: Pure Modern CSS with CSS custom properties, glassmorphism, responsive grid & flexbox, accessible focus rings, prefers-reduced-motion support
- **HTTP Client**: Axios (Strictly `GET`, `POST`, `PUT`, `DELETE` operations)
- **Database / REST API**: JSON Server (`src/data/db.json`)

---

## 🚀 Quick Start & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Application (Concurrent Frontend + JSON Server)
```bash
npm start
```
* Or run separately in two terminals:
  ```bash
  # Terminal 1: Run JSON-Server API on port 5000
  npm run server

  # Terminal 2: Run Vite Dev Server on port 3000
  npm run dev
  ```

### 3. Open in Browser
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **JSON Server API**: [http://localhost:5000/foods](http://localhost:5000/foods)

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── ConfirmModal.jsx     # Custom accessible confirmation dialog
│   ├── EmptyState.jsx       # Fallback empty view with CTA
│   ├── FoodCard.jsx         # Surplus food display card with badges
│   ├── FoodTimeline.jsx     # 5-stage rescue lifecycle timeline
│   ├── Footer.jsx           # Global semantic footer
│   ├── ImpactCounter.jsx    # Animated number count-up widget
│   ├── LoadingState.jsx     # Clean spinner loading indicator
│   ├── Navbar.jsx           # Responsive blurred navigation
│   ├── SearchFilter.jsx     # Reusable search & multi-tier filter bar
│   └── UrgencyBadge.jsx     # Dynamic countdown & urgency pill
│
├── pages/
│   ├── About.jsx            # Mission, standards, and safety pillars
│   ├── AddSurplus.jsx       # Food listing registration form with validation
│   ├── DiscoverFood.jsx     # Search, filter, and sort discovery catalog
│   ├── EditSurplus.jsx      # Listing editor using PUT requests
│   ├── FoodDetails.jsx      # Full specification, timeline, and actions
│   ├── Home.jsx             # High-impact landing page with live metrics
│   ├── HowItWorks.jsx       # 4-stage operational storytelling flow
│   ├── Impact.jsx           # Public metrics & Prevention Score breakdown
│   ├── MyListings.jsx       # Provider inventory management dashboard
│   ├── NotFound.jsx         # 404 recovery page
│   └── RescueFlow.jsx       # 3-step pickup commitment flow
│
├── layouts/
│   └── MainLayout.jsx       # Main application shell with Outlet
│
├── data/
│   └── db.json              # Realistic sample surplus food database
│
├── services/
│   └── api.js               # Centralized Axios service (GET, POST, PUT, DELETE)
│
├── utils/
│   ├── foodStatus.js        # Lifecycle constants & match level logic
│   ├── impactCalculator.js  # Prevention score formula & metrics
│   └── timeCalculator.js    # Urgency levels & deadline calculations
│
├── App.jsx                  # React Router routes definition
├── main.jsx                 # Application DOM entry point
└── index.css                # Global design system & theme variables
```

---

## 🔒 Accessibility & Performance
- Full keyboard navigation and visible focus rings.
- Semantic HTML tags (`<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`).
- Fluid responsiveness tested across 320px, 375px, 768px, 1024px, and 1440px.
- Built-in `prefers-reduced-motion` CSS rules.
