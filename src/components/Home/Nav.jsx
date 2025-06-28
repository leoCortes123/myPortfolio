import React, { useState } from 'react';
import styles from './styles/Nav.module.scss';

// Importar todas las imágenes estáticamente
// Botón 1
import cameraImg from '../../assets/images/icons/homeImages/btn1/camera.png';
import catImg from '../../assets/images/icons/homeImages/btn1/cat.png';
import dogImg from '../../assets/images/icons/homeImages/btn1/dog.png';
import marioImg from '../../assets/images/icons/homeImages/btn1/mario.png';
import masterImg from '../../assets/images/icons/homeImages/btn1/master.png';
import onepieceImg from '../../assets/images/icons/homeImages/btn1/onepiece.png';

// Botón 2
import craneImg from '../../assets/images/icons/homeImages/btn2/crane.png';
import csharpImg from '../../assets/images/icons/homeImages/btn2/csharp.png';
import htmlImg from '../../assets/images/icons/homeImages/btn2/html.png';
import javascriptImg from '../../assets/images/icons/homeImages/btn2/javascript.png';
import pcImg from '../../assets/images/icons/homeImages/btn2/pc.png';
import reactImg from '../../assets/images/icons/homeImages/btn2/react.png';

// Botón 3
import helloImg from '../../assets/images/icons/homeImages/btn3/hello.png';
import letterImg from '../../assets/images/icons/homeImages/btn3/letter.png';
import messImg from '../../assets/images/icons/homeImages/btn3/mess.png';
import phoneImg from '../../assets/images/icons/homeImages/btn3/phone.png';
import questionImg from '../../assets/images/icons/homeImages/btn3/question.png';
import whatsappImg from '../../assets/images/icons/homeImages/btn3/whatsapp.png';

const navButtons = [
  {
    key: 'btn1',
    title: 'ABOUT ME',
    onClickValue: 'aboutMe',
    images: [
      { src: masterImg, class: 'img5 btn1Img5', alt: 'img1btn5' },
      { src: marioImg, class: 'img4 btn1Img4', alt: 'img1btn4' },
      { src: onepieceImg, class: 'img6 btn1Img6', alt: 'img1btn6' },
      { src: cameraImg, class: 'img1 btn1Img1', alt: 'img1btn1' },
      { src: dogImg, class: 'img3 btn1Img3', alt: 'img1btn3' },
      { src: catImg, class: 'img2 btn1Img2', alt: 'img1btn2' },
    ],
    innerClass: 'innerButton',
    hoverClass: 'hoveredBtn1',
  },
  {
    key: 'btn2',
    title: 'MY JOURNEY',
    onClickValue: 'myJourney',
    images: [
      { src: craneImg, class: 'img5 btn2Img5', alt: 'img2btn5' },
      { src: pcImg, class: 'img1 btn2Img1', alt: 'img2btn1' },
      { src: javascriptImg, class: 'img6 btn2Img6', alt: 'img2btn6' },
      { src: htmlImg, class: 'img3 btn2Img3', alt: 'img2btn3' },
      { src: reactImg, class: 'img4 btn2Img4', alt: 'img2btn4' },
      { src: csharpImg, class: 'img2 btn2Img2', alt: 'img2btn2' },
    ],
    innerClass: 'innerButton2',
    hoverClass: 'hoveredBtn2',
  },
  {
    key: 'btn3',
    title: 'CONTACT ME',
    onClickValue: 'contact',
    images: [
      { src: whatsappImg, class: 'img6 btn3Img6', alt: 'img3btn6' },
      { src: questionImg, class: 'img5 btn3Img5', alt: 'img3btn5' },
      { src: phoneImg, class: 'img4 btn3Img4', alt: 'img3btn4' },
      { src: messImg, class: 'img3 btn3Img3', alt: 'img3btn3' },
      { src: letterImg, class: 'img2 btn3Img2', alt: 'img3btn2' },
      { src: helloImg, class: 'img1 btn3Img1', alt: 'img3btn1' },
    ],
    innerClass: 'innerButton3',
    hoverClass: 'hoveredBtn3',
  },
];

export default function Nav({ getNavValueHome }) {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <div className={styles.nav}>
      {navButtons.map(btn => (
        <div
          key={btn.key}
          className={`${styles[btn.innerClass]} ${hoveredBtn === btn.key ? styles[btn.hoverClass] : ''}`}
          onMouseEnter={() => setHoveredBtn(btn.key)}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => getNavValueHome(btn.onClickValue)}
        >
          <div className={styles.content}>
            <div className={styles.base} />
            {btn.images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className={`${styles[img.class.split(' ')[0]]} ${styles[img.class.split(' ')[1]]}`}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            ))}
          </div>
          <div className={styles.title}>
            <p>{btn.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
