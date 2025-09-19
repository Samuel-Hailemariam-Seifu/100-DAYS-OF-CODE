# Day 5: Recipe - Sweet Iced Coffee with Coconut Milk

## Challenge Overview

This project implements a beautiful, responsive recipe page for "Sweet Iced Coffee with Coconut Milk" featuring a two-column layout with an enticing food image on the left and detailed recipe information on the right.

## Design Features

- **Two-Column Layout**: Split design with image and content sections
- **High-Quality Food Photography**: Appetizing coffee image with overlay text
- **Interactive Elements**: Checkable ingredients and step-by-step instructions
- **Rating System**: 4.5-star rating with review count
- **Recipe Details**: Time, difficulty level, and budget information
- **Responsive Design**: Adapts beautifully to all screen sizes
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## User Story & Acceptance Criteria

### User Story
As a user, I want a visually appealing recipe page that clearly outlines the steps and ingredients needed to make Sweet Iced Coffee with Coconut Milk, allowing me to easily follow along and prepare the drink.

### Acceptance Criteria ✅
- ✅ The recipe title "Sweet Iced Coffee with Coconut Milk" is prominently displayed
- ✅ The recipe features a high-quality image of the finished drink
- ✅ User ratings are visible and indicate the popularity of the recipe
- ✅ Key details such as total time, difficulty level, and budget are clearly listed
- ✅ Ingredients are listed in a clear, easy-to-read format with checkboxes for tracking during preparation
- ✅ Step-by-step instructions are provided, ensuring clarity and ease of understanding
- ✅ A note on the storage life of the coffee is included to inform users about freshness and usability
- ✅ The design is responsive, ensuring it is accessible on various devices and screen sizes

## Technical Implementation

### HTML Structure
- **Semantic Layout**: Clean, accessible HTML structure with proper headings
- **Two-Column Design**: `.recipe-layout` with image and content sections
- **Interactive Elements**: Checkboxes for ingredients and numbered steps
- **Image Overlay**: Text overlay on the main recipe image
- **Modal System**: Timer modal for cooking assistance

### CSS Styling
- **Flexbox Layout**: Responsive two-column design
- **Modern Typography**: System fonts with proper hierarchy
- **Color Scheme**: Professional grays and whites with accent colors
- **Smooth Transitions**: Hover effects and animations throughout
- **Mobile-First**: Responsive design with mobile breakpoints

### JavaScript Functionality
- **Ingredient Tracking**: Check/uncheck ingredients with visual feedback
- **Step Completion**: Mark cooking steps as completed
- **Cooking Timer**: 10-minute timer with start/pause/reset functionality
- **Image Fallback**: Error handling for failed image loads
- **Local Storage**: Save recipe progress and preferences
- **Keyboard Navigation**: Full keyboard support for accessibility

## Design Specifications

### Layout
- **Container**: Max-width 1000px, centered layout
- **Image Section**: Full-height left column with overlay text
- **Content Section**: Right column with recipe details
- **Spacing**: Compact, professional spacing throughout

### Color Scheme
- **Background**: Clean white background
- **Text**: Dark grays (#333, #444, #777, #888) for hierarchy
- **Accents**: Subtle borders and hover effects
- **Overlay**: Dark overlay on image with white text

### Typography
- **Font Family**: Arial, sans-serif for consistency
- **Title**: 20px, bold weight
- **Body Text**: 12px for optimal readability
- **Labels**: 9px uppercase for detail labels
- **Hierarchy**: Clear size and weight differences

## Interactive Features

### Recipe Management
1. **Ingredient Checkboxes**: Click to mark ingredients as used
2. **Step Tracking**: Visual feedback for completed steps
3. **Cooking Timer**: 10-minute countdown with controls
4. **Progress Saving**: Local storage for recipe progress

### Visual Feedback
- **Hover Effects**: Subtle animations on interactive elements
- **Active States**: Clear indication of selected/checked items
- **Loading States**: Smooth transitions and feedback
- **Error Handling**: Graceful fallbacks for failed image loads

## Responsive Design

### Breakpoints
- **Desktop**: 768px and above - Full two-column layout
- **Tablet**: 768px and below - Stacked single-column layout
- **Mobile**: 480px and below - Compact mobile layout

### Mobile Optimizations
- **Stacked Layout**: Image above content on mobile
- **Touch-Friendly**: Larger touch targets for mobile
- **Optimized Typography**: Readable font sizes on small screens
- **Reduced Spacing**: Tighter layout for mobile devices

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features Used**: CSS Flexbox, CSS Transitions, ES6+ JavaScript, Local Storage

## Getting Started

1. **Open the Project**: Navigate to the `day-05` folder
2. **View the Recipe**: Open `index.html` in your browser
3. **Interact**: Check ingredients, follow steps, use the cooking timer
4. **Test Responsiveness**: Resize browser window or view on mobile device

## File Structure

```
day-05/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
├── design.png          # Design reference image
└── README.md           # This documentation
```

## Key Features Implemented

### Core Functionality
- ✅ **Recipe Display**: Complete recipe with image and details
- ✅ **Ingredient Tracking**: Interactive checkboxes for ingredients
- ✅ **Step-by-Step Instructions**: Clear cooking instructions
- ✅ **Cooking Timer**: 10-minute countdown timer
- ✅ **Responsive Design**: Works on all device sizes

### Enhanced Features
- ✅ **Image Overlay**: Recipe title on the main image
- ✅ **Rating System**: 4.5-star rating with review count
- ✅ **Recipe Details**: Time, difficulty, and budget information
- ✅ **Progress Saving**: Local storage for recipe progress
- ✅ **Error Handling**: Fallback for failed image loads
- ✅ **Accessibility**: Keyboard navigation and focus states

### Performance Optimizations
- ✅ **Image Optimization**: Proper sizing and compression
- ✅ **Smooth Transitions**: CSS animations for better UX
- ✅ **Local Storage**: Efficient data persistence
- ✅ **Error Recovery**: Graceful handling of failed loads

## Recipe Details

### Sweet Iced Coffee with Coconut Milk
- **Rating**: 4.5 stars (189 reviews)
- **Total Time**: 10 minutes
- **Difficulty**: Easy
- **Budget**: Under $2

### Ingredients
- 3 tablespoon Espresso coffee powder
- 1 cup off the boil water
- 1 cup Coconut milk
- 3 tablespoon Condensed milk
- 3 tablespoon Espresso coffee powder (duplicate for design accuracy)

### Instructions
1. Boil some water and let sit for 1-2 minutes
2. Put the coffee grounds into a cafetière and pour in the water
3. Let the coffee steep for 5 minutes then slowly press down the plunger on your Cafetière
4. Pour the coffee into a jug, allow to cool then chill for several hours
5. Whisk in the coconut milk and condensed milk and serve over plenty of ice
6. This coffee can be stored in the fridge for up to 5 days. Shake or stir again before serving

## Future Enhancements

### Potential Improvements
- **Nutritional Information**: Add calorie and nutrition facts
- **Serving Size**: Adjustable serving size calculator
- **Cooking Notes**: User notes and modifications
- **Social Sharing**: Share recipe on social media
- **Print Functionality**: Print-friendly recipe format
- **Video Tutorial**: Embedded cooking video
- **Ingredient Substitutions**: Alternative ingredient suggestions

### Technical Enhancements
- **Progressive Web App**: PWA features for offline use
- **Image Gallery**: Multiple recipe photos
- **Search Functionality**: Search within recipe content
- **User Reviews**: Rating and review system
- **Recipe Scaling**: Automatic ingredient scaling

## Learning Outcomes

### Skills Developed
- **Responsive Design**: Mobile-first approach with flexbox
- **JavaScript ES6+**: Modern JavaScript features and DOM manipulation
- **CSS Layout**: Advanced flexbox and responsive design
- **User Experience**: Interactive elements and feedback
- **Accessibility**: Keyboard navigation and focus management
- **Performance**: Image optimization and local storage

### Best Practices Applied
- **Semantic HTML**: Proper structure and accessibility
- **CSS Organization**: Modular and maintainable styles
- **JavaScript Patterns**: Event handling and state management
- **Error Handling**: Graceful degradation
- **User Experience**: Intuitive navigation and feedback

## Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/) - Web standards and APIs
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Flexbox layout
- [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Browser storage
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Web accessibility

### Tools Used
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with flexbox and animations
- **Vanilla JavaScript**: No frameworks, pure JavaScript
- **Unsplash API**: High-quality food photography
- **Responsive Design**: Mobile-first approach

---

**Challenge completed successfully!** 🎉

The recipe page provides an engaging, accessible, and responsive way to showcase the Sweet Iced Coffee recipe with interactive elements, cooking timer, and beautiful visual design.