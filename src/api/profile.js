import axios from 'axios';
import { useQuery } from 'react-query';
import { baseUrl } from '../utils/constants';
import defaultProfileImg from '../assets/images/profile.jpeg';

export const useGetProfile = username =>
  useQuery('getProfile', () => {
    const access_token = localStorage.getItem('access_token') || '';
    return axios
      .get(`${baseUrl}/accounts/profile/${username}`, {
        headers: {
          Authorization: 'JWT ' + access_token,
        },
      })
      .then(res => res.data)
      .then(data => {
        const {
          followers = 0,
          followings = 0,
          full_name = '',
          email = '',
          username = '',
          about_me = '',
          is_owner = false,
        } = data;
        const profileImg = data?.image ? `${baseUrl}${data.image}` : defaultProfileImg;
        return {
          followers,
          followings,
          full_name,
          email,
          username,
          about_me,
          profileImg,
          is_owner,
        };
      });
  });

export const usePutProfile = async (username, body, onError, onSuccess) => {
  try {
    const access_token = localStorage.getItem('access_token') || '';
    const res = await axios.put(`${baseUrl}/accounts/profile/${username}/`, body, {
      headers: {
        Authorization: 'JWT ' + access_token,
      },
    });
    const data = await res.data;
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};
