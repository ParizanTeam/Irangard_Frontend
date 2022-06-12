import React from 'react';
import Header from 'src/components/Header';
import { Chip } from '@mui/material';
import { RiRestaurantLine, RiHome3Line, RiChatQuoteLine, RiShipLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import Layout from 'src/components/Layout';
import HotelForm from './Hotels';
import DidaniForm from './Didani';
import CafeForm from './cafe';
import AddPlaceCommonForm from './Common';
import TafrihiForm from './Tafrihi';
import { useAddPlace } from 'src/api/places';
import useAuth from 'src/context/AuthContext';
import './style.scss';

const StarterSection = ({ place, setPlace }) => {
  return (
    <div className="starter-section">
      <div className="title">
        <h2>اضافه‌کردن مکان جدید به ایرانگرد</h2>
      </div>

      <div className="description">
        <h5>مرسی که تصمیم گرفتی بهمون کمک کنی مکان جدید به ‌ایرانگرد اضافه بشه. برای شروع بهون یکمی درمورد مکان بگو</h5>
      </div>

      <div className="question" dir="ltr">
        <h3>مکان ات چه جور جایی هست؟</h3>
        <div className="options">
          <span className={place == 0 && 'active-chip'}>
            <Chip
              onClick={() => setPlace(0)}
              icon={<RiRestaurantLine size={24} />}
              label="رستوران‌‌ یا کافه"
              variant="outlined"
            />
          </span>
          <span className={place == 1 && 'active-chip'}>
            <Chip onClick={() => setPlace(1)} icon={<RiHome3Line size={24} />} label="اقامتگاه" variant="outlined" />
          </span>
          <span className={place == 2 && 'active-chip'}>
            <Chip onClick={() => setPlace(2)} icon={<RiShipLine size={24} />} label="مرکز تفریحی" variant="outlined" />
          </span>
          <span className={place == 3 && 'active-chip'}>
            <Chip
              onClick={() => setPlace(3)}
              icon={<RiChatQuoteLine size={24} />}
              label="جاذبه‌دیدنی"
              variant="outlined"
            />
          </span>
        </div>
      </div>
    </div>
  );
};
export default function AddPlaces() {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return (
      <Layout title="اضافه کردن مکان جدید">
        <div className="add-place__no-auth">
          <p>برای اضافه کردن مکان ابتدا باید وارد شوید.</p>
        </div>
      </Layout>
    );
  }

  const [place, setPlace] = React.useState(null);
  const [moreInfo, setMoreInfo] = React.useState(false);

  const methods = useForm({ shouldUseNativeValidation: true, defaultValues: { state: '', city: '' } });
  const { mutateAsync, isLoading } = useAddPlace();

  const apiAdaptor = placeData => {
    console.log('placeData', placeData);
    const contact = {
      x_location: placeData.latitude,
      y_location: placeData.longitude,
      province: placeData.state.label,
      city: placeData.city.label,
      address: placeData.street,
      phone: placeData.phone,
      email: placeData.email,
      website: placeData.website,
    };
    const tags = placeData.tags.map(x => {
      return { name: x };
    });
    return {
      title: placeData.name,
      place_type: place,
      description: placeData.description,
      contact: contact,
      tags: tags,
      rate: placeData.rate
      // images: [{}],
      // is_free: true,
      // features: [
      //   {
      //     place: 0,
      //     title: 'string',
      //   },
      // ],
      // rooms: [
      //   {
      //     place: 0,
      //     room_type: 'string',
      //     capacity: 0,
      //     price: 0,
      //   },
      // ]
    };
  };
  const onSubmit = placeData => {
    toast.promise(mutateAsync(apiAdaptor(placeData)), {
      loading: 'در حال بررسی...',
      success: res => {
        return 'مکان با موفقیت اضافه شد.';
      },
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
      },
    });
  };

  const placeForms = {
    0: CafeForm,
    1: HotelForm,
    2: TafrihiForm,
    3: DidaniForm,
  };
  const PlaceForm = placeForms[place];
  return (
    <div className="main add-place">
      <Header />

      {place == null ? (
        <StarterSection place={place} setPlace={setPlace} />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {!moreInfo ? (
              <div>
                <AddPlaceCommonForm setMoreInfo={setMoreInfo} />
              </div>
            ) : (
              <PlaceForm />
            )}
          </form>
        </FormProvider>
      )}
    </div>
  );
}
