import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useAuth } from "../AuthContext";

const Header = ({ search, setSearch }) => {
  const { username, logout } = useAuth();
  return (
    <header>
      <div className="inHeader">
        <div className="logo">
          <Link to="/">
            <img src="/images/IconsAndLogo/Logo3-Photoroom.png" alt="" />
          </Link>
        </div>
        <nav className="navHeader">
          <Link to="/Nike">
            <div className="navItem">Nike</div>
          </Link>
          <Link to="/Jordan">
            <div className="navItem">Jordan</div>
          </Link>
          <Link to="/Adidas">
            <div className="navItem">Adidas</div>
          </Link>
          <Link to="/Under Armour">
            <div className="navItem">Under Armour</div>
          </Link>
        </nav>
        <div className="searchAndIcons">
          <div className="aboveSearchBox">
            <div className="searchBox">
              <input
                id="searchInput"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
              />
              <div className="icon Search">
                <img
                  src="/images/IconsAndLogo/Search icon.png"
                  alt="searchIcon"
                />
              </div>
            </div>
          </div>
          <div className="icon">
            <Link to="/admin">
              <img
                src="/images/IconsAndLogo/Profile icon.png"
                alt="profileIcon"
              />
            </Link>
          </div>
          <div className="LogInOut">
            {username ? (
              <>
                <span>Welcome, {username}!</span>
                <button onClick={logout}>Log Out</button>
              </>
            ) : (
              <Link to="/login">Log In</Link>
            )}
          </div>
          {/* <div className="icon">
            <img src="/images/Folowed icon.png" alt="folowedIcon" />
          </div>
          <div className="icon">
            <a href="#" id="iconBag">
              <img src="/images/IconsAndLogo/Bag icon.png" alt="bagIcon" />
              <div className="qntInBag">
                <span>0</span>
              </div>
            </a>
          </div>
          <div className="icon">
            <a href="#">
              <img
                src="/images/IconsAndLogo/Statistic icon.png"
                alt="statisticIcon"
              />
            </a>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
