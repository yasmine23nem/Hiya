import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { SlideItem } from "../assets/data";

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #f8f0f2;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const Arrow = styled.div`
  width: 55px;
  height: 55px;
  background-color: rgba(225, 29, 72, 0.1);
  border: 2px solid rgba(225, 29, 72, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(0.9);
  left: ${(props) => (props.direction === "left" ? "20px" : "unset")};
  right: ${(props) => (props.direction === "right" ? "20px" : "unset")};
  cursor: pointer;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);

  &:hover {
    transform: translateY(-50%) scale(1);
    background-color: rgba(225, 29, 72, 0.2);
    border-color: rgba(225, 29, 72, 0.3);
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  opacity: ${({ active }) => (active ? "1" : "0")};
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ index }) =>
    index === 0
      ? "linear-gradient(135deg, #E11D48 20%, #ea6058 60%, #f8f0f2 100%)"
      : "#ffffff"};
  transform: scale(${({ active }) => (active ? "1" : "0.95")});
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${(props) => props.bg}) center/cover no-repeat;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    transform: scale(1.05);
  }
`;

const VideoContainer = styled.video`
  width: 50%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.05);
  }
`;

const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  color: ${({ index }) => (index === 0 ? "#ffffff" : "#4a4a4a")};
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;

const Title = styled.h1`
  font-size: clamp(50px, 6vw, 80px);
  font-family: "Pinyon Script", cursive;
  color: ${({ color }) => color};
  margin-bottom: 30px;
  position: relative;
  transform: translateY(30px);
  animation: titleReveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: currentColor;
    opacity: 0.3;
    animation: lineReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards 1s;
  }

  @keyframes titleReveal {
    to {
      transform: translateY(0);
    }
  }

  @keyframes lineReveal {
    to {
      width: 60%;
    }
  }
`;

const Description = styled.p`
  font-size: clamp(18px, 2.2vw, 26px);
  font-family: "Playfair Display", serif;
  line-height: 1.8;
  max-width: 75%;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.6s;
  font-weight: 300;
  letter-spacing: 0.5px;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 2;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ active }) =>
    active ? "#E11D48" : "rgba(225, 29, 72, 0.2)"};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(${({ active }) => (active ? "1.2" : "1")});

  &:hover {
    transform: scale(1.3);
    background-color: rgba(225, 29, 72, 0.8);
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
        <ArrowLeft style={{ color: "#E11D48" }} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {SlideItem.map((item, index) => (
          <Slide key={item.id} active={index === slideIndex} index={index}>
            <InfoContainer index={index}>
              <Title color={index === 0 ? "#ffffff" : "#E11D48"}>
                {item.title}
              </Title>
              <Description>{item.desc}</Description>
            </InfoContainer>
            {item.type === "video" ? (
              <VideoContainer src={item.img} autoPlay loop muted />
            ) : (
              <ImageContainer bg={item.img} />
            )}
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRight style={{ color: "#E11D48" }} />
      </Arrow>
      <Dots>
        {SlideItem.map((_, index) => (
          <Dot
            key={index}
            active={index === slideIndex}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </Dots>
    </Container>
  );
};

export default SquareSlider;
