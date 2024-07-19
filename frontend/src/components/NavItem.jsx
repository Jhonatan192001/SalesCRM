/* revisar por que no aparece el tooltip */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';

const NavItem = ({ icon, name, link, isOpen }) => {
  return (
    <a href={link} className="block py-2.5 px-4 text-white rounded-md hover:bg-cyan-950" data-tip={isOpen ? '' : name}>
      <FontAwesomeIcon icon={icon} className={`${isOpen ? 'mr-4' : 'm-auto'}`} />
      {isOpen && name}
      {!isOpen && <Tooltip place="top" type="dark" effect="solid"/>}
    </a>
  );
};

export default NavItem;