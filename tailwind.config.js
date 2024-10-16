/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
     colors:{
      primary: "#0278a8", 
      secondary:"	#191970",
     },
     container:{
      center:true,
      padding:{
        DEFAULT:"1rem",
        sm:"2rem",
        lg:"4rem",
        xl:"5rem",
        "2xl":"6rem",
      }, 
    }
    },
    fontFamily:{
      font: ["Outfit", "sans-serif"],
      
    },

    
  },
  plugins: [],
}
