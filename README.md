# Atlas & Co — Industrial Construction Website

A multi-page client-facing website for **Atlas & Co**, a fictional industrial construction company established in 1964. Built as a student web development project using HTML, CSS, and vanilla JavaScript across multiple files.

---

## Live Demo

> Deploy to GitHub Pages and replace this line with your live link.

---

## Preview

| Page | Description |
|------|-------------|
| Home | Hero with scroll animation, featured projects, stats |
| Projects | Filterable project grid, live progress, bid requests |
| Expertise | Icon grid of construction disciplines |
| Sign In | LocalStorage-based authentication |
| Register | Account creation with validation |
| Dashboard | Project financials, budget variance, cash flow chart |
| Project Detail | Per-project breakdown |

---

## Features

### Navigation
- Sticky black navbar with orange accent border
- Desktop nav with Font Awesome icons on every link
- Atlas & Co brand title lives on the hero section and fades into the navbar as you scroll down

### Home Page
- Full-screen hero with Unsplash background image and dark gradient overlay
- Large brand title with staggered fade-up entrance animations
- Featured project cards with scroll reveal animation on entry
- Company stats — 60+ years, 340+ projects, 18 active sites

### Projects Page
- Six project cards filterable by All, Public, and Private
- Clicking a card opens a full project detail page built dynamically by JavaScript
- Live ongoing projects section with progress bars that increment slowly in real time
- Public bid requests section showing government and charity bids with status badges — Finalising, Finalised, Cancelled, Under Review

### Project Detail Page
- Hero image with gradient overlay and back button
- Full project description
- Stats sidebar showing location, year, duration, budget, actual cost, dollar variance, and percentage variance
- Completion progress bar
- Animated entrance on open

### Authentication
- Register with name, company, email, and password — saved to localStorage
- Sign in checks credentials against stored users
- Session persists across page reloads
- Nav updates dynamically based on login state
- Protected dashboard — redirects to sign in if not logged in

### Client Dashboard
- Welcome message with user name and company
- Four stat boxes — total projects, active sites, total budget, average progress
- Per-project cards showing budget, actual spend, forecasted total cost, budget variance in dollars and percentage
- Canvas-drawn cash flow chart comparing actual vs planned spend month by month
- Logout button

### Expertise Page
- Ten construction discipline cards with Font Awesome icons
- Staggered cascade animation each time the page is visited

---

## File Structure

```
atlas-co-website/
├── index.html       — All pages in one file using CSS :target routing
├── style.css        — All styles including responsive breakpoints
├── nav.js           — Hamburger menu, nav logo scroll animation, back to top
├── auth.js          — LocalStorage login, register, logout, nav state
├── projects.js      — Project data, filter, card click, detail page, live updates
├── dashboard.js     — Dashboard render, financials, canvas cash flow chart
├── animations.js    — Scroll reveal, expertise page stagger animation
└── README.md
└── LICENCE
```

---

## How It Works

### Page Routing
All pages live inside one `index.html` file as `div` elements with unique IDs. Navigation uses standard anchor links with `href="#pageid"`. CSS reads the hash from the URL using the `:target` selector and shows the matching page while hiding all others. No JavaScript is involved in page switching.

```css
.page { display: none; }
.page:target { display: block; }
#home { display: block; }
#projects:target ~ #home { display: none; }
```

The home div must always be last in the HTML because the CSS sibling selector `~` only reaches elements that come after the targeted element in the source order.

### LocalStorage Authentication
When a user registers their details are saved to `localStorage` as a JSON array. On login the stored array is checked for a matching email and password. The current user is saved separately so the session persists across reloads. The dashboard is protected — navigating to `#dashboard` without a stored session redirects to sign in.

---

## Technology Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Page structure and content |
| CSS3 | Styling, layout, animations, responsive design |
| Vanilla JavaScript | All interactive features across 5 separate files |
| Unsplash | Project card and hero background images |
| Google Fonts — Nunito Sans | Primary typeface |
| Canvas API | Cash flow chart on dashboard |
| localStorage | User authentication and session management |

---

## How to Run

No installs, no build steps, no server required.

1. Clone or download the repository
2. Make sure all 7 files are in the same folder
3. Open `index.html` in any modern browser

```bash
git clone https://github.com/yourusername/atlas-co-website.git
cd atlas-co-website
open index.html
```

To test the dashboard register a new account first then sign in. The dashboard will load with your name and company displayed.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| Below 900px | Hamburger menu appears, desktop nav hides, cards go to 2 columns |
| Below 600px | Cards go to 1 column, portal box adjusts padding, footer stacks |
| Below 380px | Hero buttons stack vertically, expertise grid goes to 1 column |

---

## Roadmap

- [ ] Scroll animations fully working across all browsers
- [ ] Smooth CSS transitions between pages
- [ ] Backend integration for real authentication
- [ ] Live project data from an API or ERP system
- [ ] Bid submission form that sends an email
- [ ] Admin panel for managing projects and bids
- [ ] Multi-language support
