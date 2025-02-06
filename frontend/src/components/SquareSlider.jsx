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
  background-color: #ea6058; /* Valentine's Day theme */
  border-radius: 5px;
  border: 1px solid #800020; /* 1px border */

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
  left: ${(props) => (props.direction === "left" ? "10px" : "unset")};
  right: ${(props) => (props.direction === "right" ? "10px" : "unset")};
  cursor: pointer;
  z-index: 2;
  transition: background 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: transform 1s ease-in-out;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  ${({ active }) => active && "opacity: 1;"}
  background-color: #${(props) => props.bg};
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  background: url(${(props) => props.bg}) center/cover no-repeat;
  border-radius: 10px;
`;

const VideoContainer = styled.video`
  width: 50%;
  height: 100%;
  border-radius: 10px;
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
  margin-bottom: 20px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  font-family: "Playfair Display", serif;
  color: ${({ color }) => color};
  letter-spacing: 3px;
  line-height: 1.2;
  animation: fadeInDown 1s ease-out;

  @media (max-width: 768px) {
    font-size: 36px;
  }

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
`;

const Description = styled.p`
  margin: 20px 0;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: "Playfair Display", serif;
  color: white;
  line-height: 1.6;
  max-width: 80%;
  animation: fadeIn 1.2s ease-out;
  border: ${({ isLast }) => (isLast ? "1px solid white" : "none")};

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  background: #800020;
  color: white;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.3s;
  font-family: "Playfair Display", serif;

  &:hover {
    background: white;
    color: #800020;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ active }) => (active ? "#800020" : "#ccc")};
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
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
        {SlideItem.map((item, index) => (
          <Slide key={item.id} active={index === slideIndex} bg={item.bg}>
            <InfoContainer>
              <Title color={index === 0 ? "white" : index === 1 ? "#A02334" : "white"}>
                {item.title}
              </Title>
              <Description isLast={index === SlideItem.length - 1 || index === SlideItem.length - 2}>
                {item.desc}
              </Description>
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
        <ArrowRight style={{ color: "white" }} />
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