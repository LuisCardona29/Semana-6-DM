import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type GeoCoords = {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
};

export type GeoPhoto = {
  id: string;
  uri: string;
  source: 'camera' | 'gallery';
  createdAt: string;
  coords: GeoCoords | null;
};

type GeoPhotosContextValue = {
  photos: GeoPhoto[];
  addPhoto: (photo: GeoPhoto) => void;
  removePhoto: (id: string) => void;
  clearAll: () => void;
};

const GeoPhotosContext = createContext<GeoPhotosContextValue | null>(null);

export function GeoPhotosProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<GeoPhoto[]>([]);

  const value = useMemo<GeoPhotosContextValue>(
    () => ({
      photos,
      addPhoto: (photo) => setPhotos((current) => [photo, ...current]),
      removePhoto: (id) => setPhotos((current) => current.filter((photo) => photo.id !== id)),
      clearAll: () => setPhotos([]),
    }),
    [photos],
  );

  return <GeoPhotosContext.Provider value={value}>{children}</GeoPhotosContext.Provider>;
}

export function useGeoPhotos() {
  const context = useContext(GeoPhotosContext);
  if (!context) {
    throw new Error('useGeoPhotos debe usarse dentro de GeoPhotosProvider');
  }
  return context;
}