/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* primary-opacity-12 */
        input: "var(--color-input)", /* pure-white */
        ring: "var(--color-ring)", /* deep-plum */
        background: "var(--color-background)", /* pure-white */
        foreground: "var(--color-foreground)", /* deep-purple-black */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep-plum */
          foreground: "var(--color-primary-foreground)", /* pure-white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* soft-lavender */
          foreground: "var(--color-secondary-foreground)", /* deep-purple-black */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* refined-burgundy */
          foreground: "var(--color-destructive-foreground)", /* pure-white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* barely-there-tint */
          foreground: "var(--color-muted-foreground)", /* muted-purple-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* warm-gold */
          foreground: "var(--color-accent-foreground)", /* deep-purple-black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* pure-white */
          foreground: "var(--color-popover-foreground)", /* deep-purple-black */
        },
        card: {
          DEFAULT: "var(--color-card)", /* pure-white */
          foreground: "var(--color-card-foreground)", /* deep-purple-black */
        },
        success: {
          DEFAULT: "var(--color-success)", /* professional-green */
          foreground: "var(--color-success-foreground)", /* pure-white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* sophisticated-amber */
          foreground: "var(--color-warning-foreground)", /* pure-white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* refined-burgundy */
          foreground: "var(--color-error-foreground)", /* pure-white */
        },
        surface: "var(--color-surface)", /* barely-there-tint */
      },
      borderRadius: {
        lg: "var(--radius-card)",
        md: "calc(var(--radius-card) - 2px)",
        sm: "calc(var(--radius-card) - 4px)",
        card: "var(--radius-card)",
        button: "var(--radius-button)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        caption: ["var(--font-caption)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        modal: "var(--shadow-modal)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}