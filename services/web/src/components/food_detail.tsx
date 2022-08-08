import React, { useState } from 'react';
import logo1 from './img/logo1.png';
import logo2 from './img/logo2.png';
import logo3 from './img/logo3.png';
import logo4 from './img/logo4.png';
import './App.css';

type props = {
  show: boolean,
  setShow:React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<props> = ({show,setShow}) => {
  if (show) {
    return (
      <div id="overlay">
        <div id="content">

        <h1>食材詳細</h1>
        <div className='a1'>
        <p>食材名：</p>
        <p>消費期限：</p>
        <p>保存場所：</p>
        <p>コメント：</p>
        <p>アイコン：</p>
        <div className='image'>
          {/* <img src={logo1} alt="果物" width="50" height="50" />
          <img src={logo2} alt="野菜" width="50" height="50"/>
          <img src={logo3} alt="肉" width="50" height="50" />
          <img src={logo4} alt="魚" width="50" height="50" /> */}
        </div>

        <p>おすすめレシピ：</p>
      </div>
          <button onClick={() => setShow(false)}>Close</button>
        </div>
      </div >
    )
  } else {
    return null;
  }
}

function App() {
  const[show,setShow] = useState(false);
  const openModal = () => {
    setShow(true)
  }
  return (
    <div className="App">
      <button onClick={openModal}>Open</button>
      <Modal show={show} setShow={setShow}/>
    </div>
  );
}

export default App;
