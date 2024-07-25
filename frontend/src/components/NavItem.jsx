import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import PropTypes from "prop-types";

const NavItem = ({ icon, name, link, isOpen }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `block py-2.5 px-4 text-white rounded-md hover:bg-cyan-950 ${
          isActive ? "bg-cyan-950" : ""
        }`
      }
      data-tip={isOpen ? "" : name}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`${isOpen ? "mr-4" : "m-auto"}`}
      />
      {isOpen && name}
      {!isOpen && <Tooltip place="top" type="dark" effect="solid" />}
    </NavLink>
  );
};

NavItem.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default NavItem;

