import { QuickButtonTypes } from 'src/store/types';
import './styles.scss';



function QuickButton(props) {
  return (
    <button className="quick-button" onClick={(event) => props.onQuickButtonClicked(event, props.button.value)}>
      {props.button.label}
    </button>
  );
}

export default QuickButton;
