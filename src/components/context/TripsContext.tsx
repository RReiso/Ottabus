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
  handleTrips: (value: object) => void;
};
const TripsContext = createContext<TripsContextType | null>(null);

const useTrips = () => useContext(TripsContext);

const TripsProvider: FC<{ children: ReactNode; value?: TripsContextType }> = ({
  children,
}) => {
  const [trips, setTrips] = useState<object>();

  const handleTrips = (value: object) => {
    setTrips(value);
  };

  return (
    <TripsContext.Provider value={{ trips, handleTrips }}>
      {children}
    </TripsContext.Provider>
  );
};

export { TripsProvider, useTrips, TripsContext };
