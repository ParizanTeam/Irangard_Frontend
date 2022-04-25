import axios from 'axios';
import { useMutation } from 'react-query';
import { baseUrl } from '../utils/constants';

export const useAddPlace = () => useMutation(placeData => axios.post(`${baseUrl}/places/`, placeData));


