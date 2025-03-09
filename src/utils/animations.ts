
/**
 * PlayStation-inspired animations and effects
 */

// PS1 boot sequence effect
export const playBootSequence = (element: HTMLElement | null) => {
  if (!element) return;
  
  // Add boot sequence animation
  element.style.opacity = '0';
  element.style.transition = 'opacity 2s ease';
  
  setTimeout(() => {
    element.style.opacity = '1';
  }, 100);
  
  // Add CRT flicker
  const addFlicker = () => {
    if (!element) return;
    
    element.style.opacity = (Math.random() * 0.1 + 0.9).toString();
    setTimeout(() => {
      if (element) element.style.opacity = '1';
    }, 50);
  };
  
  // Random flicker effect
  const flickerInterval = setInterval(() => {
    if (Math.random() > 0.97) {
      addFlicker();
    }
  }, 2000);
  
  // Return cleanup function
  return () => clearInterval(flickerInterval);
};

// Arcade button press effect
export const arcadeButtonPress = (button: HTMLElement | null) => {
  if (!button) return;
  
  // Add button press animation
  button.classList.add('scale-95');
  button.style.boxShadow = '0 0 0 0 #7e976d';
  button.style.transform = 'translateY(4px)';
  
  // Reset after animation
  setTimeout(() => {
    button.classList.remove('scale-95');
    button.style.boxShadow = '';
    button.style.transform = '';
  }, 200);
};

// Create pixel art canvas effect
export const createPixelCanvas = (canvas: HTMLCanvasElement | null, size = 10) => {
  if (!canvas || !canvas.getContext) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const width = canvas.width;
  const height = canvas.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw pixel grid
  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      // Random colors from our palette
      const colors = ['#385d41', '#dfbe73', '#7e976d', '#ede6d2', '#5d4f4d', '#af9f86'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);
    }
  }
};
