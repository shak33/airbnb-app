import EmptyState from '@/app/components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';

import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    )
  }

  const listings = await getListings({
    userId: currentUser.id
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No trips"
        subtitle="You have no upcoming trips"
      />
    )
  }

  return (
    <PropertiesClient
      listings={listings}
      currentUser={currentUser}
    />
  )
}

export default PropertiesPage;