import { ContainerType } from './types';

export const CONTAINER_TYPES: ContainerType[] = [
  {
    id: 'dry',
    tabLabel: 'Standard Dry',
    title: 'TYPES OF CARGO CONTAINERS',
    desc1: 'The container is ideal for storing any cargo that does not require special storage conditions.',
    desc2: 'Its dimensions also allow the container to be used even for large-sized cargo, such as construction equipment.',
    specs: { length: '20ft / 40ft', width: '8ft', height: '8.6ft', payload: '28,200 kg', volume: '33.2 m³' }
  },
  {
    id: 'reefer',
    tabLabel: 'Refrigerated Reefer',
    title: 'REFRIGERATED CONTAINERS',
    desc1: 'Specially insulated containers equipped with an active cooling system to maintain precise interior temperatures.',
    desc2: 'Ideal for perishable foodstuffs, pharmaceutical products, chemical reagents, and climate-sensitive electronics.',
    specs: { length: '20ft / 40ft', width: '8ft', height: '8.6ft', payload: '26,500 kg', volume: '28.4 m³' }
  },
  {
    id: 'opentop',
    tabLabel: 'Open Top',
    title: 'OPEN TOP CONTAINERS',
    desc1: 'Equipped with a removable heavy-duty flexible tarpaulin roof rather than a rigid steel ceiling.',
    desc2: 'Designed specifically for overhead loading of heavy or awkwardly tall goods, such as large engines or structural glass.',
    specs: { length: '20ft / 40ft', width: '8ft', height: '8.6ft', payload: '28,100 kg', volume: '32.8 m³' }
  },
  {
    id: 'flatrack',
    tabLabel: 'Flat Rack',
    title: 'FLAT RACK CONTAINERS',
    desc1: 'Featuring collapsible end-walls that fold completely down to accommodate wide or non-standard cargo shapes.',
    desc2: 'Perfect for bulk machinery, yachts, structural timber, industrial pipes, and oversized military vehicles.',
    specs: { length: '20ft / 40ft', width: '8ft', height: '8.5ft', payload: '31,200 kg', volume: 'Flexible' }
  }
];
