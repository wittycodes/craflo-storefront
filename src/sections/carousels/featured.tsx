import React, { Component } from "react";
import Slider from "react-slick";
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Row as Rows, Col as Cols } from 'react-styled-flexboxgrid';

const Wrapper = styled.div`
      margin: 10px;
      background: #b6defd;
      padding: 50px
`;

export default class Carousel extends Component {
  render() {
    const settings = {
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      rows: 2,
      slidesPerRow: 2,
      dots: true
    };
    return (
      <div style={{
        padding: '40px',
        color:"#fff"
      }}>
        <Slider {...settings} >
          <div>
            <Wrapper>1</Wrapper>
          </div>
          <div>
            <Wrapper>2</Wrapper>
          </div>
          <div>
            <Wrapper>3</Wrapper>
          </div>
          <div>
            <Wrapper>4</Wrapper>
          </div>
          <div>
            <Wrapper>5</Wrapper>
          </div>
          <div>
            <Wrapper>6</Wrapper>
          </div>
          <div>
            <Wrapper>7</Wrapper>
          </div>
          <div>
            <Wrapper>8</Wrapper>
          </div>
          <div>
            <Wrapper>9</Wrapper>
          </div>
          <div>
            <Wrapper>10</Wrapper>
          </div>
          <div>
            <Wrapper>11</Wrapper>
          </div>
          <div>
            <Wrapper>12</Wrapper>
          </div>
          <div>
            <Wrapper>13</Wrapper>
          </div>
          <div>
            <Wrapper>14</Wrapper>
          </div>
          <div>
            <Wrapper>15</Wrapper>
          </div>
          <div>
            <Wrapper>16</Wrapper>
          </div>
        </Slider>
      </div>
    );
  }
}
