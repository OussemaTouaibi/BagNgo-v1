import React from 'react'
import './hero.scss'

import Button from '@mui/material/Button'

const Hero = () => {
  return (
    <React.Fragment>
<br/>
<br/>

<section className="hero is-large is-info hero-image">
  <div className="hero-body">
    <p className="title">
    VOUS NE SAVEZ PAS
    </p>
    <p className="title">
         OU ALLER ?
    </p>
    <p className="title">    
    PARFAIT.
    </p>

    <Button variant="contained" color="secondary">
    C’estpartie
    </Button>
  </div>
</section>
<div className="tile">
      <div className="tile is-6 is-parent">
      <article className="tile is-child box hero-img2" >
      <h1>
      Des expériences à vivre pendant votre voyage
    </h1>
<br />
    <Button variant="contained" color="secondary">
    Expériences
    </Button>
   
     
    </article>
      </div>
      <div className="tile is-6 is-parent">
        <article className="tile is-child box hero-img1">

        <h1>Des expériences à vivre pendant votre voyage</h1>
        <br/>
        <Button variant="contained" color="secondary">
    Expériences
    </Button>
         <br/>
         <br/>

         <br/>
         <br/>
         <br/>
         <br/>
        
         <br/>
         
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>

        </article>
      </div>
    
      </div>


    </React.Fragment>
  )
}

export default Hero