import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData, ...other }) {
  const { singleProject } = useProjectContext();
  return (
    <Card sx={{ width: '100%', mb: 1 }} {...other}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="h4">{singleProject?.name}</Typography>

          <Chip label={singleProject?.status?.toUpperCase()} />
          {/* <Chip label="DEFAULT PROJECT" /> */}
        </Stack>

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              {rahatChainData.totalBudget || 0}
            </Typography>
            <Typography variant="body2">Allocated Budget</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              {rahatChainData.tokenBalance || 0}
            </Typography>
            <Typography variant="body2">Remaining Balance</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
