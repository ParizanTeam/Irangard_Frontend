import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../Button';
import TextArea from '../TextArea';
import { formatDate } from '../../utils/formatters';
import { baseUrl } from '../../utils/constants';
import './style.scss';

function Comment({ comment, experienceId }) {
  const [showReply, setShowReply] = useState(false);
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState(comment.replies);

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
        `${baseUrl}/experiences/${experienceId}/comments/${comment.id}/reply/`,
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
        setReplies(old => [...old, data]);
        toast.success('نظر شما با موفقیت ثبت شد.');
        setBody('');
      })
      .catch(error => {
        console.log(error);
        toast.error('مشکلی در سامانه رخ داده‌است.');
      });
    setLoading(false);
  };

  return (
    <div className="comment-container">
      <Toaster />
      <div className="comment">
        <img className="comment__avatar" src={comment.user.image} alt={comment.user.username} />
        <div className="comment__info">
          <div className="comment__header">
            <div className="comment__name">{comment.user.username}</div>
            <div className="comment__time">{formatDate(comment.created_date)}</div>
          </div>
          <p className="comment__body">{comment.text}</p>
          <Button className="comment__reply" onClick={() => setShowReply(old => !old)}>
            پاسخ دهید
          </Button>
        </div>
      </div>
      {showReply && (
        <form onSubmit={handleAddComment}>
          <TextArea
            placeholder="متن نظر..."
            label="متن نظر:"
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
      )}
      {replies.length > 0 && (
        <div className="comment__replies">
          <div className="comment__replies-title">پاسخ‌ها:</div>
          {replies.map(reply => (
            <div className="comment">
              <img className="comment__avatar" src={reply.user.image} alt={reply.user.username} />
              <div className="comment__info">
                <div className="comment__header">
                  <div className="comment__name">{reply.user.username}</div>
                  <div className="comment__time">{formatDate(reply.created_date)}</div>
                </div>
                <p className="comment__body">{reply.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
