const enterprisePrimary = '#047857';
const enterpriseBackground = '#F0FDF4';
const enterpriseText = '#064E3B';
const enterpriseMuted = '#355E4E';

const palette = {
  blue: '#3B82F6',
  darkBlue: '#1E3A8A',
  black: '#000000',
  white: '#FFFFFF',
  yellow: '#EAB308',
  red: '#EF4444',
  green: '#10B981',
  orange: '#F97316',
};

export default {
  light: {
    text: enterpriseText,
    background: '#FFFFFF',
    tint: enterprisePrimary,
    tabIconDefault: enterpriseMuted,
    tabIconSelected: enterprisePrimary,
    ...palette,
  },
  dark: {
    text: enterpriseText,
    background: '#FFFFFF',
    tint: enterprisePrimary,
    tabIconDefault: enterpriseMuted,
    tabIconSelected: enterprisePrimary,
    ...palette,
  },
};
