export const getBackgroundColor = (weather) => {
  switch (weather) {
    case 'Clear':
      return '#87CEEB'; // Light blue for clear skies
    case 'Clouds':
      return '#C0C0C0';
    case 'Partially cloudy':
      return '#9ABCCF'; // Gray for cloudy weather
    case 'Thunderstorm':
      return '#778899'; 
    case 'Rain, Overcast':
      return '#778899'; // Darker tone for rain
    default:
      return '#87CEEB'; // Default color
  }
};

export const getBrightness = (color) => {
  const rgb = parseInt(color.slice(1), 16); // Convert hex to integer
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // Using the luminance formula
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const getTextColor = (backgroundColor) => {
  const brightness = getBrightness(backgroundColor);
  return brightness < 128 ? '#FFFFFF' : '#000000'; // Threshold is 128
};
