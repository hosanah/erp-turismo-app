/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{html,ts,js}" // Ensure PrimeNG components are included
  ],
  theme: {
    extend: {
      colors: {
        // Incorporating colors from layout-teste
        turquesa: {
          DEFAULT: '#1A9CB0',
          light: '#6CCFE0',
          dark: '#156F7D'
        },
        esmeralda: {
          DEFAULT: '#00AD8C',
          light: '#4DCCB0',
          dark: '#007B62'
        },
        laranja: {
          DEFAULT: '#FFB572',
          light: '#FFD5AF',
          dark: '#FF9A40'
        },
        // Mapping to semantic colors (example: using turquesa as primary)
        primary: 'hsl(var(--primary))', // Keep PrimeNG's variable structure if needed
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        // Add other semantic colors if needed based on PrimeNG Tailwind theme structure
        border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
        destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
        popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
      },
      borderRadius: {
        lg: 'var(--radius)', // Using CSS variables like shadcn/ui
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Match font from layout-teste
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }, // Keep or adapt based on PrimeNG components
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [], // Add plugins if needed, e.g., require('@tailwindcss/forms')
};

