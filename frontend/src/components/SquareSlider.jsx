import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { SlideItem } from "../assets/data";

const Container = styled.div`
  width: 100%;
  height: 70vh; // Reduced height for the slider
  display: flex;
  position: relative;
  overflow: hidden;
  border: 1px solid #800020; // Bordeaux border for the container
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Optional: shadow for a better effect
  border-radius: 5px; // Optional: rounded corners for the container
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
  height: 100%; // Adjusted to fit the container height
  display: flex;
  align-items: center; // Center items vertically
  justify-content: center; // Center items horizontally
  position: relative;
`;

const ImageContainer = styled.div`
  width: 70vh; // Increased size for the square
  height: 65vh; // Increased size for the square
  background: url(${(props) => props.bg}) center/cover no-repeat;
  border-radius: 10px; // Optional: rounded corners
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Optional: shadow for images
  margin-right: 20px; // Add margin to the right to separate from the text
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Center text horizontally
  justify-content: center; // Center text vertically
  text-align: center; // Center text content
  padding: 20px;
  color: white; // Ensure text color is white for better visibility
`;

const Title = styled.h1`
  font-size: 50px; // Title font size
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px; // Title margin bottom
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  font-family: "Playfair Display", serif; // Elegant font family
  color: #d4af37; // Gold color for the title
`;

const Description = styled.p`
  margin: 20px 0; // Description margin
  font-size: 20px; // Description font size
  font-weight: 500;
  letter-spacing: 2px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  font-family: "Playfair Display", serif; // Elegant font family
  color: #800020; // Bordeaux color for the description
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
