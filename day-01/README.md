# Day 1: Profile Card Challenge

![Profile Card Design](./design.png)

## Challenge Overview

This is the first challenge in the 100 Days of Code series. The goal is to create a modern, responsive profile card that showcases user information with an attractive design and interactive elements.

## Design Features

- **Two-Section Layout**: Dark pink top section with profile image and wavy separator
- **Profile Information**: Name, username, and professional bio
- **Social Media Integration**: Five social media icons (Facebook, LinkedIn, X, Instagram, Dribbble)
- **Interactive Buttons**: Follow and Message buttons with hover effects
- **Responsive Design**: Adapts to different screen sizes

## User Story

As a user, I want a profile card that effectively showcases my professional details and personality, making it easy for viewers to connect and interact with me.

## Acceptance Criteria

- ✅ The profile card displays a profile image prominently within a dynamically shaped frame
- ✅ User's name, username, and a brief professional bio are displayed clearly
- ✅ Includes functional icons for social media profiles that are easily accessible
- ✅ Features responsive 'Follow' and 'Message' buttons
- ✅ The design is responsive and maintains functionality across different device screens

## Technical Implementation

### Technologies Used

- **HTML5**: Semantic structure with proper accessibility
- **CSS3**: Custom styling with flexbox, gradients, and animations
- **JavaScript**: Vanilla JS with event handling and DOM manipulation
- **No Frameworks**: Pure HTML, CSS, and JavaScript as requested

### Key Features

- **Modern UI/UX**: Clean design with smooth animations and transitions
- **Interactive Elements**:
  - Follow button with loading states
  - Message button with modal functionality
  - Profile image click effects
  - Social media icon hover animations
- **Responsive Design**: Mobile-first approach with breakpoints for different screen sizes
- **Accessibility**: Proper ARIA labels, keyboard navigation, and focus states

### File Structure

```
day-01/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS styling
├── script.js           # JavaScript functionality
├── design.png          # Original design reference
└── README.md           # This documentation
```

## Design Specifications

### Color Scheme

- **Primary Pink**: `#e91e63` (dark pink/magenta for top section)
- **Background**: `#f0f4c3` (light yellow-green)
- **Text Colors**: Dark gray for names, lighter gray for usernames
- **Accent Colors**: Light gray for social icon backgrounds

### Typography

- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, etc.)
- **Name**: Large, bold, black sans-serif font
- **Username**: Smaller, lighter gray font
- **Bio**: Medium-sized text with proper line height

### Layout

- **Card Dimensions**: Maximum width of 400px
- **Border Radius**: 12px for modern rounded corners
- **Spacing**: Consistent padding and margins throughout
- **Wavy Separator**: SVG path creating fluid transition between sections

## Interactive Features

### Follow Button

- Toggles between "Follow" and "Following" states
- Loading animation during state change
- Success notification on follow
- Visual feedback with color changes

### Message Button

- Opens modal dialog for sending messages
- Form validation for message input
- Smooth animations for modal open/close
- Keyboard navigation support (ESC to close)

### Profile Image

- Click effect with scale animation
- Opens profile view modal
- Hover effects for better UX

### Social Media Icons

- Hover animations with color transitions
- Platform-specific notifications
- Accessible with proper ARIA labels

## Responsive Breakpoints

- **Desktop**: 400px max-width, full feature set
- **Tablet**: 480px and below, adjusted spacing
- **Mobile**: 320px and below, stacked buttons, smaller icons

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Getting Started

1. Clone the repository
2. Navigate to the `day-01` directory
3. Open `index.html` in your web browser
4. Interact with the profile card elements

## Future Enhancements

- [ ] Add more social media platforms
- [ ] Implement actual messaging functionality
- [ ] Add profile image upload feature
- [ ] Include more profile customization options
- [ ] Add dark mode toggle
- [ ] Implement user authentication

## Learning Outcomes

After completing this challenge, you will have:

- Mastered CSS flexbox and grid layouts
- Learned advanced CSS animations and transitions
- Implemented interactive JavaScript features
- Created responsive designs for multiple devices
- Applied modern web development best practices
- Built accessible user interfaces

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Challenge Completed**: ✅  
**Date**: [Your completion date]  
**Time Spent**: [Your time]  
**Difficulty**: ⭐⭐⭐ (Intermediate)

#100DaysOfCode #FrontendDevelopment #HTML #CSS #JavaScript #ProfileCard
