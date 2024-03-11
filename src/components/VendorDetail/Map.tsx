import { Box, useColorMode, useToken } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Vendor } from '@/interfaces/vendor';
import { loadMapKit } from '@/utils/mapkit';

interface MapProps {
  onRegionChangeEnd: (e: mapkit.EventBase<mapkit.Map>) => void;
  center?: {
    latitude: number;
    longitude: number;
  };
  vendors?: Vendor[];
  onAnnotationFocus?: (vendorId: string) => void;
}

const Map: React.FC<MapProps> = ({ onRegionChangeEnd, center, onAnnotationFocus, vendors }) => {
  const exists = useRef<boolean>(false);
  const [map, setMap] = useState<mapkit.Map | null>(null);
  const mapElement = useRef<HTMLDivElement | null>(null);

  const color = useToken('colors', 'pink.400');

  const { colorMode } = useColorMode();

  useEffect(() => {
    loadMapKit().then(() => {
      if (exists.current) return;
      const newMap = new mapkit.Map(mapElement.current!, {
        region: new mapkit.CoordinateRegion(
          new mapkit.Coordinate(50.0755, 14.4378),
          new mapkit.CoordinateSpan(0.1, 0.1)
        ),
      });
      setMap(newMap);
      exists.current = true;
    });
    return () => {
      if (map) {
        map.destroy();
        exists.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = useCallback(
    (e: any) => {
      const annotation = e.annotation as mapkit.Annotation;
      if (annotation.data && onAnnotationFocus) {
        console.log('focusing', annotation.data.id);
        onAnnotationFocus(annotation.data.id);
      }
    },
    [onAnnotationFocus]
  );

  useEffect(() => {
    if (!map) return;
    map.colorScheme = colorMode === 'light' ? 'light' : 'dark';
  }, [colorMode, map]);

  useEffect(() => {
    if (!map) return;
    map.addEventListener('region-change-end', onRegionChangeEnd);
    map.addEventListener('select', onSelect);

    return () => {
      map.removeEventListener('region-change-end', onRegionChangeEnd);
      map.removeEventListener('select', onSelect);
    };
  }, [map, onAnnotationFocus, onRegionChangeEnd, onSelect]);

  useEffect(() => {
    if (!map) return;
    if (vendors) {
      console.time('annotations');
      const existing = map.annotations;
      const newIds = vendors.map((v) => v.id);
      const toRemove = existing.map((a) => {
        if (a.data && newIds.includes(a.data.id)) return null;
        return a;
      });
      const toAdd = vendors.filter(
        (v) => !existing.find((a) => a.data && a.data.id === v.id)
      );
      console.log({ toRemove, toAdd });
      map.removeAnnotations(toRemove.filter(Boolean) as mapkit.Annotation[]);
      toAdd.forEach((vendor) => {
        if (!vendor.location) return;
        const annotation = new mapkit.MarkerAnnotation(
          new mapkit.Coordinate(
            vendor.location.latitude,
            vendor.location.longitude
          ),
          {
            title: vendor.name,
            color,
            clusteringIdentifier: 'vendor',
            data: {
              id: vendor.id,
            },
          }
        );
        map.addAnnotation(annotation);
        console.timeEnd('annotations');
      });
    }
  }, [color, map, vendors]);

  useEffect(() => {
    console.log('resetting center');
    if (center)
      map?.setCenterAnimated(
        new mapkit.Coordinate(center.latitude, center.longitude)
      );
  }, [center, map]);

  return <Box ref={mapElement} w="full" h="full" pos="relative"></Box>;
}

export default Map;