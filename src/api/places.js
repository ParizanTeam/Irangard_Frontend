import axios from 'axios';
import { useMutation } from 'react-query';
import { baseUrl } from '../utils/constants';

const token= localStorage.getItem('access-token')
const config = {
    headers: {
        Authorization: `JWT ${token}`,
    }
  }

export const useAddPlace = () => useMutation(placeData => axios.post(`${baseUrl}/places/`, placeData,config));


