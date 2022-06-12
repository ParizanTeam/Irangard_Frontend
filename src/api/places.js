import { useMutation } from 'react-query';
import apiInstance from 'src/config/axios';


export const useAddPlace = () => useMutation(placeData => apiInstance.post(`/places/`, placeData));


