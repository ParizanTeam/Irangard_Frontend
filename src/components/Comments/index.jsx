import React, { useState } from 'react';
import Button from '../Button';
import TextArea from '../TextArea';
import Comment from '../Comment';
import './style.scss';

function Comments() {
  const [body, setBody] = useState('');
  const demo = {
    text: 'سلام وقت بخیر سفرنامه بسیار زیبا ، دقیق شما را خواندم و از آن بسیار لذت بردم چقدر نگارش روان و خودمانی داشتید و اتفاقات سفر را از دریچه دید شنا کاملا حس کردم امیدوارم همواره موفق و پایدار باشید و باز هم مطالب متنوع و جدید از شما بخونیم',
    name: 'فرناز رضایی',
    image: 'https://last-cdn.com/v1/avatars/2019/07/12/fWwvzJ3ZZUymW4PpDpvcscogmI1MXQ7JaRh88sAN.jpeg',
    time: '07 اردیبهشت 1401',
  };
  return (
    <div className="comments">
      <h2 className="comments__title">افزودن نظر</h2>
      <form>
        <TextArea placeholder="متن نظر..." label="متن نظر:" value={body} onChange={e => setBody(e.target.value)} />
        <Button className="comments__send-btn">
          ارسال نظر
        </Button>
      </form>
      <h2 className="comments__title">نظرات کاربران</h2>
      <div className="comments__list">
        {new Array(10).fill(null).map((_, index) => (
          <Comment key={index} comment={demo} />
        ))}
      </div>
    </div>
  );
}

export default Comments;
