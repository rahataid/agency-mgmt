import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber } from '@utils/formatNumber';
import Iconify from './iconify';
// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  subtitle: PropTypes.string,
  sx: PropTypes.object,
  icon: PropTypes.string,
};

export default function SummaryCard({ title, total, subtitle, sx, icon, ...other }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {icon && <Iconify icon={icon} />}
          <Typography variant="caption1">{title}</Typography>
        </Stack>
        <Stack
          sx={{
            mt: 1,
            mb: 0.2,
            display: 'flex',
          }}
        >
          <Typography variant="h4">{fNumber(total)}</Typography>
        </Stack>
        <Stack
          sx={{
            mt: 1.5,
            mb: 0.5,
            display: 'flex',
          }}
        >
          <Typography variant="subtitle2">{subtitle}</Typography>
        </Stack>
      </Box>
    </Card>
  );
}
