export const COLORS = {
    // Track colors
    TRACK_BG: 'rgba(20, 20, 27, 0.95)',
    BORDER_GLOW: 'rgba(255, 68, 51, 0.5)',
    
    // State-specific colors
    DECLINE: {
      LIGHT: 'rgba(98, 22, 49, 1)',
      DARK: 'rgba(255, 90, 139, 1)',
      BORDER: {
        LIGHT: 'rgba(98, 22, 49, 1)',
        DARK: 'rgba(218, 73, 108, 1)'
      }
    },
    ACCEPT: {
      LIGHT: 'rgba(27, 125, 67, 1)',
      DARK: 'rgba(108, 231, 150, 1)',
      BORDER: {
        LIGHT: 'rgba(26, 80, 62, 1)',
        DARK: 'rgba(64, 198, 134, 1)'
      }
    },
    NEUTRAL: {
      LIGHT: 'rgba(37, 37, 47, 1)',
      DARK: 'rgba(20, 20, 27, 1)',
      BORDER: {
        LIGHT: 'rgba(252, 66, 51, 0.5)',
        DARK: 'rgba(255, 238, 146, 1)'
      }
    }
  };
  
  export const DIMENSIONS = {
    TRACK_WIDTH: 335,
    TRACK_HEIGHT: 68,
    ORB_SIZE: 50,
    BORDER_WIDTH: 5,
    BORDER_RADIUS: 16
  };
  
  export const THRESHOLDS = {
    ACTIVATION: 0.8,
    COLOR_TRANSITION: 0.1
  };