interface RootObject {
  countryCode: string;
  countryName: string;
  cityCode: string;
  cityName: string;
  airports: Airport[];
}

interface Airport {
  airportCode: string;
  airportName: string;
  latitude: number;
  longitude: number;
}
