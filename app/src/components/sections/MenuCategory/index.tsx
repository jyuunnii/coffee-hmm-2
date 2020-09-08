import React from "react";
import "./index.css";
import MenuSubCategory, { menusPerSubcategory } from "../MenuSubCategory";
import MenuCarousel from "../MenuCarousel";

export type Menus = {
  categories: MenuCategory[] | null;
};

export type MenuCategory = {
  categoryName: string;
  categoryMenu: MenuPrice[];
};

export type MenuPrice = {
  name: string;
  ename: string;
  price: string;
};

type MenuCategoryProps = {
  menus: Menus | undefined;
};

const fixedSubcategoryAreaWidth = 160;
const fixedSubcategoryAreaHeight = 120;
const fixedMenuAreaHeight = 140;

const MenuCategory = ({ menus }: MenuCategoryProps) => {
  let totalSubcategoryNum = getTotalSubcategoryNum({ menus });
  let neededMenuWidth = totalSubcategoryNum * fixedSubcategoryAreaWidth;

  return (
    <div
      style={{
        width: neededMenuWidth,
        height: fixedMenuAreaHeight,
      }}
    >
      <ul className="category-wrapper">
        <MenuCarousel totalSubCategory={totalSubcategoryNum}>
          {menus?.categories?.map((category, index) => {
            const subPerCategory = getSubPerCategory(category);

            return (
              <div key={index}>
                <div className="categoryname">{category.categoryName}</div>
                <li
                  className="category-one"
                  key={index}
                  style={{
                    width: subPerCategory * fixedSubcategoryAreaWidth,
                    height: fixedSubcategoryAreaHeight,
                  }}
                >
                  {OneCategoryArea(category, subPerCategory)}
                </li>
              </div>
            );
          })}
        </MenuCarousel>
      </ul>
    </div>
  );
};

const getSubPerCategory = (category: MenuCategory) => {
  const menusPerCategory = category.categoryMenu.length;

  const subsPerCategory = Math.floor(menusPerCategory / menusPerSubcategory);

  if (subsPerCategory < 1) {
    return 1;
  } else {
    return subsPerCategory;
  }
};

const getTotalSubcategoryNum = ({ menus }: MenuCategoryProps) => {
  let totalSubcategoryNum = 0;

  menus?.categories?.forEach((category) => {
    totalSubcategoryNum += getSubPerCategory(category);
  });

  return totalSubcategoryNum;
};

const OneCategoryArea = (category: MenuCategory, subcategoryNum: number) => {
  let totalMenusPerCategory = [];
  for (let index = 0; index < subcategoryNum; index++) {
    totalMenusPerCategory.push(
      <MenuSubCategory
        categoryMenu={category.categoryMenu}
        index={index}
        key={index}
      />
    );
  }
  return totalMenusPerCategory;
};

export default MenuCategory;
