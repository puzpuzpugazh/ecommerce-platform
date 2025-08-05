/**
 * Mobile Responsiveness Test Utility
 * 
 * This utility helps test and validate mobile responsiveness across the application.
 * It includes functions to simulate different viewport sizes and test touch interactions.
 */

// Common mobile viewport sizes for testing
export const MOBILE_VIEWPORTS = {
  'iPhone SE': { width: 375, height: 667 },
  'iPhone 12': { width: 390, height: 844 },
  'iPhone 12 Pro Max': { width: 428, height: 926 },
  'Samsung Galaxy S21': { width: 360, height: 800 },
  'iPad Mini': { width: 768, height: 1024 },
  'iPad Air': { width: 820, height: 1180 },
  'Small Mobile': { width: 320, height: 568 },
  'Large Mobile': { width: 414, height: 896 }
};

// Test mobile-specific features
export const mobileFeatureTests = {
  // Test if touch targets are properly sized (minimum 44px)
  testTouchTargets: () => {
    const interactiveElements = document.querySelectorAll('button, a, input[type="checkbox"], input[type="radio"], .btn');
    const undersizedElements = [];
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        undersizedElements.push({
          element: element.tagName,
          className: element.className,
          size: `${rect.width}x${rect.height}`
        });
      }
    });
    
    return {
      passed: undersizedElements.length === 0,
      undersizedElements
    };
  },

  // Test if text is readable on mobile (minimum 16px to prevent zoom)
  testTextReadability: () => {
    const textElements = document.querySelectorAll('p, span, div, label, input, textarea, select');
    const smallTextElements = [];
    
    textElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      if (fontSize < 16 && element.textContent.trim()) {
        smallTextElements.push({
          element: element.tagName,
          className: element.className,
          fontSize: `${fontSize}px`,
          text: element.textContent.trim().substring(0, 50) + '...'
        });
      }
    });
    
    return {
      passed: smallTextElements.length === 0,
      smallTextElements
    };
  },

  // Test if horizontal scrolling is prevented
  testHorizontalScroll: () => {
    const hasHorizontalScroll = document.body.scrollWidth > window.innerWidth;
    const overflowingElements = [];
    
    if (hasHorizontalScroll) {
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          overflowingElements.push({
            element: element.tagName,
            className: element.className,
            overflowBy: rect.right - window.innerWidth
          });
        }
      });
    }
    
    return {
      passed: !hasHorizontalScroll,
      overflowingElements
    };
  },

  // Test if forms are mobile-friendly
  testFormUsability: () => {
    const formElements = document.querySelectorAll('input, textarea, select');
    const issues = [];
    
    formElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);
      
      // Check if input height is sufficient for touch
      if (rect.height < 44) {
        issues.push({
          element: element.tagName,
          type: element.type || 'text',
          issue: 'Touch target too small',
          height: rect.height
        });
      }
      
      // Check if font size prevents zoom on iOS
      const fontSize = parseFloat(computedStyle.fontSize);
      if (fontSize < 16) {
        issues.push({
          element: element.tagName,
          type: element.type || 'text',
          issue: 'Font size may cause zoom on iOS',
          fontSize: fontSize
        });
      }
    });
    
    return {
      passed: issues.length === 0,
      issues
    };
  },

  // Test if navigation is accessible on mobile
  testMobileNavigation: () => {
    const mobileMenuButton = document.querySelector('[aria-label="Menu"], .mobile-menu-toggle, .lg\\:hidden button');
    const mobileMenu = document.querySelector('.mobile-menu, [role="navigation"]');
    
    return {
      passed: !!mobileMenuButton,
      hasMobileMenuButton: !!mobileMenuButton,
      hasMobileMenu: !!mobileMenu,
      buttonAccessible: mobileMenuButton ? mobileMenuButton.hasAttribute('aria-label') : false
    };
  }
};

// Run all mobile tests
export const runMobileResponsivenessTests = () => {
  const results = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    },
    tests: {}
  };
  
  Object.keys(mobileFeatureTests).forEach(testName => {
    try {
      results.tests[testName] = mobileFeatureTests[testName]();
    } catch (error) {
      results.tests[testName] = {
        passed: false,
        error: error.message
      };
    }
  });
  
  // Calculate overall score
  const totalTests = Object.keys(results.tests).length;
  const passedTests = Object.values(results.tests).filter(test => test.passed).length;
  results.score = Math.round((passedTests / totalTests) * 100);
  
  return results;
};

// Utility to simulate different viewport sizes for testing
export const simulateViewport = (width, height) => {
  // This would typically be used in testing environments
  // In a real browser, you'd manually resize the window or use browser dev tools
  return {
    width,
    height,
    test: () => runMobileResponsivenessTests()
  };
};

// Check if device is likely mobile
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768 ||
         ('ontouchstart' in window);
};

// Get current device category
export const getDeviceCategory = () => {
  const width = window.innerWidth;
  
  if (width <= 320) return 'small-mobile';
  if (width <= 480) return 'mobile';
  if (width <= 768) return 'large-mobile';
  if (width <= 1024) return 'tablet';
  if (width <= 1200) return 'small-desktop';
  return 'desktop';
};

// Performance monitoring for mobile
export const mobilePerformanceMonitor = {
  measureTouchLatency: () => {
    return new Promise((resolve) => {
      let startTime;
      
      const handleTouchStart = () => {
        startTime = performance.now();
      };
      
      const handleTouchEnd = () => {
        const latency = performance.now() - startTime;
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
        resolve(latency);
      };
      
      document.addEventListener('touchstart', handleTouchStart, { once: true });
      document.addEventListener('touchend', handleTouchEnd, { once: true });
      
      // Fallback for non-touch devices
      setTimeout(() => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
        resolve(null);
      }, 5000);
    });
  },

  measureScrollPerformance: () => {
    return new Promise((resolve) => {
      let frameCount = 0;
      let startTime = performance.now();
      
      const measureFrames = () => {
        frameCount++;
        if (performance.now() - startTime < 1000) {
          requestAnimationFrame(measureFrames);
        } else {
          resolve(frameCount); // FPS over 1 second
        }
      };
      
      requestAnimationFrame(measureFrames);
    });
  }
};

export default {
  MOBILE_VIEWPORTS,
  mobileFeatureTests,
  runMobileResponsivenessTests,
  simulateViewport,
  isMobileDevice,
  getDeviceCategory,
  mobilePerformanceMonitor
};