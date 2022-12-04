import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import Web3Utils from '@utils/web3Utils';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatAdmin = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.ADMIN);
  const [agencyChainData, setAgencyChainData] = useState({});
  const handleError = (e) => console.log(e);

  return {
    contract,
    agencyChainData,

    sendToPalika: (projectId, amount) =>
      contract?.setProjectBudget_ERC20(contracts[CONTRACTS.RAHAT], projectId, amount).catch(handleError),

    async getCashBalances() {
      console.log('contract', contract);
      const agencyBalanceData = await contract
        ?.getAllowanceAndBalance(contracts[CONTRACTS.CASH], contracts[CONTRACTS.DONOR])
        .then()
        .catch(handleError);
      const data = {
        cashAllowance: agencyBalanceData?.allowance?.toNumber(),
        cashBalance: agencyBalanceData?.balance?.toNumber(),
      };
      setAgencyChainData((d) => ({
        ...d,
        ...data,
      }));
      return data;
    },

    async claimCash(amount) {
      await contract?.claimToken(contracts[CONTRACTS.CASH], contracts[CONTRACTS.DONOR], amount);
    },
  };
};