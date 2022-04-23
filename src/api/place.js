import axios from 'axios';
import { useQuery } from 'react-query';
import { baseUrl } from '../utils/constants';

export const useGetPlace = id =>
  useQuery('getPlace', () => axios.get(`${baseUrl}/places/${id}/`).then(res => res.data));
