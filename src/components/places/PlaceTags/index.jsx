import React from 'react';
import './style.scss';

const tags = ['چای', 'موسیقی زنده', 'قلیان', 'اینترنت رایگان', 'دستشویی', 'سالن غذاخوری'];
const PlaceTags = () => {
  return (
    <div className="place-tags">
      <div className="place-tags__title">تگ‌ها</div>
      <div className="place-tags__tags">
        {tags.map(tag => (
          <div key={tag} className="place-tags__tag">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceTags;
