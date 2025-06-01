import { createContext } from "react";
import { CurrentPlaceContext } from "../../types/PlaceContext";
;

export const CurrentPlace = createContext<CurrentPlaceContext>({
  currentPlace: undefined,
});