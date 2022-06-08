import { createState, State, useState } from '@hookstate/core';
import { INewCard } from '../interfaces/interfaces';

// Internal variables
const newCardState = createState<INewCard>({
  driverId: undefined,
  addressId: undefined,
  addressName: undefined,
  vehicleName: undefined,
  vehicleLicensePlate: undefined,
  duration: undefined,
  cost: undefined,
});
const wrapState = (s: State<INewCard>) => ({
  newCard: s.value,
  setDriverId: (value: number) =>
    s.set((prev) => ({ ...prev, driverId: value })),
});

export const useNewCard = () => wrapState(useState(newCardState));
