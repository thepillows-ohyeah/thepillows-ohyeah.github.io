import { styled } from '@mui/system';
import { LinearProgress, Box, Typography } from '@mui/material';

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 24,
  backgroundColor: '#e9ecef'
}));
  
export function ProgressBarWithLabel({ value, size, color }) {
    return (
      <Box position="relative" width="100%">
        <CustomLinearProgress variant="determinate" value={Math.round((100 / 35) * value)} size={size} 
          sx={{ '& .MuiLinearProgress-bar': {
              backgroundColor: `${color}`
            }
          }} />
        <Box top={0} left={0} bottom={0} right={0} position="absolute"
          display="flex">
          <Typography sx={{ marginLeft: ".5rem", color: "#fff" }}>{`${value} years`}</Typography>
        </Box>
      </Box>
    );
}
