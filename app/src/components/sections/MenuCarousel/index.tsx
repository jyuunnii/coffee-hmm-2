import React, { useState } from "react";
import styled, { css } from "styled-components";
import "./index.css";

const ScrouselWrapper = styled.div`
  display: flex;
`;

interface ICarouselSlide {
  active?: boolean;
}

const SCarouselSlide = styled.div<ICarouselSlide>`
  flex: 0 0 auto;
  transition: all 1s ease;
  widht: 100%;
`;

interface ICarouselProps {
  currentSlide: number;
}

const SCarouselSlides = styled.div<ICarouselProps>`
  display: flex;
  ${(props) =>
    props.currentSlide &&
    css`
      transform: translateX(-${props.currentSlide * 320}px);
    `};
  transition: all 1s ease;
`;

interface IProps {
  children: JSX.Element[] | undefined;
  totalSubCategory: number;
}

const MenuCarousel = ({ children, totalSubCategory }: IProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  let activeSlide = children?.map((slide, index) => (
    <SCarouselSlide active={currentSlide === index} key={index}>
      {slide}
    </SCarouselSlide>
  ));

  const subInOneSlide = 2;

  function MslideLeft() {
    setCurrentSlide(
      (currentSlide - 1 + totalSubCategory) % (totalSubCategory / subInOneSlide)
    );
  }
  function MslideRight() {
    setCurrentSlide((currentSlide + 1) % (totalSubCategory / subInOneSlide));
  }

  return (
    <div>
      <ScrouselWrapper>
        <SCarouselSlides currentSlide={currentSlide}>
          {activeSlide}
        </SCarouselSlides>
      </ScrouselWrapper>

      <button
        className="Mslide-button Mslide-button-left"
        onTouchStart={MslideLeft}
      />
      <button
        className="Mslide-button Mslide-button-right"
        onTouchStart={MslideRight}
      />
    </div>
  );
};

export default MenuCarousel;