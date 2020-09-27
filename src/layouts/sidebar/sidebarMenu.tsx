import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import Sticky from 'react-stickynode';
import { Scrollbars } from 'react-custom-scrollbars';
import Popover from 'components/popover/popover';
import { ArrowDropDown } from 'assets/icons/ArrowDropDown';
import { CategoryIcon } from 'assets/icons/CategoryIcon';
import Grid from "@material-ui/core/Grid";
import { useLocale } from 'contexts/language/language.provider';
import {
  SidebarMobileLoader,
  SidebarLoader,
} from 'components/placeholder/placeholder';
import { FormattedMessage } from 'react-intl';
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverHandler,
  PopoverWrapper,
  SidebarWrapper,
  RequestMedicine,
} from './sidebar.style';
import inject from "hocs/inject";

import { NavigationItemDesktop } from "components/NavigationDesktop";

import { TreeMenu } from 'components/tree-menu/tree-menu';

import { GET_CATEGORIES } from 'graphql/query/category.query';

import { REQUEST_MEDICINE_PAGE } from 'constants/navigation';
import Menu from "src/layouts/header/menu";
import {
  DrawerContentWrapper,
  DrawerMenu,
  DrawerMenuItem,
  DrawerProfile,
  LoginView,
  LogoutView,
  UserAvatar,
  UserDetails, UserOptionMenu
} from "../header/header.style";
import UserImage from "../../assets/images/user.jpg";
import {StyledProfileButton, Button} from "../../components/button/button";
import NavLink from "../../components/nav-link/nav-link";
import AuthenticationForm from "../../features/authentication-form";
import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import {AuthContext} from "../../contexts/auth/auth.context";
import { openModal, closeModal } from '@redq/reuse-modal';
import useAuthStore from "../../reaction/hooks/globalStores/useAuthStore";
// import {StyledProfileButton} from 'src/components/Button'
type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
  type: string;
};



const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
  type,
  ...props
}) => {
  const router = useRouter();
  let { data, loading } = useQuery(GET_CATEGORIES, {
    variables: { type },
  });

  loading = false
  data = {
      categories: [
      {
    id: 1, title: 'Fruits & Vegetables',
    slug: 'fruits-and-vegetables',
    products: [],
    type: 'grocery',
    icon: 'FruitsVegetable',
    children: [
    {
      id: 2,
      title: 'Fruits',
      slug: 'fruits',
      products: [],
      type: 'grocery',
    },
    {
      id: 3,
      title: 'vegetables',
      slug: 'vegetables',
      products: [],
      type: 'grocery',
    },
  ],
  },
  {
    id: 9,
      title: 'Meat & Fish',
    slug: 'meat-and-fish',
    products: [],
    type: 'grocery',
    icon: 'MeatFish',
    children: [
    {
      id: 12,
      title: 'Fresh Fish',
      slug: 'fresh-fish',
      products: [],
      type: 'grocery',
    },
    {
      id: 13,
      title: 'Meat',
      slug: 'meat',
      products: [],
      type: 'grocery',
    },
  ],
  },

  {
    id: 14,
      title: 'Purse',
    slug: 'purse',
    products: [],
    type: 'bags',
    icon: 'Purse',
    children: [],
  },

  {
    id: 15,
      title: 'Hand bags',
    slug: 'hand-bags',
    products: [],
    type: 'bags',
    icon: 'HandBags',
    children: [],
  },

  {
    id: 16,
      title: 'Shoulder bags',
    slug: 'shoulder-bags',
    products: [],
    type: 'bags',
    icon: 'ShoulderBags',
    children: [],
  },
  {
    id: 17,
      title: 'Wallet',
    slug: 'wallet',
    products: [],
    type: 'bags',
    icon: 'Wallet',
    children: [],
  },
  {
    id: 18,
      title: 'Laptop bags',
    slug: 'laptop-bags',
    products: [],
    type: 'bags',
    icon: 'LaptopBags',
    children: [],
  },

  {
    id: 19,
      title: 'Women Dress',
    slug: 'women-dress',
    products: [],
    type: 'clothing',
    icon: 'WomenDress',
    children: [
    {
      id: 20,
      title: 'Printed',
      slug: 'printed',
      products: [],
      type: 'clothing',
    },
    {
      id: 21,
      title: 'Floral',
      slug: 'floral',
      products: [],
      type: 'clothing',
    },
    {
      id: 22,
      title: 'Single Color',
      slug: 'single-color',
      products: [],
      type: 'clothing',
    },
  ],
  },
  {
    id: 23,
      title: 'Outer Wear',
    slug: 'outer-wear',
    products: [],
    type: 'clothing',
    icon: 'OuterWear',
    children: [
    {
      id: 24,
      title: 'Hoodie',
      slug: 'hoodie',
      products: [],
      type: 'clothing',
    },
    {
      id: 25,
      title: 'Jacket',
      slug: 'jacket',
      products: [],
      type: 'clothing',
    },
    {
      id: 26,
      title: 'Blazer',
      slug: 'blazer',
      products: [],
      type: 'clothing',
    },
    {
      id: 27,
      title: 'Waist Coat',
      slug: 'waist-coat',
      products: [],
      type: 'clothing',
    },
  ],
  },
  {
    id: 28,
      title: 'Pants',
    slug: 'pants',
    products: [],
    type: 'clothing',
    icon: 'Pants',
    children: [
    {
      id: 29,
      title: 'Jeans',
      slug: 'jeans',
      products: [],
      type: 'clothing',
    },
    {
      id: 30,
      title: 'Chinos',
      slug: 'chinos',
      products: [],
      type: 'clothing',
    },
    {
      id: 31,
      title: 'Sports',
      slug: 'sports',
      products: [],
      type: 'clothing',
    },
  ],
  },

  {
    id: 32,
      title: 'Tops',
    slug: 'tops',
    products: [],
    type: 'clothing',
    icon: 'Tops',
    children: [],
  },
  {
    id: 33,
      title: 'Skirts',
    slug: 'skirts',
    products: [],
    type: 'clothing',
    icon: 'Skirts',
    children: [],
  },
  {
    id: 34,
      title: 'Shirts',
    slug: 'shirts',
    products: [],
    type: 'clothing',
    icon: 'Shirts',
    children: [],
  },

  {
    id: 35,
      title: 'Face',
    slug: 'face',
    products: [],
    type: 'makeup',
    icon: 'Face',
    children: [
    {
      id: 36,
      title: 'Blusher',
      slug: 'blusher',
      products: [],
      type: 'makeup',
    },
    {
      id: 37,
      title: 'Foundation',
      slug: 'foundation',
      products: [],
      type: 'makeup',
    },
    {
      id: 38,
      title: 'Face Powder',
      slug: 'face-powder',
      products: [],
      type: 'makeup',
    },
  ],
  },

  {
    id: 39,
      title: 'Eyes',
    slug: 'eyes',
    products: [],
    type: 'makeup',
    icon: 'Eyes',
    children: [
    {
      id: 40,
      title: 'Eye Shadow',
      slug: 'eye-shadow',
      products: [],
      type: 'makeup',
    },
    {
      id: 41,
      title: 'Glitter',
      slug: 'glitter',
      products: [],
      type: 'makeup',
    },
    {
      id: 42,
      title: 'Mascara',
      slug: 'mascara',
      products: [],
      type: 'makeup',
    },
  ],
  },

  {
    id: 43,
      title: 'Lips',
    slug: 'lips',
    products: [],
    type: 'makeup',
    icon: 'Lips',
    children: [
    {
      id: 44,
      title: 'Lip Gloss',
      slug: 'lip-gloss',
      products: [],
      type: 'makeup',
    },
    {
      id: 45,
      title: 'Lipstick',
      slug: 'lipstick',
      products: [],
      type: 'makeup',
    },
    {
      id: 46,
      title: 'Lip Kit',
      slug: 'lip-kit',
      products: [],
      type: 'makeup',
    },
  ],
  },

  {
    id: 47,
      title: 'Accessories',
    slug: 'accessories',
    products: [],
    type: 'makeup',
    icon: 'Accessories',
    children: [],
  },
  {
    id: 48,
      title: 'Snacks',
    slug: 'snacks',
    products: [],
    type: 'grocery',
    icon: 'Snacks',
    children: [
    {
      id: 49,
      title: 'Biscuits',
      slug: 'biscuits',
      products: [],
      type: 'grocery',
    },
    {
      id: 50,
      title: 'Chocolates',
      slug: 'chocolates',
      products: [],
      type: 'grocery',
    },
    {
      id: 51,
      title: 'Crisps',
      slug: 'crisps',
      products: [],
      type: 'grocery',
    },
    {
      id: 52,
      title: 'Noodles',
      slug: 'noodles',
      products: [],
      type: 'grocery',
    },
    {
      id: 53,
      title: 'Nuts',
      slug: 'nuts',
      products: [],
      type: 'grocery',
    },
    {
      id: 54,
      title: 'Pasta',
      slug: 'pasta',
      products: [],
      type: 'grocery',
    },
    {
      id: 55,
      title: 'Sauce',
      slug: 'sauce',
      products: [],
      type: 'grocery',
    },
    {
      id: 56,
      title: 'Soup',
      slug: 'soup',
      products: [],
      type: 'grocery',
    },
  ],
  },

  {
    id: 57,
      title: 'Pet Care',
    slug: 'petcare',
    products: [],
    type: 'grocery',
    icon: 'PetCare',
    children: [
    {
      id: 58,
      title: 'Cat Food',
      slug: 'catfood',
      products: [],
      type: 'grocery',
    },
    {
      id: 59,
      title: 'Dog Food',
      slug: 'dogfood',
      products: [],
      type: 'grocery',
    },
    {
      id: 60,
      title: 'KItten Food',
      slug: 'kittenfood',
      products: [],
      type: 'grocery',
    },
    {
      id: 61,
      title: 'Pet Accessories',
      slug: 'petaccessories',
      products: [],
      type: 'grocery',
    },
  ],
  },
  {
    id: 62,
      title: 'Home & Cleaning',
    slug: 'home-cleaning',
    products: [],
    type: 'grocery',
    icon: 'HomeCleaning',
    children: [
    {
      id: 63,
      title: 'Air Freshner',
      slug: 'air_freshner',
      products: [],
      type: 'grocery',
    },
    {
      id: 64,
      title: 'Cleaning Products',
      slug: 'cleaning_products',
      products: [],
      type: 'grocery',
    },
    {
      id: 65,
      title: 'Dishwasher',
      slug: 'dishwasher',
      products: [],
      type: 'grocery',
    },
    {
      id: 66,
      title: 'Kitchen Accessories',
      slug: 'kitchen_accessories',
      products: [],
      type: 'grocery',
    },
    {
      id: 67,
      title: 'Laundry',
      slug: 'laundry',
      products: [],
      type: 'grocery',
    },
    {
      id: 68,
      title: 'Pest Control',
      slug: 'Pest_control',
      products: [],
      type: 'grocery',
    },
  ],
  },
  {
    id: 69,
      title: 'Dairy',
    slug: 'dairy',
    products: [],
    type: 'grocery',
    icon: 'Dairy',
    children: [
    {
      id: 70,
      title: 'Butter',
      slug: 'butter',
      products: [],
      type: 'grocery',
    },
    {
      id: 71,
      title: 'Egg',
      slug: 'egg',
      products: [],
      type: 'grocery',
    },
    {
      id: 72,
      title: 'Milk',
      slug: 'milk',
      products: [],
      type: 'grocery',
    },
    {
      id: 73,
      title: 'Milk Cream',
      slug: 'milk_cream',
      products: [],
      type: 'grocery',
    },
    {
      id: 74,
      title: 'Powder Milk',
      slug: 'Powder_Milk',
      products: [],
      type: 'grocery',
    },
    {
      id: 75,
      title: 'Yogourt',
      slug: 'yogourt',
      products: [],
      type: 'grocery',
    },
  ],
  },
  {
    id: 76,
      title: 'Cooking',
    slug: 'cooking',
    products: [],
    type: 'grocery',
    icon: 'Cooking',
    children: [
    {
      id: 77,
      title: 'Oil',
      slug: 'oil',
      products: [],
      type: 'grocery',
    },
    {
      id: 78,
      title: 'Rice',
      slug: 'rice',
      products: [],
      type: 'grocery',
    },
    {
      id: 79,
      title: 'Salt & Sugar',
      slug: 'Salt_sugar',
      products: [],
      type: 'grocery',
    },
    {
      id: 80,
      title: 'Spices',
      slug: 'milk_cream',
      products: [],
      type: 'grocery',
    },
  ],
  },
  {
    id: 82,
      title: 'Breakfast',
    slug: 'breakfast',
    products: [],
    type: 'grocery',
    icon: 'Breakfast',
    children: [
    {
      id: 83,
      title: 'Bread',
      slug: 'bread',
      products: [],
      type: 'grocery',
    },
    {
      id: 84,
      title: 'Cereal',
      slug: 'cereal',
      products: [],
      type: 'grocery',
    },
    {
      id: 85,
      title: 'Honey',
      slug: 'honey',
      products: [],
      type: 'grocery',
    },
    {
      id: 86,
      title: 'Jam',
      slug: 'jam',
      products: [],
      type: 'grocery',
    },
    {
      id: 87,
      title: 'Mayonnaise',
      slug: 'mayonnaise',
      products: [],
      type: 'grocery',
    },
    {
      id: 88,
      title: 'Oats',
      slug: 'oats',
      products: [],
      type: 'grocery',
    },
  ],
  },
  {
    id: 90,
      title: 'Beverage',
    slug: 'beverage',
    products: [],
    type: 'grocery',
    icon: 'Beverage',
    children: [
    {
      id: 91,
      title: 'Coffee',
      slug: 'coffee',
      products: [],
      type: 'grocery',
    },
    {
      id: 92,
      title: 'Energy Drinks',
      slug: 'energy_drinks',
      products: [],
      type: 'grocery',
    },
    {
      id: 93,
      title: 'Juice',
      slug: 'juice',
      products: [],
      type: 'grocery',
    },
    {
      id: 94,
      title: 'Fizzy Drinks',
      slug: 'fizzy_drinks',
      products: [],
      type: 'grocery',
    },
    {
      id: 95,
      title: 'Syrup & powder',
      slug: 'syrup_powder',
      products: [],
      type: 'grocery',
    },
    {
      id: 96,
      title: 'Tea',
      slug: 'tea',
      products: [],
      type: 'grocery',
    },
    {
      id: 97,
      title: 'Water',
      slug: 'water',
      products: [],
      type: 'grocery',
    },
  ],
  },
  {
    id: 98,
      title: 'Beauty & Health',
    slug: 'health_beauty',
    products: [],
    type: 'grocery',
    icon: 'BeautyHealth',
    children: [
    {
      id: 99,
      title: 'Bath',
      slug: 'bath',
      products: [],
      type: 'grocery',
    },
    {
      id: 100,
      title: 'Cream',
      slug: 'cream',
      products: [],
      type: 'grocery',
    },
    {
      id: 101,
      title: 'Deodorant',
      slug: 'deodorant',
      products: [],
      type: 'grocery',
    },
    {
      id: 102,
      title: 'Face Care',
      slug: 'face_care',
      products: [],
      type: 'grocery',
    },
    {
      id: 105,
      title: 'Oral Care',
      slug: 'Oral_care',
      products: [],
      type: 'grocery',
    },
    {
      id: 106,
      title: 'Shaving Needs',
      slug: 'shaving_needs',
      products: [],
      type: 'grocery',
    },
  ],
  },
  {
    id: 107,
      title: 'Shaving Needs',
    slug: 'shaving_needs',
    products: [],
    type: 'makeup',
    icon: 'ShavingNeeds',
    children: [],
  },
  {
    id: 108,
      title: 'Oral Care',
    slug: 'Oral_care',
    products: [],
    type: 'makeup',
    icon: 'OralCare',
    children: [],
  },
  {
    id: 109,
      title: 'Facial Care',
    slug: 'face_care',
    products: [],
    type: 'makeup',
    icon: 'FacialCare',
    children: [],
  },
  {
    id: 110,
      title: 'Deodorant',
    slug: 'deodorant',
    products: [],
    type: 'makeup',
    icon: 'Deodorant',
    children: [],
  },
  {
    id: 111,
      title: 'Bath & Oil',
    slug: 'bath',
    products: [],
    type: 'makeup',
    icon: 'BathOil',
    children: [],
  },
  {
    id: 112,
      title: 'Children Literature',
    slug: 'children_literature',
    products: [],
    type: 'book',
    icon: '',
    children: [],
  },

  {
    id: 113,
      title: 'Comic Book',
    slug: 'comic_book',
    products: [],
    type: 'book',
    icon: '',
    children: [],
  },

  {
    id: 114,
      title: 'Fantasy',
    slug: 'fantasy',
    products: [],
    type: 'book',
    icon: '',
    children: [],
  },
  {
    id: 115,
      title: 'Horror',
    slug: 'horror',
    products: [],
    type: 'book',
    icon: '',
    children: [],
  },

  {
    id: 116,
      title: 'Novel',
    slug: 'novel',
    products: [],
    type: 'book',
    icon: '',
    children: [],
  },

  {
    id: 117,
      title: 'Romantic',
    slug: 'romantic',
    products: [],
    type: 'book',
    icon: '',
    children: [],
  },
  {
    id: 118,
      title: 'Science Fiction',
    slug: 'science_fiction',
    products: [],
    type: 'book',
    icon: '',
    children: [],
  },
  {
    id: 119,
      title: 'Thriller',
    slug: 'thriller',
    products: [],
    type: 'book',
    icon: '',
    children: [],
  },
  {
    id: 120,
      title: 'Bed',
    slug: 'bed',
    products: [],
    type: 'furniture',
    icon: '',
    children: [
    {
      id: 121,
      title: 'Master Bed',
      slug: 'master_bed',
      products: [],
      type: 'furniture',
    },
    {
      id: 122,
      title: 'Single Bed',
      slug: 'single_bed',
      products: [],
      type: 'furniture',
    },
    {
      id: 123,
      title: 'Semi Double Bed',
      slug: 'semi_double_bed',
      products: [],
      type: 'furniture',
    },
  ],
  },
  {
    id: 124,
      title: 'Chair',
    slug: 'chair',
    products: [],
    type: 'furniture',
    icon: '',
    children: [
    {
      id: 125,
      title: 'Cozy Chair',
      slug: 'cozy_chair',
      products: [],
      type: 'furniture',
    },
    {
      id: 126,
      title: 'Rocking Chair',
      slug: 'rocking_chair',
      products: [],
      type: 'furniture',
    },
    {
      id: 127,
      title: 'Single Chair',
      slug: 'single_chair',
      products: [],
      type: 'furniture',
    },
  ],
  },
  {
    id: 128,
      title: 'Sofa',
    slug: 'sofa',
    products: [],
    type: 'furniture',
    icon: '',
    children: [
    {
      id: 129,
      title: 'Double Sofa',
      slug: 'double_sofa',
      products: [],
      type: 'furniture',
    },
    {
      id: 130,
      title: 'Single Sofa',
      slug: 'single_sofa',
      products: [],
      type: 'furniture',
    },
    {
      id: 131,
      title: 'Sofa set',
      slug: 'sofa_set',
      products: [],
      type: 'furniture',
    },
  ],
  },
  {
    id: 132,
      title: 'Table',
    slug: 'table',
    products: [],
    type: 'furniture',
    icon: '',
    children: [
    {
      id: 133,
      title: 'Bedside Table',
      slug: 'bedside_table',
      products: [],
      type: 'furniture',
    },
    {
      id: 134,
      title: 'Coffee Table',
      slug: 'coffee_table',
      products: [],
      type: 'furniture',
    },
    {
      id: 135,
      title: 'Dining Table',
      slug: 'dining_table',
      products: [],
      type: 'furniture',
    },
  ],
  },
  {
    id: 1001,
      title: 'Cold & Flu',
    slug: 'cold_flu',
    products: [],
    type: 'medicine',
    icon: '',
    children: [],
  },
  {
    id: 1002,
      title: 'First Aid',
    slug: 'first_aid',
    products: [],
    type: 'medicine',
    icon: '',
    children: [],
  },
  {
    id: 1003,
      title: 'Pain Relief',
    slug: 'pain_relief',
    products: [],
    type: 'medicine',
    icon: '',
    children: [],
  },
  {
    id: 1004,
      title: 'Quit Smoking',
    slug: 'quit_smoking',
    products: [],
    type: 'medicine',
    icon: '',
    children: [],
  },
  {
    id: 1005,
      title: 'Herbal Products',
    slug: 'herbal_product',
    products: [],
    type: 'medicine',
    icon: '',
    children: [],
  },
  {
    id: 1006,
      title: 'Supplements',
    slug: 'supplement',
    products: [],
    type: 'medicine',
    icon: '',
    children: [],
  },
  {
    id: 1007,
      title: 'Baby Care',
    slug: 'baby_care',
    products: [],
    type: 'medicine',
    icon: '',
    children: [
    {
      id: 1008,
      title: 'Diaper',
      slug: 'diaper',
      products: [],
      type: 'medicine',
    },
    {
      id: 1009,
      title: 'Wipes',
      slug: 'wipes',
      products: [],
      type: 'medicine',
    },
    {
      id: 1010,
      title: 'Baby Supplement',
      slug: 'baby_supplement',
      products: [],
      type: 'medicine',
    },
    {
      id: 1011,
      title: 'Baby Skin Care',
      slug: 'baby_skin_Care',
      products: [],
      type: 'medicine',
    },
  ],
  },
  {
    id: 2000,
      title: 'Chinese',
    slug: 'chinese',
    type: 'restaurant',
    icon: '',
    itemCount: 10,
    children: [],
  },
  {
    id: 2001,
      title: 'Sea Food',
    slug: 'sea-food',
    type: 'restaurant',
    icon: '',
    itemCount: 25,
    children: [],
  },
  {
    id: 2002,
      title: 'Fast Food',
    slug: 'fast-food',
    type: 'restaurant',
    icon: '',
    itemCount: 25,
    children: [],
  },
  {
    id: 2003,
      title: 'Pizza',
    slug: 'pizza',
    type: 'restaurant',
    icon: '',
    itemCount: 30,
    children: [],
  },

  {
    id: 2004,
      title: 'Indian',
    slug: 'indian',
    type: 'restaurant',
    icon: '',
    itemCount: 30,
    children: [],
  },
  {
    id: 2005,
      title: 'Kebab',
    slug: 'kebab',
    type: 'restaurant',
    icon: '',
    itemCount: 35,
    children: [],
  },
  {
    id: 2006,
      title: 'Thai',
    slug: 'thai',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },

  {
    id: 2007,
      title: 'Italian',
    slug: 'italian',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },

  {
    id: 2008,
      title: 'Steak House',
    slug: 'steak-house',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },

  {
    id: 2009,
      title: 'Traditional English',
    slug: 'traditional-english',
    type: 'restaurant',
    icon: '',
    itemCount: 15,
    children: [],
  },
  {
    id: 2010,
      title: 'Caribbean',
    slug: 'caribbean',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },

  {
    id: 2011,
      title: 'Arabic',
    slug: 'arabic',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },
  {
    id: 2012,
      title: 'Lebanese',
    slug: 'lebanese',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },
  {
    id: 2013,
      title: 'Vegetarian',
    slug: 'vegetarian',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },
  {
    id: 2014,
      title: 'Vegan',
    slug: 'vegan',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },

  {
    id: 201,
      title: 'Barista',
    slug: 'barista',
    type: 'restaurant',
    icon: '',
    itemCount: 20,
    children: [],
  },
]
  }



  const {
    isAuthenticated,
    account:{
      primaryEmailAddress,
      name
    }
  } = useAuthStore()

  const { pathname, query } = router;
  const selectedQueries = query.category;

  const { isRtl } = useLocale();

  const onCategoryClick = (slug: string) => {
    const { type, ...rest } = query;
    router.push(
      {
        pathname,
        query: { ...rest, category: slug },
      },
      {
        pathname: `/${type}`,
        query: { ...rest, category: slug },
      }
    );
  };
  const isSidebarSticky = useAppState('isSidebarSticky');

  if (!data || loading) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }

  function renderNavItem(navItem, index) {
    return <NavigationItemDesktop key={index} navItem={navItem} />;
  }
  const { navItems } = props
  // console.log(props)



  const isDrawerOpen = useAppState('isDrawerOpen');
  const dispatch = useAppDispatch();
  const {
    authDispatch,
  } = React.useContext<any>(AuthContext);
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: 'TOGGLE_DRAWER',
    });
  }, [dispatch]);

  /*
    React.useEffect(() => {
      window.addEventListener("GuestAuthSuccess", (e)=>{
        closeModal()
        console.log(e, "areeee had h be ye kaam krne lag gya bc")
      }, false);
    });
  */

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };

  /*
    React.useEffect(() => {
      window.addEventListener("GuestAuthSuccess", (e)=>{
        closeModal()
        console.log(e, "areeee had h be ye kaam krne lag gya bc")
      }, false);
    });
  */

  const signInOutForm = () => {
    dispatch({
      type: 'TOGGLE_DRAWER',
    });

    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 410
      },
    });
  };

  console.log(useAuthStore(), "hgdawwwww")


  return (
    <CategoryWrapper>
      {/*<PopoverWrapper*/}
      {/*// className={`${mobile || tablet ? 'mobileView' : ''}`}*/}
      {/*>*/}
      {/*  <Popover*/}
      {/*    handler={*/}
      {/*      <PopoverHandler>*/}
      {/*        <div>*/}
      {/*          <CategoryIcon />*/}
      {/*          Select your Category*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*          <ArrowDropDown />*/}
      {/*        </div>*/}
      {/*      </PopoverHandler>*/}
      {/*    }*/}
      {/*    className="category-popover"*/}
      {/*    content={*/}
      {/*      <>*/}
      {/*        {type === 'medicine' && (*/}
      {/*          <Link href={REQUEST_MEDICINE_PAGE}>*/}
      {/*            <RequestMedicine>*/}
      {/*              <FormattedMessage id="reqMedicine" />*/}
      {/*            </RequestMedicine>*/}
      {/*          </Link>*/}
      {/*        )}*/}
      {/*        <nav>{navItems?.items.map(renderNavItem)}</nav>;*/}
      {/*        <TreeMenu*/}
      {/*          data={data.categories}*/}
      {/*          onClick={onCategoryClick}*/}
      {/*          active={selectedQueries}*/}
      {/*        />*/}
      {/*      </>*/}
      {/*    }*/}
      {/*  />*/}
      {/*</PopoverWrapper>*/}

      {/*<SidebarWrapper*/}
      {/*  // className={`${mobile || tablet ? 'mobileView' : ''}`}*/}
      {/*  style={{ paddingTop: type === 'medicine' ? 0 : 45 }}*/}
      {/*>*/}
        {/*<Sticky enabled={false} top={type === 'medicine' ? 89 : 110}>*/}



          <Scrollbars
            universal
            autoHide
            autoHeight
            autoHeightMax={'100vh'}
            renderView={(props) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  marginLeft: isRtl ? props.style.marginRight : 0,
                  marginRight: isRtl ? 0 : props.style.marginRight,
                  marginTop: '80px'
                }}
              />
            )}
          >

            <DrawerContentWrapper >
              {mobile ?
                <DrawerProfile>
                  {isAuthenticated ? (
                    <LoginView>

                      <Grid container spacing={1}>
                        <UserAvatar>
                          <img src={UserImage} alt="user_avatar"/>
                        </UserAvatar>
                        <UserDetails>
                          <h3>{name}</h3>

                          <span>{primaryEmailAddress}</span>
                        </UserDetails>

                        <Grid item xs={12} style={{paddingTop: 24}}/>

                        <Grid item xs={6}>
                          <StyledProfileButton variant={'orders'}>Your Orders</StyledProfileButton>
                        </Grid>
                        <Grid item xs={6}>
                          <StyledProfileButton variant={'address'}>Saved Address</StyledProfileButton>
                        </Grid>
                        <Grid item xs={6}>
                          <StyledProfileButton variant={'payments'}>Payments</StyledProfileButton>
                        </Grid>
                        <Grid item xs={6}>
                          <StyledProfileButton variant={'offers'}>Offers</StyledProfileButton>
                        </Grid>
                        <Grid item xs={12}>
                          <DrawerMenuItem>
                            <div onClick={handleLogout} style={{marginTop: 24}} className="drawer_menu_item">
                            <span className="logoutBtn">
                              <FormattedMessage
                                id="navlinkLogouts"
                                defaultMessage={"Not " + name + "? Logout"}
                              />
                            </span>
                            </div>
                          </DrawerMenuItem>
                        </Grid>

                      </Grid>

                    </LoginView>
                  ) : (
                    <LogoutView>
                      <Button variant="primary" onClick={signInOutForm}>
                        <FormattedMessage
                          id="mobileSignInButtonText"
                          defaultMessage="join"
                        />
                      </Button>
                    </LogoutView>
                  )}

                </DrawerProfile> : null
              }



              {/*{isAuthenticated && (*/}
              {/*  <UserOptionMenu>*/}
              {/*    /!*<DrawerMenuItem>*!/*/}
              {/*    /!*  <NavLink*!/*/}
              {/*    /!*    href="/profile"*!/*/}
              {/*    /!*    label="Your Account Settings"*!/*/}
              {/*    /!*    className="drawer_menu_item"*!/*/}
              {/*    /!*    intlId="navlinkAccountSettings"*!/*/}
              {/*    /!*  />*!/*/}
              {/*    /!*</DrawerMenuItem>*!/*/}

              {/*  </UserOptionMenu>*/}
              {/*)}*/}

            </DrawerContentWrapper>
            <div style={{marginTop: 24}}/>

            <TreeWrapper>
              <TreeMenu
                data={data.categories}
                onClick={onCategoryClick}
                active={selectedQueries}
              />
            </TreeWrapper>
          </Scrollbars>
        {/*</Sticky>*/}
      {/*</SidebarWrapper>*/}
    </CategoryWrapper>
  );
};

export default React.memo(inject("navItems")(SidebarCategory));
