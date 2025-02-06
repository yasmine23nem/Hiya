import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";

const slides = [
  {
    id: 1,
    img: "/valentine-slide.jpg", // Image thème Saint-Valentin
    title: "NOW 30% OFF",
    desc: "GIFT SETS FOR YOUR VALENTINE",
    cta: "SHOP NOW",
    bgColor: "#d12638", // Rouge romantique
  },
  {
    id: 2,
    img: "/summer-slide.jpg",
    title: "SUMMER COLLECTION",
    desc: "Shine bright this season",
    cta: "EXPLORE",
    bgColor: "#ffcc00",
  },
  {
    id: 3,
    img: "/winter-slide.jpg",
    title: "WINTER ELEGANCE",
    desc: "Timeless pieces for cold days",
    cta: "DISCOVER",
    bgColor: "#1c3d5a",
  },
  {
    id: 4,
    img: "/classic-slide.jpg",
    title: "CLASSIC COLLECTION",
    desc: "Jewelry that never goes out of style",
    cta: "BROWSE",
    bgColor: "#222222",
  },
];

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  position: relative;
  overflow: hidden;
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
  transition: all 1s ease-in-out;
`;

const Slide = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.bgColor};
`;

const Image = styled.img`
  position: absolute;
  width: 50%;
  height: auto;
  right: 10%;
  bottom: 0;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: left;
  color: white;
  padding: 20px;
  width: 40%;
`;

const Title = styled.h1`
  font-size: 45px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  font-family: "Playfair Display", serif;
`;

const Description = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition: 0.3s;
  &:hover {
    background: white;
    color: black;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slides.length - 1);
    } else {
      setSlideIndex(slideIndex < slides.length - 1 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeft style={{ color: "white" }} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {slides.map((item) => (
          <Slide key={item.id} bgColor={item.bgColor}>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button>{item.cta}</Button>
            </InfoContainer>
            <Image src={item.img} alt={item.title} />
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRight style={{ color: "white" }} />
      </Arrow>
    </Container>
  );
};

export default Slider;
