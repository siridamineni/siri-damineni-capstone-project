import "./Header.scss";
import logo from "../../assets/images/image.png";
import { TOKEN_NAME } from "../../shared/constants";
import { useNavigate } from "react-router-dom";
import logout from "../../assets/icons/logout.svg";
function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_NAME);
  const handleLogout = () => {
    localStorage.removeItem(TOKEN_NAME);
    navigate("/");
  };
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
      {token && (
        <div onClick={handleLogout}>
          <img className="header__icon" src={logout} alt="logout icon" />
        </div>
      )}
    </header>
  );
}

export default Header;
