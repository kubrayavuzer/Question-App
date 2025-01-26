import React from 'react';
import './intro.css';
import { useNavigate } from 'react-router-dom';
const Introduce = () => {

  const navigate = useNavigate();

  const start = () => {
    navigate('/Quiz');
  }

  return (
    <div className='introduce'>
      <div className="introduce-container">
        <img src="https://quiz2.app.appery.io/assets/images/mainLogo.png" alt="" />
        <button className='introduce-start' id='start'
        onClick={start}>Question App'e başla</button>
        <span>Testte Toplamda 10 soru bulunmakta, her bir sorunun cevap seçenekleri soruyu gördükten 4 saniye sonra ortaya çıkar. Soru başına 30saniye ayrıldı ve cevap verdiğiniz seçeneğin doğru veya yanlış olduğunu görmeniz için son soruya kadar gelmenizi bekliyor olacağım. Başarılar!
          Dipnot! Soruların hepsini cevaplamalısın..
        </span>
      </div>
    </div>
  )
}

export default Introduce