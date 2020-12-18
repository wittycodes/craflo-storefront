import React, { Component } from "react";
import Slider from "react-slick";
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Row as Rows, Col as Cols } from 'react-styled-flexboxgrid';
import {CarouselImgLoader} from "../../components/placeholder/placeholder";
import {LoaderItem} from "../../components/product-grid/product-list/product-list.style";

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
      `;

// #f4fce9
// #f0f0f0
// #e9f8ff
// #e5f8fb#ffeced#ebeefc#f1effa


const Wrapper = ({p})=>{
  const bgc = getRandomColor()
  const media = JSON.parse(p.metafields?p.metafields[0]?.value:[])
  const imgH = 200
  const imgW = Math.ceil((imgH / media[0]?.full_height ) * media[0]?.full_width)

  const bg = media[0]?.url_570xN
  return <CategoryCard style={{
    width: imgW,
    height: imgH,
    backgroundImage: `url('${bg}')`, backgroundColor: bgc, backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat:'no-repeat'
  }}/>
}

const Carousel = ({data, loading}) => {
  console.log(data, "llllll")
    const settings = {
      dots: false,
      infinite: false,
      // speed: 500,
      slidesToShow: 5.5,
      slidesToScroll: 1.5,
      variableWidth: true,
      rows:1
    };

    return (<>

      <div style={{
        padding: '40px',
        color:"#fff"
      }}>
        <Slider {...settings} >
        {
          loading ? [1,2,3,4,5,6,7,8].map(()=>(<div style={{width: 220}}><CarouselImgLoader  /></div>)) : (data || []).map((item)=>{
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
