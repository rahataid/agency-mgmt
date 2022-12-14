import client from '@utils/client';

export const CommunicationsService = {
  getCommunicationsList(params) {
    return client.get('/communications', { params });
  },
  getCommunicationByBeneficiaryId(id) {
    return client.get(`/communications/beneficiary/${id}`);
  },
};
