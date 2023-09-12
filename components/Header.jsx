import React from 'react'
import {MdGavel} from "react-icons/md"
import {BsGlobe2} from "react-icons/bs"
function Header() {
  return (
    <header>
        <div className='LeftPartHeader'>
        <div className='leftheader'>

       <p> <span>legal-doctrine</span>.com</p>
        </div>
        
        <div className='huissier'>
        <MdGavel className='huissIcon' />
       
        <p>Huissier de justice</p>   
        </div>
        </div>
        <div className='RightPartHeader'>
            <p>Etudiant</p>
            <p>Tarifs</p>
            <p>Connexion</p>
            <p>Essai gratuit</p>
            <BsGlobe2/>
        </div>
    </header>
  )
}

export default Header