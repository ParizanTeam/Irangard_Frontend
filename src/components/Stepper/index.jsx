import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector from '@mui/material/StepConnector';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import './style.scss';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function StepIcon(props) {
  const { active, completed, Icon } = props;

  return (
    <div className="icon-container">
      <span className="wrapper">
        <Icon className={`icon ${active ? 'active' : ''} ${completed ? 'completed' : ''}`} />

        {completed && (
          <div className="overlay-icon">
            <Check className="completed-icon" />
          </div>
        )}
      </span>
    </div>
  );
}

export default function LinearSteppers(props) {
  const { steps, activeStep } = props;
  return (
    <div className="steppers">
      <CacheProvider value={cacheRtl}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnector className="step-connector" />}>
          {steps.map((s, i) => (
            <Step key={s.label}>
              <StepLabel StepIconComponent={StepIcon} StepIconProps={{ Icon: s.icon }}>
                {s.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </CacheProvider>
    </div>
  );
}
