import React, { Component } from "react";
import Slider from "react-slick";
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Row as Rows, Col as Cols } from 'react-styled-flexboxgrid';

//
function getRandomColor() {
  var letters = 'ACEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color + '57';
}


const CategoryCard  = styled.div`
      margin: 10px;
      border-radius: 16px;
      height: 12rem;
      width: 14 rem;
      `;

// #f4fce9
// #f0f0f0
// #e9f8ff
// #e5f8fb#ffeced#ebeefc#f1effa


const Wrapper = ({p})=>{
  const bgc = getRandomColor()
  const media = JSON.parse(p.metafields?p.metafields[0]?.value:[])

  const bg = media[0]?.url_570xN
  return <CategoryCard style={{backgroundImage: `url('${bg}')`, backgroundColor: bgc, backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat:'no-repeat'}}/>
}

const Carousel = ({data}) => {
  console.log(data, "llllll")
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5.5,
      slidesToScroll: 1.5
    };

    return (<>

      <div style={{
        padding: '40px',
        color:"#fff"
      }}>
        <Slider {...settings} >
          {
            (data || []).map((item)=>{
            return (<div>
              <Wrapper p={item.product}>1</Wrapper>
            </div>)
          })

          }
        </Slider>
      </div>
      </>
    );
}
export default Carousel
