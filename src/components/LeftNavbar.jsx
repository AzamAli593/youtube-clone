import React from "react";
import { NavLink } from "react-router-dom";
import { categories } from "../utils/constants";

const isActiveStyle =
  "text-white flex items-center cursor-pointer h-10 px-3 mb-[1px] rounded-lg bg-white/[0.15]";
const isNotActiveStyle =
  "text-white flex items-center cursor-pointer h-10 px-3 mb-[1px] rounded-lg hover:bg-white/[0.15]";

const LeftNavbar = ({ toggleNav }) => {
  const style = toggleNav ? "ml-0" : "ml-[-240px]";
  return (
    <div
      className={`${style} w-[240px] md:ml-0 absolute overflow-y-auto h-full py-4 bg-black absoulute md:relative z-10 transition-all duration-100`}
    >
      <div className='flex px-5 flex-col '>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          <span className='text-xl mr-5'>{categories[0].icon} </span>
          Home
        </NavLink>
        {categories.map((category) => {
          if (category.type == "category") {
            return (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
              >
                <span className='text-xl mr-5'>{category.icon} </span>
                {category.name}
              </NavLink>
            );
          }
        })}
        <hr className='my-5 border-white/[0.2]' />
        {categories.map((category) => {
          if (category.type == "menu") {
            return (
              <div className={isNotActiveStyle}>
                <span className='text-xl mr-5'>{category.icon} </span>
                {category.name}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default LeftNavbar;
