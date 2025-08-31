'use client';

import React, { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const tagList: string[] = [
  'All',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes
        {isOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagList.map(item => (
            <li className={css.menuItem} key={item}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${item}`}
                className={css.menuLink}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
