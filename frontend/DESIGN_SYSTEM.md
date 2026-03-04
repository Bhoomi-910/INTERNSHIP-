# Design System & UI/UX Guidelines

## 1. Visual Identity

### Color Palette
we use a modern, trustworthy, and energetic palette suitable for career development.

-   **Primary**: `Indigo-600` (#4F46E5) - Main actions, branding, links.
-   **Secondary**: `Purple-600` (#9333EA) - Gradients, accents, "AI" features.
-   **Success**: `Emerald-500` (#10B981) - Match scores, success states.
-   **Warning**: `Amber-500` (#F59E0B) - Skill gaps, warnings.
-   **Error**: `Red-500` (#EF4444) - Errors, deletions.
-   **Background**: `Gray-50` (#F9FAFB) - Main page background.
-   **Surface**: `White` (#FFFFFF) - Cards, sidebar, navbar.
-   **Text**:
    -   Primary: `Gray-900` (#111827)
    -   Secondary: `Gray-500` (#6B7280)

### Typography
**Font Family**: `Outfit` (sans-serif) - Geometric, clean, and friendly.

-   **H1**: text-4xl font-extrabold tracking-tight
-   **H2**: text-2xl font-bold
-   **H3**: text-lg font-semibold
-   **Body**: text-base font-normal text-gray-600
-   **Small**: text-sm font-medium text-gray-500

### Shadows & Radius
-   **Cards**: `shadow-sm hover:shadow-md` | `rounded-xl`
-   **Buttons**: `shadow-sm` | `rounded-lg`
-   **Input**: `shadow-sm` | `rounded-md`

## 2. Components

### Buttons
-   **Primary**: `bg-indigo-600 text-white hover:bg-indigo-700`
-   **Secondary**: `bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50`
-   **Ghost**: `text-gray-600 hover:text-indigo-600 hover:bg-gray-50`

### Cards
```jsx
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  {/* Content */}
</div>
```

### Inputs
```jsx
<input className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
```

## 3. Layouts

### Public Layout (Home, Login)
-   Top Navbar (Sticky, Backdrop Blur)
-   Full-width content sections
-   Footer

### Dashboard Layout
-   Left Sidebar (Collapsible on mobile)
-   Top Header (Search, Notifications, Profile)
-   Main Content Area (Gray-50 background)

## 4. Design Philosophy
-   **Minimalism**: Whitespace is active content.
-   **Glassmorphism**: Subtle use of backdrop-blur for overlays and sticky headers.
-   **Micro-interactions**: Hover states on cards and buttons to show interactivity.
