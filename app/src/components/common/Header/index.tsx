import React, { useState } from "react";
import Logo from "../Logo";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import MaterialIcon from "../MaterialIcon";
import styled from "styled-components";

const SearchBox = styled.div`
  z-index: 9999;
  position: absolute;
  top: 12px;
  left: 30%;
`;

interface HeaderProps {
  location: {
    pathname: string;
  };
}

export const handleSubmit = (event: React.SyntheticEvent) => {
  event.preventDefault();
};

const Header = (props: HeaderProps) => {
  const history = useHistory();

  const [currentSpot, setCurrentSpot] = useState<string | undefined>("");

  const handleChange = (event: React.SyntheticEvent) => {
    setCurrentSpot((event.target as HTMLTextAreaElement).value);
  };

  return (
    <header>
      <Link to="/" id="home-link">
        <Logo />
      </Link>
      <SearchBox>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search"
            value={currentSpot}
            onChange={handleChange}
            className="search-box"
          />
          <Link to={`/${currentSpot}`}>
            <button type="submit" className="search-button"></button>
          </Link>
        </form>
      </SearchBox>
      {props.location.pathname !== "/" && props.location.pathname !== "/cafe" && (
        <button className="leading" onClick={() => history.goBack()}>
          <MaterialIcon icon="arrow_back" />
        </button>
      )}
    </header>
  );
};

export default Header;
