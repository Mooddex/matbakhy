# Application Features and Design System

## User Stories

### Browsing Kitchens
- **As a user**, I want to view a list of kitchens presented as cards, so that I can browse available options efficiently.
- **As a user**, I want to see the kitchen's name, maker, and a preview image, so that I can quickly identify kitchens that interest me.
- **As a user**, I want to read a brief description of the kitchen, so that I can understand what is being offered without navigating away.

### Key Information
- **As a customer**, I want to see the price in EGP clearly displayed, so that I can determine if it fits my budget.
- **As a customer**, I want to see the location of the kitchen, so that I can assess logistical convenience.
- **As a customer**, I want to see the maker's name and phone number, so that I can contact them if necessary.

### Navigation
- **As a user**, I want to click on a kitchen card to navigate to a detailed view, so that I can learn more about a specific kitchen.

## Color Palette

The application uses a distinct color scheme defined by Tailwind CSS utility classes found in the codebase.

### Primary Colors
- **Violet 900** (`text-violet-900`): Used for primary headings and kitchen names.
- **Violet 600** (`text-violet-600`): Used for icons and accents to guide the eye.

### Neutral Colors
- **Gray 800** (`text-gray-800`): Used for high-emphasis text like pricing.
- **Gray 700** (`text-gray-700`): Used for body text and descriptions.
- **Gray 600** (`text-gray-600`): Used for secondary metadata (Location, Maker, Phone).
- **White** (`bg-white`): Used for component backgrounds.

### UI Visuals
- **Shadows**: Uses `shadow-sm` for resting states and `shadow-lg` for hover states.
- **Borders**: Subtle borders used on cards.
- **Interactive Elements**: Images scale (`scale-105`) and shadows deepen on hover to indicate interactivity.