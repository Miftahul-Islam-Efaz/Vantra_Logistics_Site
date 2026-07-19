export type ContainerId = 'dry' | 'reefer' | 'opentop' | 'flatrack';

export interface ContainerType {
  id: ContainerId;
  tabLabel: string;
  title: string;
  desc1: string;
  desc2: string;
  specs: {
    length: string;
    width: string;
    height: string;
    payload: string;
    volume: string;
  };
}

export interface BookingFormData {
  name: string;
  email: string;
  count: number;
  notes: string;
}

export interface Booking {
  id: number;
  containerType: ContainerId;
  name: string;
  email: string;
  count: number;
  notes: string;
  date: string;
}
