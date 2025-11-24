export enum Atoll {
  SouthMale = 'South Malé(South Kaafu)',
  NorthMale = 'North Malé(North Kaafu)',
  Vaavu = 'Vaavu',
  NorthAri = 'North Ari (Alif Alif)',
  SouthAri = 'South Ari (Alif Dhaalu)',
  Baa = 'Baa',
}

export enum TransferType {
  SpeedboatUnder1H = 'Speedboat (<1h)',
  Speedboat1To2H = 'Speedboat (1-2h)',
  Speedboat2To3H = 'Speedboat (2-3h)',
  DomesticFlight = 'Domestic Flight',
  DomesticFlightSpeedboat = 'Domestic Flight + Speedboat',
}

export enum FerryAccess {
  Direct = 'Direct Public Ferry',
  Transfer = 'Transfer Required',
  None = 'No Public Ferry',
}

export enum IslandSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export enum Atmosphere {
  Lively = 'Lively',
  Quiet = 'Quiet',
  Local = 'Local',
}

export enum Accommodation {
  AffordableLuxury = 'Affordable Luxury',
  Pool = 'Pool',
  Spa = 'Spa',
}

export enum BikiniBeach {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export enum Watersports {
  Minimal = 'Minimal',
  Moderate = 'Moderate',
  Extensive = 'Extensive',
}

export enum MarineActivity {
  NurseSharks = 'Nurse Sharks',
  MantaRays = 'Manta Rays',
  WhaleSharks = 'Whale Sharks',
  Turtles = 'Turtles',
  Dolphins = 'Dolphins',
  SandbankTours = 'Sandbank Tours',
  HouseReef = 'House Reef',
}

export enum JungleVegetation {
  Minimal = 'Minimal',
  Medium = 'Medium',
  Large = 'Large',
}

export enum Nightlife {
  Minimal = 'Minimal',
  Moderate = 'Moderate',
  Lively = 'Lively',
}

export interface Island {
  id: string;
  name: string;
  atoll: Atoll;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  travelGuideUrl?: string;
  dimensions: string;
  guestHouseCount: number;
  transferTypes: TransferType[];
  ferryAccess: FerryAccess;
  size: IslandSize;
  atmosphere: Atmosphere[];
  accommodations: Accommodation[];
  bikiniBeach: BikiniBeach;
  watersports: Watersports;
  marineActivities: MarineActivity[];
  seasonalActivities: MarineActivity[];
  jungle: JungleVegetation;
  nightlife: Nightlife;
  hasSandbankAttached: boolean;
  isSandbankSeasonal: boolean;
  hasFloatingBar: boolean;
}
