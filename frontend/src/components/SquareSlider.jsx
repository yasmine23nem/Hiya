import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { SlideItem } from "../assets/data";

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #f8f0f2;
  transition: all 0.5s ease;

  @media (max-width: 768px) {
    height: 60vh;
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
  background: linear-gradient(135deg, #e11d48 20%, #ea6058 60%, #f8f0f2 100%);
  transform: scale(${({ active }) => (active ? "1" : "0.92")});
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

  @media (max-width: 768px) {
    width: 100%;
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

  @media (max-width: 768px) {
    width: 100%;
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
  color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: clamp(30px, 6vw, 80px);
  font-family: "Pinyon Script", cursive;
  color: #ffffff;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(30px) rotate(-3deg);
  animation: slideUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: currentColor;
    opacity: 0.3;
  }

  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0) rotate(0);
    }
  }
`;

const Description = styled.p`
  font-size: clamp(14px, 2vw, 24px);
  font-family: "Playfair Display", serif;
  line-height: 1.6;
  max-width: 80%;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.4s;
  color: #ffffff;

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
  width: 10px;
  height: 10px;
  background-color: ${({ active }) =>
    active ? "#ffffff" : "rgba(255, 255, 255, 0.3)"};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(${({ active }) => (active ? "1.2" : "1")});

  &:hover {
    transform: scale(1.2);
    background-color: #ffffff;
  }
`;

const SquareSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev < SlideItem.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Wrapper slideIndex={slideIndex}>
        {SlideItem.map((item, index) => (
          <Slide key={item.id} active={index === slideIndex} index={index}>
            <InfoContainer>
              <Title>{item.title}</Title>
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
