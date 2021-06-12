import {useState} from 'react';
import classNames from 'classnames';

import './styles.scss';

export default function MenuHamburguer() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div
      className={classNames('menu-hamburguer', {
        open: open,
      })}
      onClick={() => toggleMenu()}
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}
