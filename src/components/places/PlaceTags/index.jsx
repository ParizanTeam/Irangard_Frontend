import React from 'react';
import './style.scss';

// const tags = ['چای', 'موسیقی زنده', 'قلیان', 'اینترنت رایگان', 'دستشویی', 'سالن غذاخوری'];
const PlaceTags = ({ tags }) => {
  return (
    <div className="place-tags">
      <div className="place-tags__title">تگ‌ها</div>
      <div className="place-tags__tags">
        {tags.map(tag => (
          <div key={tag.name} className="place-tags__tag">
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceTags;
