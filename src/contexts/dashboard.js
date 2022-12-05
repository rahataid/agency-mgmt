import { DashboardService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  summary: {},
  mapData: [],
  genderDistribution: [],
  bankedUnbanked: [],
  phoneOwnership: [],
  beneficiariesByWard: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  getSummary: () => {},
  getGeoMapData: () => {},
  getGenderDistribution: () => {},
  getBankedUnbanked: () => {},
  getPhoneOwnership: () => {},
  getBeneficiariesByWard: () => {},
};

const DashboardContext = createContext(initialState);

export const DashboardProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getSummary = useCallback(async () => {
    const response = await DashboardService.getBeneficiarySummary();
    setState((prev) => ({
      ...prev,
      summary: response.data,
    }));
    return response.data;
  }, []);

  const getGeoMapData = useCallback(async () => {
    const response = await DashboardService.getGeoMapData();
    setState((prev) => ({
      ...prev,
      mapData: response.data,
    }));
    return response.data;
  }, []);

  const getGenderDistribution = useCallback(async () => {
    const response = await DashboardService.getGenderDistribution();
    const formatted = response.data.map((item) => ({
      label: item._id,
      value: +item.count,
    }));
    setState((prev) => ({
      ...prev,
      genderDistribution: formatted,
    }));
    return response.data;
  }, []);

  const getBankedUnbanked = useCallback(async () => {
    const response = await DashboardService.getBankedUnbanked();
    const formatted = response.data.map((item) => ({
      label: item._id ? 'Banked' : 'Unbanked',
      value: +item.count,
    }));

    setState((prev) => ({
      ...prev,
      bankedUnbanked: formatted,
    }));
    return response.data;
  }, []);

  const getPhoneOwnership = useCallback(async () => {
    const response = await DashboardService.getPhoneOwnership();
    const formatted = response.data.map((item) => ({
      label: item._id ? 'Phone' : 'No Phone',
      value: +item.count,
    }));

    setState((prev) => ({
      ...prev,
      phoneOwnership: formatted,
    }));
    return response.data;
  }, []);

  const getBeneficiariesByWard = useCallback(async () => {
    const response = await DashboardService.getBeneficiariesByWard();
    const sorted = response.data.sort((a, b) => a._id - b._id);
    const chartData = sorted.map((item) => item.count);
    const chartLabel = sorted.map((item) => item._id);

    setState((prev) => ({
      ...prev,
      beneficiariesByWard: {
        chartLabel,
        chartData: [
          {
            data: chartData,
            name: 'Beneficiaries',
          },
        ],
      },
    }));
    return response.data;
  }, []);

  const contextValue = {
    ...state,
    getSummary,
    getGeoMapData,
    getGenderDistribution,
    getBankedUnbanked,
    getPhoneOwnership,
    getBeneficiariesByWard,
  };

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardContext');
  }
  return context;
};
