import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import introNavSlice from '../../../store/modules/intro-nav';
import { onImageLoad } from '../../../utils/function';
import { StyledSpinnerContainer } from '../../../utils/styled';
import { TypeCafe } from '../../../utils/type';
import Spinner from '../../common/Spinner';
import './index.css';

type CarouselMainImageProps = {
    cafe: TypeCafe;
    index: number;
}

const CarouselMainImage = ({cafe, index}: CarouselMainImageProps) => {
    const [isImageReady, setImageReady] = useState(false);
    const history = useHistory();
    const mainImage = cafe.image.list.find((image) => image.isMain);

    const handleClick = async () => {
        history.push({
            pathname: `/cafe/${cafe.id}`,
        })
    }
    
    const dispatch = useAppDispatch();
    const handleLoad = () => {
        onImageLoad(setImageReady);
        dispatch(introNavSlice.actions.setImageReady(index));
    }

    return(
        <div className="carousel-img">
            {mainImage && <img src={cafe.image.count > 0 ? mainImage.relativeUri : "/images/coffee.png"} alt="img" 
                style={{display: isImageReady ? "initial" : "none"}} 
                onLoad={handleLoad}
                onClick={handleClick}/>}
            <StyledSpinnerContainer visible={!isImageReady} size={document.body.clientWidth}>
                <Spinner size={24}/>
            </StyledSpinnerContainer> 
        </div>     
    )
}

export default CarouselMainImage;