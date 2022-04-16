import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";

type TripsContextType = {
  trips: string;
  handleTrips: (value: string) => void;
};

const TripsContext = createContext<TripsContextType | null>(null);

const useTrips = () => useContext(TripsContext);

const TripsProvider: FC<{ children: ReactNode; value?: TripsContextType }> = ({
  children,
}) => {
  const [trips, setTrips] = useState("");

  const handleTrips = (value: string) => {
    setTrips(value);
  };
  return (
    <TripsContext.Provider value={{ trips, handleTrips }}>
      {children}
    </TripsContext.Provider>
  );
};

export { TripsProvider, useTrips };
