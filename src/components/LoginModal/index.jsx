import * as React from 'react';
import './style.scss';
import Modal from "react-modal";
import HeaderImg from "../../assets/images/loginHead.jpg";
import HeaderImg2 from "../../assets/images/loginHead2.jpg";
import FooterImg from "../../assets/images/LoginBottom.jpg";
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const blue = {
  50: '#e4b4d1',
  
  200: '#2e0b20',
  
  400: '#f3cfe5',
  500: '#52143a',
  600: '#52143a',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  height: 35px;
  padding: 8px 16px;
  margin: 6px 6px;
  border-style: groove;
  border-color: #e4b4d1;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 200px;
  height: 50px;
  background-color: ${blue[500]};
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  margin-right:0.15px;
`;

export default function Login() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <div className="main">
      <button onClick={() => setIsOpen(true)} style={{marginTop:'400px'}}>Open Modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} className='MyModal'>
        <TabsUnstyled defaultValue={0}>
          <TabsList>
            <Tab>ورود</Tab>
            <Tab>ثبت نام</Tab>
          </TabsList>
          <TabPanel value={0}>
          <div className='MyTab' title='..ورود..'>
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
        </div>
          </TabPanel>
          <TabPanel value={1}><div className='MyTab' title='..ثبت نام..'>
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
                 ایمیل :   
                <br/>
                <input type="email" name="ایمیل" className='myInput' style={{height:'28px',width:'300px'}}/>
            </label>
            <br/>
            {/*<input type="submit" value="ورود" style={{color:'black'}}/>*/}
            <button onClick={() => setIsOpen(false)} style={{color:'#fff9f5',height:'30px',width:'300px',margin:'auto'}} className='myButton'>ورود</button>
        </form>
        </div>
        {/*<button onClick={() => setIsOpen(false)}>Close Modal</button>*/}
        <img src={FooterImg} alt='Goodbye' className='FooterImg'/>
          </div></TabPanel>
      </TabsUnstyled>
      </Modal>
    </div>
  );
}