import "./Header.scss";
import logo from "../../assets/images/image.png";
function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <a className="header__logo" href="/">
          <img src={logo} alt="logo" className="header__logo-img" />
        </a>
        <ul className="header__list">
          <li className="header__item">
            <a>About Us</a>
          </li>
          <li className="header__item">
            <a>Blog</a>
          </li>
          <li className="header__item">
            <a>Contact Us</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
