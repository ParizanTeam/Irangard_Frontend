import './style.scss';
import HeaderImg from '../../assets/images/loginHead.jpg';
import HeaderImg2 from '../../assets/images/loginHead2.jpg';
const commonErrors = {
  required: 'این فیلد باید پر شود.',
};

export const ErrorMessage = ({ error }) => {
  console.log('error', error);

  let errorMsg = 'ارور';
  if (error.type in commonErrors) errorMsg = commonErrors[error.type];
  else errorMsg = error.message;
  return (
    <div className="error-msg">
      <p>{errorMsg}</p>
    </div>
  );
};
export const TabHeader = ({ title }) => {
  return (
    <div className="myHeader">
      <img src={HeaderImg} alt="Hello" className="HeaderImg" />
      <div className="tab-header-title"> {title}</div>
      <img src={HeaderImg2} alt="Hello" className="HeaderImg" />
    </div>
  );
};
