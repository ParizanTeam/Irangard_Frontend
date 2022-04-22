import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { baseUrl } from '../utils/constants';
import defaultProfileImg from '../assets/images/profile.jpeg';

export const useGetProfile = username =>
  useQuery('getProfile', () =>
    axios
      .get(`${baseUrl}/accounts/profile/${username}`)
      .then(res => res.data)
      .then(data => {
        const { followers = 0, followings = 0, full_name = '', email = '', username = '', about_me = '' } = data;
        const profileImg = data?.image ? `${baseUrl}${data.image}` : defaultProfileImg;
        return {
          followers,
          followings,
          full_name,
          email,
          username,
          about_me,
          profileImg,
        };
      })
  );

export const usePutProfile = async (username, body, onError, onSuccess) => {
  try {
    const res = await axios.put(`${baseUrl}/accounts/profile/${username}/`, body);
    const data = await res.data;
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};
