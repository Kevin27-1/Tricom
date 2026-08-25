# Tri-Com Recycling Depot

Official web platform for the **Tri-Com Recycling Depot** serving the Opaskwayak Cree Nation (OCN) and surrounding communities.

---

## 🌟 Overview

Tri-Com Recycling provides modern, sustainable waste management, recycling stewardship, and community services. The web application features an immersive, responsive design with specialized desktop and mobile experiences.

## 🚀 Key Features

- **Dynamic Interactive Experience**: Frame-by-frame interactive scroll and smooth animations powered by Lenis smooth scrolling.
- **Adaptive Responsive Design**: Tailored desktop (`index.html`) and mobile (`mobile.html`) layouts with bidirectional viewport synchronization.
- **Material Acceptance Guide**: Comprehensive searchable directory of accepted and non-accepted materials with stewardship details.
- **Depot Schedule & Drop-off Tracker**: Live operating hours, interactive depot locations, and seasonal schedule updates.
- **Admin Dashboard**: Content management interface for notices, schedules, and depot news (`admin.html`).

## 📁 Project Structure

```
Tricom/
├── index.html              # Main desktop web experience
├── mobile.html             # Dedicated mobile-optimized interface
├── admin.html              # Depot administrative portal
├── api_server.py           # Backend helper server for updates & API endpoints
├── Done/                   # High-resolution material & category iconography
├── ezgif*, lovable_assets/ # Animation frame sequences and visual assets
└── .gitignore              # Ignored build logs, cache, and private keys
```

## 🛠️ Local Development

You can preview the site locally using any static HTTP server or Python's built-in server:

```bash
# Start a local static preview server
python -m http.server 8000
```

Then open `http://localhost:8000` in your web browser.

---

## 📄 License

All rights reserved © Tri-Com Recycling.
