import React, { useEffect, useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import Layout from 'src/components/Layout';
import { EnhancedStepper as Stepper } from 'src/components/Stepper';
import { useAddPlace } from 'src/api/places';
import useAuth from 'src/context/AuthContext';
import { BaseInfoSection, MapSection, ContactSection, MoreInfoSection } from './Sections';
import { AddPlaceSteps as steps } from './info';
import './style.scss';

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
  const methods = useForm({
    defaultValues: {
      activeStep: 0,
      placeType: -1,
      name: '',
      description: '',
      state: '',
      city: '',
      longitude: '',
      latitude: '',
    },
  });
  const placeType = methods.watch('placeType');
  const activeStep = methods.watch('activeStep');
  const [preStep, setPreStep] = useState(activeStep);

  const stepsRef = useRef(null);
  useEffect(async () => {
    const stepFields = steps[preStep].fields;
    const isOkay = await methods.trigger(stepFields);
    steps[preStep]['error'] = !isOkay;
    setPreStep(activeStep);
  }, [activeStep]);

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      methods.trigger(name);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const { mutateAsync, isLoading } = useAddPlace();

  function filterNullValues(dict) {
    const filtered = Object.keys(dict).reduce(function (filtered, key) {
      if (dict[key]) filtered[key] = dict[key];
      return filtered;
    }, {});
    return filtered;
  }
  const apiAdaptor = placeData => {
    console.log('placeData', placeData);
    const contact = filterNullValues({
      x_location: placeData.latitude,
      y_location: placeData.longitude,
      province: placeData.state.label,
      city: placeData.city.label,
      address: placeData.street,
      phone: placeData.phone,
      email: placeData.email,
      website: placeData.website,
    });
    const tags = placeData.tags?.map(x => {
      return { name: x };
    });

    const formatedData = {
      title: placeData.name,
      place_type: placeData.placeType,
      description: placeData.description,
      contact: contact,
      tags: tags,
    };

    return filterNullValues(formatedData);
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

  const AddPlaceSections = [BaseInfoSection, MapSection, ContactSection, MoreInfoSection];
  const AddPlaceSection = AddPlaceSections[preStep];
  return (
    <Layout title="اضافه کردن مکان جدید">
      <div className="add-place">
        <FormProvider {...methods}>
          {placeType >= 0 && (
            <Stepper
              ref={stepsRef}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={s => methods.setValue('activeStep', s)}
            />
          )}
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="add-place__section">
              <AddPlaceSection />
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
}
