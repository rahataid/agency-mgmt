import React, { useEffect, useCallback, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import { PalikaCash, DonorCash, AgencyCash } from '../cash-tracker';
import MoreInfoCard from './MoreInfoCard';
import ChartCard from './ChartCard';
import ViewTabs from './ViewTabs';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { useAuthContext } from 'src/auth/useAuthContext';
import ActivateResponse from './ActivateResponse';
import { useTheme } from '@mui/system';
import { SPACING } from '@config';

const ProjectView = () => {
  const { roles } = useAuthContext();
  const { getProjectById, refresh, refreshData } = useProjectContext();
  const { getProjectBalance, rahatChainData, contract } = useRahat();

  const {
    query: { projectId },
  } = useRouter();
  const theme = useTheme();

  const init = useCallback(async () => {
    await getProjectBalance(projectId);
  }, [projectId, contract, refresh]);

  useEffect(() => {
    if (!projectId) return;
    init(projectId);
    getProjectById(projectId);
  }, [init, projectId, getProjectById]);

  return (
    <>
      <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}>
        <Grid item xs={12} md={8}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <BasicInfoCard rahatChainData={rahatChainData} />
            <MoreInfoCard />
          </Grid>
          <Stack sx={{ mt: theme.spacing(SPACING.GRID_SPACING) }}>
            <ViewTabs />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          {roles.isPalika && (
            <PalikaCash
              projectId={projectId}
              rahatChainData={rahatChainData}
              refresh={refresh}
              refreshData={refreshData}
            />
          )}
          {roles.isAgency && <AgencyCash rahatChainData={rahatChainData} />}

          <ActivateResponse />

          <ChartCard />
          {/* <Grid item xs={12} md={4}> */}
          {/* </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
