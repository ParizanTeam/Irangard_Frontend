import './style.scss';
import { styled } from '@mui/system';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const color = {
  50: '#83ffff',

  200: '#0d0b2e',

  400: '#cfddf3',
  500: '#0a1066',
  600: '#141852',
};

export const Tab = styled(TabUnstyled)`
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  height: 35px;
  padding: 8px 16px;
  margin: 6px 6px;
  border-style: groove;
  border-color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${color[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${color[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${color[50]};
    color: ${color[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-size: 0.875rem;
`;

export const TabsList = styled(TabsListUnstyled)`
  min-width: 200px;
  height: 50px;
  background-color: ${color[500]};
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  margin-right: 0.15px;
`;
