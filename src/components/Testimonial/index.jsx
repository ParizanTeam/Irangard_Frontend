import { useState } from 'react';
import './style.scss';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const data = [
  {
    id: 0,
    text: 'استفاده از ایرانگرد واقعا برای من لذت‌بخشه. تقریبا هر روز ازش استفاده می‌کنم و با دیدن تجربه‌ها و سفرنامه‌ها، خودم رو توی مکان‌های مختلف متصور میشم.',
    author: 'کاربر افشار',
    image: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    id: 1,
    text: 'من معمولا زیاد سفر می‌کنم و هر بار که میخوام برم سفر، با ایرانگرد جاذبه‌های گردشگری مقصدم رو بررسی می‌کنم و با توجه به پیشنهاد‌ها و توصیه‌های افراد، برنامه سفرم رو تنظیم می‌کنم.',
    author: 'کاربر فراهانی',
    image: 'https://randomuser.me/api/portraits/women/81.jpg',
  },
  {
    id: 2,
    text: 'واقعا تبریک می‌گم به تیم عالی و خوش‌ذوق ایرانگرد که یه خوبی مکلن‌های مختلف رو معرفی می‌کنند و تجربه کاربری فوق‌العاده‌ای رو برای کاربر فراهم می‌کنن.',
    author: 'کاربر طاهریان',
    image: 'https://randomuser.me/api/portraits/men/51.jpg',
  },
  {
    id: 3,
    text: 'ویژگی‌ها و قابلیت‌هایی که ایرانگرد در اختیار آدم قرار میده، واقعا شگفت‌انگیزه. به هر کسی که میخواد بره سفر، حتما توصیه می‌کنم.',
    author: 'کاربر علیپور',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  // {
  //   id: 4,
  //   text: 'من همیشه دغدغه زیادی برای انتخاب رستورن‌ها، اقامتگاه‌ها و ... داشتم و از وقتی که از ایرانگرد استفاده می‌کنم، خیالم راحت شده.',
  //   author: 'کاربر رشیدی',
  //   image: "https://randomuser.me/api/portraits/women/13.jpg"

  // },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const [defualtImage, setDefualtImage] = useState('https://randomuser.me/api/portraits/men/44.jpg');

  const rightBtn = () => {
    const newIndex = (index + 1) % data.length;
    const parent = document.querySelector('.testimonials__cards-container');
    const child = document.getElementById('testimonial-card=' + data[newIndex].id);
    parent.insertBefore(child, parent.firstChild);

    document.getElementById('testimonial-image' + data[index].id).style.transform = 'scale(1)';
    document.getElementById('testimonial-image' + data[newIndex].id).style.transform = 'scale(1.5)';
    setDefualtImage(data[newIndex].image);

    setIndex(newIndex);
  };

  const leftBtn = () => {
    var newIndex = index - 1;
    const parent = document.querySelector('.testimonials__cards-container');
    const child = document.getElementById('testimonial-card=' + data[newIndex].id);
    parent.insertBefore(child, parent.firstChild);

    document.getElementById('testimonial-image' + data[index].id).style.transform = 'scale(1)';
    document.getElementById('testimonial-image' + data[newIndex].id).style.transform = 'scale(1.5)';
    setDefualtImage(data[newIndex].image);

    setIndex(newIndex);
  };

  const imageClick = idx => {
    const parent = document.querySelector('.testimonials__cards-container');
    const child = document.getElementById('testimonial-card=' + data[idx].id);
    parent.insertBefore(child, parent.firstChild);

    document.getElementById('testimonial-image' + data[index].id).style.transform = 'scale(1)';
    document.getElementById('testimonial-image' + data[idx].id).style.transform = 'scale(1.5)';
    setDefualtImage(data[idx].image);

    setIndex(idx);
  };
  return (
    <div className="testimonials">
      <div className="testimonials__container">
        <h2 className="testimonials__title">درباره ایرانگرد چه می‌گویند:</h2>

        <div className="testimonials__desktop">
          {data.map(c => (
            <img
              className="testimonials__card-image"
              onClick={() => imageClick(c.id)}
              src={c.image}
              id={'testimonial-image' + c.id}
            />
          ))}
        </div>

        <div className="testimonials__mobile">
          <img className="testimonials__card-image testimonials__m-card-image" src={defualtImage} />
        </div>

        <div className="testimonials__cards-container">
          {data.map(card => (
            <div className="__card" key={'testimonial-card=' + card.id} id={'testimonial-card=' + card.id}>
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
  );
};

export default Testimonial;
