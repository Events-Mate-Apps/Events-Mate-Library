export const getDefaultPoint = () => {
  return new mapkit.Coordinate(37.773972, -122.43129);
};

export const search = (
  query: string,
  options: mapkit.SearchConstructorOptions
): Promise<mapkit.SearchAutocompleteResult[]> => {
  return new Promise((resolve, reject) => {
    const search = new mapkit.Search({
      getsUserLocation: false,
      ...options,
    });
    search.autocomplete(query, (err, data) => {
      if (err) reject(err);
      resolve(
        data.results.filter(
          (a) => !a.displayLines.join(', ').includes('Search Nearby')
        )
      );
    });
  });
};

export const reverseGeoSearch = (
  coordinate: mapkit.Coordinate
): Promise<mapkit.GeocoderResponse> => {
  return new Promise((resolve, reject) => {
    const geocoder = new mapkit.Geocoder();
    geocoder.reverseLookup(coordinate, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
