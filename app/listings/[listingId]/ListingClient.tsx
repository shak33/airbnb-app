'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { Reservation, Listing, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import {eachDayOfInterval, differenceInCalendarDays} from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';

import useLoginModal from '@/app/hooks/useLoginModal';

import { categories } from '@/app/components/navbar/Categories/constants';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface ListingClientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User,
  };
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing, reservations= [], currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        // Redirect to /trips
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [totalPrice, dateRange, listing.id, router, currentUser, loginModal]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((item) =>
      item.label === listing.category
    );
  }, [listing.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      );

      if (daysCount && listing.price) {
        setTotalPrice(daysCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;