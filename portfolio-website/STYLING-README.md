# NextJS Styling Guide

## CSS Modules Implementation

This project uses CSS Modules for component-specific styling to avoid global CSS conflicts and ensure styles are properly applied in the NextJS environment.

### CSS Module Files

- `NavButton.module.css`: Styles for navigation buttons (desktop and mobile)
- `SocialIcon.module.css`: Styles for social media icons
- `ContactButton.module.css`: Styles for contact buttons

### How to Use CSS Modules

1. Import the CSS module in your component:
   ```jsx
   import styles from './ComponentName.module.css';
   ```

2. Apply styles using the className property:
   ```jsx
   <div className={styles.className}>Content</div>
   ```

3. For conditional classes:
   ```jsx
   <div className={`${styles.baseClass} ${isActive ? styles.activeClass : ''}`}>Content</div>
   ```

## Clearing Cache

If you encounter styling issues, use the provided cache clearing script:

```
.\clear-cache.ps1
```

This script will:
1. Stop any running development servers
2. Clear the NextJS build cache (.next folder)
3. Provide instructions for clearing browser cache

## Browser Cache Clearing

After making style changes, clear your browser cache:

- **Chrome/Edge**: Press `Ctrl+Shift+R` or hold `Shift` and click the reload button
- **Firefox**: Press `Ctrl+Shift+R` or hold `Shift` and click the reload button
- **Safari**: Press `Option+Command+E` to clear cache, then `Command+R` to reload

## Smooth Scrolling

The smooth scrolling implementation uses:

```javascript
window.scrollTo({
  top: offsetPosition,
  behavior: 'smooth'
});
```

With additional features:
- Header offset adjustment
- URL hash updating
- Mobile menu handling

## Data Attributes

Components use `data-testid` attributes for easier targeting in tests and debugging:

```jsx
<button data-testid="nav-home">Home</button>
```

## Styling Priority

To ensure styles are properly applied:

1. Use CSS Modules for component-specific styles
2. Add `data-testid` attributes for targeting
3. Clear cache after making changes
4. Use `!important` declarations only when necessary