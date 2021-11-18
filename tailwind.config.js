module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      
      "backgroundImage":{
        'front':"url('/src/Resources/frontLogo.svg')",
        'back':"url('/src/Resources/background.png')",
        'win':"url('/src/Resources/winLogo.svg')",
        // 'win':"url()"
        // src/Resources/frontLogo.svg
      }  ,
      "textColor":{
      "primary":'#1D355D',
      "secondary":"rgba(96, 102, 208, 0.8)",
      "parrot":"#12AD2B"
      
      },
      "backgroundColor":{
        "hover":"#F9A826"
      },
      "borderColor":{
        "hover":"#F9A826",
        "primary":'#1D355D',
      },
      "fontFamily":{
        "Poppins":['Poppins']
      }
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
