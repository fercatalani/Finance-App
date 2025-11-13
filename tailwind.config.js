/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "radial-sky":
          "radial-gradient(circle at 80% 20%, #88bdf2 0%, #B0C3D6 10%, transparent 70%)",
        "radial-sky-alt":
          "radial-gradient(circle at 50% 40%, #88bdf2 0%, #B0C3D6 0%, transparent 40%)",
      },
      colors: {
        "charcoal-blue": "#384959",
        "slate-blue-gray": "#2e3b44",
        "steel-blue": "#6a89a7",
        "powder-blue": "#B0C3D6",
        "coral-red": "#ef4444",
        "emerald-green": "#5cb85c",
        graphite: "#d4d4d4",
        "pure-white": "#ffffff",
        "sky-blue": "#88bdf2",
        "metallic-blue": "#215974",
      },
    },
  },
  plugins: [],
};
