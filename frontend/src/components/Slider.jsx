import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { SlideItem } from "../assets/data";

const Container = styled.div`
  width: 100%;
  height: 70vh; // Changed from 100vh
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(238, 224, 224, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1s ease;
`;

const Slide = styled.div`
  width: 100vw;
  height: 70vh; // Changed from 100vh
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url(${(props) => props.bg}) center/cover no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(155, 154, 150, 0.4); /* Overlay for better text visibility */
  z-index: 1;
`;

const InfoContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px; // Reduced from 60px
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 15px; // Reduced from 20px
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

const Description = styled.p`
  margin: 15px 0; // Reduced from 20px
  font-size: 18px; // Reduced from 20px
  font-weight: 500;
  letter-spacing: 2px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : SlideItem.length - 1);
    } else {
      setSlideIndex(slideIndex < SlideItem.length - 1 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev < SlideItem.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {SlideItem.map((item) => (
          <Slide bg={item.img} key={item.id}>
            <Overlay />
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRight />
      </Arrow>
    </Container>
  );
};

export default Slider;
