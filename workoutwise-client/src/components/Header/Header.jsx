import "./Header.scss";
import logo from "../../assets/images/image.png";
import { TOKEN_NAME } from "../../shared/constants";
function Header() {
  const token = localStorage.getItem(TOKEN_NAME);
  return (
    <header className="header">
      <nav className="header__nav">
        <a className="header__logo" href={token ? "/dashboard" : "/"}>
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
