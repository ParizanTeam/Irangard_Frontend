import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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

export function LinearStepper(props) {
  const { steps, activeStep } = props;

  function StepIcon(props) {
    const { active, completed, Icon } = props;

    return (
      <div className="icon-container">
        <span className="wrapper">
          <Icon className={`icon ${active ? 'active' : ''} ${completed ? 'has-status' : ''}`} />
          {completed && (
            <div className="overlay-icon">
              <Check className="completed-icon" />
            </div>
          )}
        </span>
      </div>
    );
  }
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

export function EnhancedStepper(props) {
  const { steps, activeStep, setActiveStep, innerRef } = props;
  React.useEffect(() => {
    steps.forEach(s => {
      s.error=undefined;
    });
  }, []);
  function StepIcon(props) {
    const { active, error, Icon, hasViewed } = props;
    const isActive = active ? 'active' : '';
    const hasStatus = !active && !hasViewed ? 'has-status' : '';

    return (
      <div className="icon-container non-linear">
        <span className="wrapper">
          <Icon className={`icon ${isActive} ${hasStatus}`} />
          {!active && !hasViewed && (
            <div className="overlay-icon">
              {error ? <WarningAmberIcon className="warning-icon" /> : <Check className="completed-icon" />}
            </div>
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="steppers">
      <CacheProvider value={cacheRtl}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnector className="step-connector" />}>
          {steps.map((s, i) => {
            return (
              <Step key={s.label}>
                <StepLabel
                  StepIconComponent={StepIcon}
                  StepIconProps={{ Icon: s.icon, hasViewed: s?.error === undefined, error: s?.error }}
                  onClick={() => setActiveStep(i)}
                >
                  {s.label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </CacheProvider>
    </div>
  );
}
