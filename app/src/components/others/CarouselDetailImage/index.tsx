import React, { useState } from 'react';
import { onImageLoad } from '../../../utils/function';
import { StyledSpinnerContainer } from '../../../utils/styled';
import Spinner from '../../common/Spinner';
import './index.css';

type CarouselDetailImageProps = {
    image: string;
}

const CarouselDetailImage = ({image}: CarouselDetailImageProps) => {
    const [isImageReady, setIsImageReady] = useState<boolean>(false);

    return(
        <div className="detail-carousel-img">
            <img src={`https://${image}`} alt="img" onLoad={() => onImageLoad(setIsImageReady)}/>
            <StyledSpinnerContainer visible={!isImageReady} size={360}>
                <Spinner size={24}/>
            </StyledSpinnerContainer>
            <button className="prev-button">prev</button>
            <button className="next-button">next</button>
        </div>
    )
}

export default CarouselDetailImage;