import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../Button';
import TextArea from '../TextArea';
import Comment from '../Comment';
import { baseUrl } from 'src/utils/constants';
import './style.scss';

function Comments({ experienceId }) {
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/experiences/${experienceId}/comments`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setComments(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleAddComment = async e => {
    e.preventDefault();
    if (body.trim() === '') {
      setBodyError('متن نظر نمی‌تواند خالی باشد.');
      return;
    }
    const token = localStorage.getItem('access-token');
    if (!token) {
      toast.error('برای ثبت نظر باید وارد شوید.');
      return;
    }
    setLoading(true);
    await axios
      .post(
        `${baseUrl}/experiences/${experienceId}/comments/`,
        {
          text: body,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      )
      .then(res => res.data)
      .then(data => {
        setComments(old => [data, ...old]);
        toast.success('نظر شما با موفقیت ثبت شد.');
      })
      .catch(error => {
        console.log(error);
        toast.error('مشکلی در سامانه رخ داده‌است.');
      });
    setLoading(false);
  };

  return (
    <div className="comments">
      <Toaster />
      <h2 className="comments__title">دیدگاهتان را بنویسید</h2>
      <form onSubmit={handleAddComment}>
        <TextArea
          placeholder="متن نظر..."
          // label="متن نظر:"
          value={body}
          onChange={e => {
            if (e.target.value.trim() !== '') {
              setBodyError('');
            }
            setBody(e.target.value);
          }}
          error={bodyError}
        />
        <Button className="comments__send-btn" type="submit" disabled={loading}>
          ارسال نظر
        </Button>
      </form>
      <h2 className="comments__title">نظرات کاربران</h2>
      {comments.length === 0 && <p className="comments__no-comment">نظری برای این تجربه ثبت نشده‌است.</p>}
      <div className="comments__list">
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} experienceId={experienceId} />
        ))}
      </div>
    </div>
  );
}

export default Comments;
