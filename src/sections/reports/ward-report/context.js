import { createContext, useCallback, useContext, useState } from 'react';
import * as Service from './service';

const initialState = {
  wardChartData: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByGenderChart: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByClaim: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByLandOwnership: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByDisability: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  getTransactionsCountByWard: () => {},

  getWardGenderChart: (ward) => {},
  getWardClaimChart: (ward) => {},
  getWardLandOwnershipChart: (ward) => {},
  getWardDisabilityChart: (ward) => {},
};

const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getTransactionsCountByWard = useCallback(async () => {
    const response = await Service.getStackedWardGender();
    setState((prevState) => ({
      ...prevState,
      wardChartData: response.data.data,
    }));
  }, []);

  const getWardGenderChart = useCallback(async (ward) => {
    const response = await Service.groupGenderByWard(ward);
    // console.log('response', response);
    setState((prevState) => ({
      ...prevState,
      wardByGenderChart: response.data.data,
    }));
  }, []);

  const getWardClaimChart = useCallback(async (ward) => {
    const response = await Service.groupClaimByWard(ward);
    // console.log('response', response);
    setState((prevState) => ({
      ...prevState,
      wardByClaim: response.data.data,
    }));
  }, []);

  const getWardLandOwnershipChart = useCallback(async (ward) => {
    const response = await Service.groupWardByLandOwnership(ward);
    // console.log('response', response);
    setState((prevState) => ({
      ...prevState,
      wardByLandOwnership: response.data.data,
    }));
  }, []);
  const getWardDisabilityChart = useCallback(async (ward) => {
    const response = await Service.groupWardByDisability(ward);
    // console.log('response', response);
    setState((prevState) => ({
      ...prevState,
      wardByDisability: response.data.data,
    }));
  }, []);

  const contextValues = {
    ...state,
    getWardGenderChart,
    getTransactionsCountByWard,
    getWardClaimChart,
    getWardLandOwnershipChart,
    getWardDisabilityChart,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useModuleContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useModuleContext must be used within a ModuleContextProvider');
  }
  return context;
};