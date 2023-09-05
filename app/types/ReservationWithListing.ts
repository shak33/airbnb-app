import { Reservation, Listing } from '@prisma/client';

export type ReservationWithListing = Reservation & {
  listing: Listing;
};