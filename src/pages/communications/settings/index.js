/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { CommunicationsProvider } from '@contexts/communications';
import { CommunicationSettings } from '@sections/communications/settings';

const PAGE_TITLE = 'Communications: Settings';

export default function CommunicationsList() {
  const { themeStretch } = useSettingsContext();

  return (
    <CommunicationsProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CommunicationSettings />
        </Container>
      </Page>
    </CommunicationsProvider>
  );
}

CommunicationsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
