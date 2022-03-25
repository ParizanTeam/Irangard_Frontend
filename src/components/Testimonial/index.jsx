import React, { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './styles.scss';

const data = [
  {
    id: 0,
    text: 'استفاده از ایرانگرد واقعا برای من لذت‌بخشه. تقریبا هر روز ازش استفاده می‌کنم و با دیدن تجربه‌ها و سفرنامه‌ها، خودم رو توی مکان‌های مختلف متصور میشم.',
    author: 'کاربر افشار',
  },
  {
    id: 1,
    text: 'من معمولا زیاد سفر می‌کنم و هر بار که میخوام برم سفر، با ایرانگرد جاذبه‌های گردشگری مقصدم رو بررسی می‌کنم و با توجه به پیشنهاد‌ها و توصیه‌های افراد، برنامه سفرم رو تنظیم می‌کنم.',
    author: 'کاربر فراهانی',
  },
  {
    id: 2,
    text: 'واقعا تبریک می‌گم به تیم عالی و خوش‌ذوق ایرانگرد که یه خوبی مکلن‌های مختلف رو معرفی می‌کنند و تجربه کاربری فوق‌العاده‌ای رو برای کاربر فراهم می‌کنن.',
    author: 'کاربر طاهریان',
  },
  {
    id: 3,
    text: 'ویژگی‌ها و قابلیت‌هایی که ایرانگرد در اختیار آدم قرار میده، واقعا شگفت‌انگیزه. به هر کسی که میخواد بره سفر، حتما توصیه می‌کنم.',
    author: 'کاربر علیپور',
  },
  {
    id: 4,
    text: 'من همیشه دغدغه زیادی برای انتخاب رستورن‌ها، اقامتگاه‌ها و ... داشتم و از وقتی که از ایرانگرد استفاده می‌کنم، خیالم راحت شده.',
    author: 'کاربر رشیدی',
  },
];
const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const rightBtn = () => {
    const parent = document.querySelector('.testimonials__cards-container');
    const frontCard = document.getElementById(data[index].id);
    document.getElementById(data[index].id).remove();
    parent.append(frontCard);
    const newIndex = (index + 1) % data.length;
    setIndex(newIndex);
  };

  const leftBtn = () => {
    const parent = document.querySelector('.testimonials__cards-container');
    const child = document.getElementById(data[(index + data.length - 1) % data.length].id);
    parent.insertBefore(child, parent.firstChild);
    const newIndex = (index + data.length - 1) % data.length;
    setIndex(newIndex);
  };
  return (
    <div className="testimonials">
      <div className="testimonials__container">
        <h2 className="testimonials__title">درباره ایرانگرد چه می‌گویند:</h2>
        <div className="background-everything">
          <div className="testimonials__cards-container">
            {data.map(card => (
              <div className="testimonials__card" key={card.id} id={card.id}>
                <div>
                  <p className="testimonials__card-description">{card.text}</p>
                  <h6 className="testimonials__card-author">{card.author}</h6>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials__buttons-wrapper">
            <div className="testimonials__buttons" onClick={rightBtn}>
              بعدی
              <KeyboardBackspaceIcon className="testimonials__next-btn" />
            </div>
            <div className="testimonials__buttons" onClick={leftBtn}>
              <KeyboardBackspaceIcon className="testimonials__prev-btn" />
              قبلی
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
