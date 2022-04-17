import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";

interface Provider {
  [key: string]: any;
}

type TripsContextType = {
  trips: Provider | undefined;
  location: Provider | undefined;
  handleTrips: (value: object) => void;
  handleLocation: (value: object) => void;
};
const TripsContext = createContext<TripsContextType | null>(null);

const useTripsContext = () => useContext(TripsContext);

const TripsProvider: FC<{ children: ReactNode; value?: TripsContextType }> = ({
  children,
}) => {
  const [trips, setTrips] = useState<object>();
  const [location, setLocation] = useState<object>();

  const handleTrips = (value: object) => {
    setTrips(value);
  };
  const handleLocation = (value: object) => {
    setLocation(value);
  };

  return (
    <TripsContext.Provider
      value={{ trips, handleTrips, location, handleLocation }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export { TripsProvider, useTripsContext, TripsContext };
