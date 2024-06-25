import { useLocation } from "react-router-dom";

export const useQueryString = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParams: any = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value; // Apply data transformations if needed
  }

  return { queryParams };
};
