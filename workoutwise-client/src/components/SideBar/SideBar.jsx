import { NavLink } from "react-router-dom";
import "./SideBar.scss";
function SideBar() {
  const SidebarNavigationLinks = [
    {
      linkTo: "/dashboard",
      text: "Dashboard",
    },
    {
      linkTo: "/daily-tracker",
      text: "Daily Tracker",
    },
    {
      linkTo: "/explore-workouts",
      text: "Explore Workouts",
    },
  ];
  return (
    <section className="sidebar">
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {SidebarNavigationLinks.map((item, index) => {
            return (
              <li className="sidebar__item" key={index}>
                <NavLink
                  to={item.linkTo}
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar__link sidebar__link--active"
                      : "sidebar__link"
                  }>
                  {item.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}

export default SideBar;
