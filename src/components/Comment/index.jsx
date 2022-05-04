import React, { useState } from 'react';
import Button from '../Button';
import TextArea from '../TextArea';
import { convertNumberToPersian } from '../../utils/formatters';
import './style.scss';

function Comment({ comment }) {
  const [showReply, setShowReply] = useState(false);
  const [body, setBody] = useState('');
  return (
    <div className="comment-container">
      <div className="comment">
        <img className="comment__avatar" src={comment.image} alt={comment.name} />
        <div className="comment__info">
          <div className="comment__header">
            <div className="comment__name">{comment.name}</div>
            <div className="comment__time">{convertNumberToPersian(comment.time)}</div>
          </div>
          <p className="comment__body">{comment.text}</p>
          <Button className="comment__reply" onClick={() => setShowReply(old => !old)}>
            پاسخ دهید
          </Button>
        </div>
      </div>
      {showReply && (
        <form>
          <TextArea placeholder="متن نظر..." label="متن نظر:" value={body} onChange={e => setBody(e.target.value)} />
          <Button className="comments__send-btn">ارسال نظر</Button>
        </form>
      )}
    </div>
  );
}

export default Comment;
