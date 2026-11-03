export const gradients = {
  aurora: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 52%, #ec4899 100%)',
  sunrise: 'linear-gradient(135deg, #f97316 0%, #ef4444 48%, #db2777 100%)',
  ocean: 'linear-gradient(135deg, #0891b2 0%, #2563eb 52%, #4338ca 100%)',
  forest: 'linear-gradient(135deg, #16a34a 0%, #0d9488 50%, #0284c7 100%)',
  midnight: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #7e22ce 100%)',
} as const;

export type GradientName = keyof typeof gradients;
