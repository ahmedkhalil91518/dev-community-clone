import React from 'react'
import AboutCSS from "./About.module.css"

const About = () => {
  return (
    <div className={AboutCSS.page}><h1>About DEV</h1>
    DEV is a community of software developers getting together to help one another out. The software industry relies on collaboration and networked learning. We provide a place for that to happen.
    
    DEV is built on Forem: open source software designed to empower communities. Because our application is open source, you can inspect every little detail of the code, or chip in yourself! Forem is available for anyone interested in creating similar communities in any niche or passion. Visit our meta Forem, forem.dev for more information.
    
    We believe in transparency and adding value to the ecosystem. We hope you enjoy poking around and participating!</div>
  )
}

export default About