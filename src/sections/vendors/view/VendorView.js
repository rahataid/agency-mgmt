import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import MoreInfoCard from './MoreInfoCard';
import ProjectsInvolved from './ProjectsInvolved';
import { HistoryTable } from '@sections/transactionTable';
import { useVendorsContext } from '@contexts/vendors';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { useRahatCash } from '@services/contracts/useRahatCash';

const TRANSACTION_TABLE_HEADER_LIST = {
  timestamp: {
    id: 'timestamp',
    label: 'Date',
    align: 'left',
  },
  txHash: {
    id: 'txHash',
    label: 'Transaction Hash',
    align: 'left',
  },
  beneficiary: {
    id: 'beneficiary',
    label: 'Beneficiary',
    align: 'left',
  },
  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },
};

export default function VendorView() {
  const { getVendorById, setChainData, chainData, refreshData, refresh, getVendorEthBalance, vendorEthBalance } =
    useVendorsContext();
  const { vendorBalance, contract, claimLogs, getVendorClaimLogs } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();

  const {
    query: { vendorId },
  } = useRouter();
  // TODO: make dynamic
  //const { vendorTransactions, transactionLoading } = useVendorClaimLogs();
  // const { vendorTransactions, transactionLoading } = useExplorer(singleVendor?.wallet_address);

  const init = useCallback(async () => {
    if (!vendorId) return;
    const _vendorData = await getVendorById(vendorId);
    if (!_vendorData?.wallet_address) return;
    const _chainData = await vendorBalance(_vendorData?.wallet_address);
    await getVendorEthBalance(_vendorData?.wallet_address);

    setChainData(_chainData);
    await getVendorClaimLogs(_vendorData?.wallet_address);
  }, [vendorId, contract, refresh]);

  useEffect(() => {
    init();
    RahatCash?.on('Approval', refreshData);
    RahatCash?.on('Transfer', refreshData);
    return () => RahatCash?.removeAllListeners();
  }, [init, RahatCash]);

  return (
    <>
      {' '}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BasicInfoCard chainData={chainData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TokenDetails chainData={chainData} ethBalance={vendorEthBalance} />
        </Grid>
        {/* <Grid item xs={12} md={4}>
            <MoreInfoCard />
          </Grid> */}
      </Grid>
      <Stack>
        <MoreInfoCard />
      </Stack>
      <Stack sx={{ mt: 1 }}>
        <ProjectsInvolved />
      </Stack>
      <Stack sx={{ mt: 1 }}>
        <HistoryTable tableHeadersList={TRANSACTION_TABLE_HEADER_LIST} tableRowsList={claimLogs} />
      </Stack>
    </>
  );
}
