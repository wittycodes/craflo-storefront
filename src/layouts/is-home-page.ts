import {
  HOME_PAGE,
  GROCERY_PAGE,
  CLOTHING,
  MAKEUP_PAGE,
  BAGS_PAGE,
  FURNITURE_PAGE,
  BOOK_PAGE,
  MEDICINE_PAGE,
  RESTAURANT_PAGE,
} from 'constants/navigation';
const arr = [
  HOME_PAGE,
  GROCERY_PAGE,
  CLOTHING,
  MAKEUP_PAGE,
  BAGS_PAGE,
  FURNITURE_PAGE,
  BOOK_PAGE,
  MEDICINE_PAGE,
  RESTAURANT_PAGE,
  "/help",
  // "/product/[...slugOrId]"
];
export function isCategoryPage(pathname) {
  console.log(pathname, "kokkoko")
  if (pathname)
    // if (pathname.includes('homepage'))
    //   return true
    // else return false
    return arr.includes(`/${pathname}`)
  return false
}
