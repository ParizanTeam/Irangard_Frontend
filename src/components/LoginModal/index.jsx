import React, { useState,useEffect } from 'react';
import './style.scss';
import Modal from "react-modal";
import HeaderImg from "../../assets/images/loginHead.jpg";
import HeaderImg2 from "../../assets/images/loginHead2.jpg";
import FooterImg from "../../assets/images/LoginBottom.jpg";

export default function Login() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <div className="main">
      <button onClick={() => setIsOpen(true)} style={{marginTop:'400px'}}>Open Modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} className='MyModal'>
        <div className='myHeader'>
            <img src={HeaderImg} alt='Hello' className='HeaderImg'/>
            <img src={HeaderImg2} alt='Hello' className='HeaderImg'/>
        </div>
        <div className='myForm' dir='rtl'>
        <form  className='myForm'>
            <br/>
            <label style={{marginBottom:'3px'}}>
                نام کاربری :  
                <br/>
                <input type="text" name="نام کاربری" className='myInput' style={{height:'28px',width:'300px'}}/>
            </label>
            <label style={{marginBottom:'3px'}}>
                رمز عبور : 
                <br/>
                <input type="password" name="رمز عبور" className='myInput' style={{height:'28px',width:'300px'}}/>
            </label>
            <br/>
            {/*<input type="submit" value="ورود" style={{color:'black'}}/>*/}
            <button onClick={() => setIsOpen(false)} style={{color:'#fff9f5',height:'30px',width:'300px',margin:'auto'}} className='myButton'>ورود</button>
        </form>
        </div>
        {/*<button onClick={() => setIsOpen(false)}>Close Modal</button>*/}
        <img src={FooterImg} alt='Goodbye' className='FooterImg'/>
      </Modal>
    </div>
  );
}