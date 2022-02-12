import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export enum TimelinePosition {
  GAME_CREATED,
  P1_JOINED,
  P2_JOINED,
  GAME_IN_PROGRESS,
  GAME_ENDED,
};

interface TimelineProps {
  position?: TimelinePosition;
};

const VALUES_MAP = [
  { key: TimelinePosition.GAME_CREATED, value: 'Game Created' },
  { key: TimelinePosition.P1_JOINED, value: 'You Joined' },
  { key: TimelinePosition.P2_JOINED, value: 'Opponent Joined' },
  { key: TimelinePosition.GAME_IN_PROGRESS, value: 'Game In Progress' },
  { key: TimelinePosition.GAME_ENDED, value: 'Game Ended' },
];

const steps = VALUES_MAP.map((e) => e.value);

export function Timeline({ position }: TimelineProps) {
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
