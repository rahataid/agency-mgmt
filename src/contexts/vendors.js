import { VendorService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  vendors: [],
  singleVendor: {},
  chainData: {},
  refresh: false,
  getVendorsList: () => {},
  getVendorById: () => {},
  setChainData: () => {},
  refreshData: () => {},
};

const VendorsContext = createContext(initialState);

export const VendorProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const getVendorsList = useCallback(async (params) => {
    const response = await VendorService.getVendorsList(params);

    const formatted = response.data?.data?.data?.map((item) => ({
      ...item,

      id: item?.id,
      registrationDate: item?.created_at,
      cashBalance: item?.cashBalance || 0,
      cashAllowance: item?.cashAllowance || 0,
      tokenBalance: item?.tokenBalance || 0,
    }));

    setState((prevState) => ({
      ...prevState,
      vendors: {
        data: formatted,
        start: response.data?.data?.start,
        limit: response.data?.data?.limit,
        totalPage: response.data?.data?.totalPage,
      },
    }));
    return formatted;
  }, []);

  const setChainData = useCallback((chainData) => {
    setState((prev) => ({
      ...prev,
      chainData,
    }));
  }, []);

  const getVendorById = useCallback(async (id) => {
    const response = await VendorService.getVendorById(id);

    const formatted = {
      ...response.data,
      email: response.data?.email || 'N/A',
      registrationDate: response.data?.created_at || 'N/A',
      pan: response.data?.pan || 'N/A',
      shopName: response.data?.shopName || 'N/A',
      projects: response.data?.projects || [],
    };

    setState((prev) => ({
      ...prev,
      singleVendor: formatted,
    }));
    return formatted;
  }, []);

  const contextValue = {
    ...state,
    refreshData,
    setChainData,
    getVendorsList,
    getVendorById,
  };

  return <VendorsContext.Provider value={contextValue}>{children}</VendorsContext.Provider>;
};

VendorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useVendorsContext = () => {
  const context = useContext(VendorsContext);
  if (!context) {
    throw new Error('useVendorsContext must be used within a VendorsContext');
  }
  return context;
};
