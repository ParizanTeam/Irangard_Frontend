// import { useSelector } from 'react-redux';

// import { GlobalState, QuickButtonTypes } from 'src/store/types';
// import { AnyFunction } from 'src/utils/types';

import './style.scss';



function QuickButtons(props) {
  // const buttons = useSelector((state) => state.quickButtons.quickButtons);

  // const getComponentToRender = (button) => {
  //   const ComponentToRender = button.component;
  //   return (
  //     <ComponentToRender
  //       onQuickButtonClicked={props.onQuickButtonClicked}
  //       button={button}
  //     />
  //   );
  // }

  // if (!buttons.length) return null;

  return (
    <div className="quick-buttons-container">
      {/* <ul className="quick-buttons">
        {buttons.map((button, index) =>
          <li className="quick-list-button" key={`${button.label}-${index}`}>
            {getComponentToRender(button)}
          </li>
          )
        }
      </ul> */}
    </div>
  );
}

export default QuickButtons;
