// cafe 0
// hotel 1
// tafrihi 2
// didani 3
import {
  RiRestaurantLine,
  RiHome3Line,
  RiChatQuoteLine,
  RiShipLine,
  RiPagesLine,
  RiFileList2Fill,
} from 'react-icons/ri';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MdContactPhone } from 'react-icons/md';

export const AddPlaceSteps = [
  {
    label: 'اطلاعات پایه',
    icon: RiFileList2Fill,
    fields: ['name', 'description'],
  },
  {
    label: 'نقشه',
    icon: FaMapMarkedAlt,
    fields: ['state', 'city', 'street', 'latitude', 'longitude'],
  },
  {
    label: 'اطلاعات تماس',
    icon: MdContactPhone,
    fields: ['phone', 'email', 'website'],
  },
  {
    label: 'اطلاعات تکمیلی',
    icon: RiPagesLine,
    fields: [],
  },
];

export const PlaceTypes = [
  {
    label: 'رستوران‌‌ یا کافه',
    icon: RiRestaurantLine,
  },
  {
    label: 'اقامتگاه',
    icon: RiHome3Line,
  },
  {
    label: 'مرکز تفریحی',
    icon: RiShipLine,
  },
  {
    label: 'جاذبه‌دیدنی',
    icon: RiChatQuoteLine,
  },
];
export const CafeTags = ['قلیان', 'اینترنت رایگان', 'بالکن'];
export const DidaniTags = ['دارای سرویس بهداشتی', 'کافی شاپ یا رستوران'];
