import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { SlideItem } from "../assets/data";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  overflow: hidden;
  border: 1px solid #800020;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
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
    background-color: rgba(0, 0, 0, 0.8);
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
  height: 100%;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  background: url(${(props) => props.bg}) center/cover no-repeat;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 30px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  font-family: "Playfair Display", serif;
  color: #f5f5dc;
  letter-spacing: 3px;
  line-height: 1.2;
  padding: 0 20px;

  animation: fadeInDown 1s ease-out;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    letter-spacing: 1px;
  }
`;

const Description = styled.p`
  margin: 30px 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: "Playfair Display", serif;
  color: #800020;
  line-height: 1.6;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding: 20px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 3px;
    width: 60px;
    background-color: #800020;
    left: 50%;
    transform: translateX(-50%);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  animation: fadeIn 1.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    font-size: 18px;
    letter-spacing: 1.5px;
    max-width: 90%;
    padding: 15px;

    &::before,
    &::after {
      width: 40px;
    }
  }

  @media (max-width: 480px) {
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 1.4;
  }
`;

const SquareSlider = () => {
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
        <ArrowLeft style={{ color: "white" }} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {SlideItem.map((item) => (
          <Slide key={item.id}>
            <ImageContainer bg={item.img} />
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRight style={{ color: "white" }} />
      </Arrow>
    </Container>
  );
};

export default SquareSlider;
