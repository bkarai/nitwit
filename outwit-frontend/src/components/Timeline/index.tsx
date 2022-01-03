import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { VALUES_MAP } from './consts';
import { TimelineProps } from "./interface";

const steps = VALUES_MAP.map((e) => e.value);

export default function Timeline({ position }: TimelineProps) {
  const activeStep = VALUES_MAP.findIndex((step) => step.key === position);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
