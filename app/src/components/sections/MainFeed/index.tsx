import React from "react";
import styled from "styled-components";
import Post from "../Post";
import PlacePreview from "../PlacePreview";

const MContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
`;
const FeedTop = styled.div`
  width: 360px;
  border: 1px solid #dbdbdb;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const FeedBox = styled.div`
  width: 360px;
  border: 1px solid #dbdbdb;
  margin: 10px auto;
  align-items: stretch;
  flex: 0 0 360px;
`;

export type CafeInfo = {
  id: string;
  name: string;
  imageUris: string[];
  mainImageUri: string;
  lat: number;
  lng: number;
  americanoPrice: number;
  floor: number;
  specialMenu: string;
  specialMenuPrice: number;
  logo: boolean;
};

type MainFeedProps = {
  mainCafeList: CafeInfo[] | null;
};

const MainFeed = ({ mainCafeList }: MainFeedProps) => {
  return (
    <MContainer>
      <FeedTop>
        <PlacePreview />
      </FeedTop>

      {mainCafeList?.map((cafe) => {
        return (
          <FeedBox key={cafe.id}>
            <Post cafeId={cafe.id} />
          </FeedBox>
        );
      })}
    </MContainer>
  );
};

export default MainFeed;
