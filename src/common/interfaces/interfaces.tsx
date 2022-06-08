export interface IDriver {
  id: number;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email: string;
  registeredOn: string;
  registeredWith: string;
  accumulatedTime: number;
  role: string;
}

export interface IAddress {
  id: number;
  name: string;
  occupied: number;
  available: number;
  position: [number, number];
}

export interface IVehicle {
  vehicleId: number;
  name: string;
  licensePlate: string;
}

export interface ICard {
  id: number;
  driverId: number;
  addressId: number;
  addressName: string;
  vehicleName: string;
  vehicleLicensePlate: string;
  cost: number;
  duration: number;
  startsAt: string;
  expiresAt: string;
}

export interface IInactiveCard {
  id: number;
  driverId: number;
  addressId: number;
  addressName: string;
  vehicleName: string;
  licensePlate: string;
  cost: number;
  duration: string;
  startsAt: string;
  expired: boolean;
  cancelled: boolean;
}

export interface INewCard {
  driverId: number | undefined;
  addressId: number | undefined;
  addressName: string | undefined;
  vehicleName: string | undefined;
  vehicleLicensePlate: string | undefined;
  cost: number | undefined;
  duration: number | undefined;
  startsAt?: string | undefined;
}

export interface IExtensionInfo {
  cardId: number;
  expiresAt: string;
  duration: number;
  price: number;
}
