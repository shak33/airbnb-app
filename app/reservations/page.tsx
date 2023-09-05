import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="You must be signed in"
      subtitle="Please log in"
    />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return <EmptyState
      title="No reservations found"
      subtitle="Looks like you have no reservations for your properties"
    />;
  }

  return (
    <ReservationsClient
      currentUser={currentUser}
      reservations={reservations}
    />
  )
}

export default ReservationsPage;