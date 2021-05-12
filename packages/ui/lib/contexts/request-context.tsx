import { createContext, FunctionComponent } from "react";

const defaultUrl = "https://rollem.rocks"

export interface AppContextValue extends Record<string, unknown> {
  baseUrl?: string;
}

/** The NextJS app context. Provided from getInitialProps */
export const AppContext = createContext({ baseUrl: defaultUrl } as AppContextValue);

export const AppContextProvider: FunctionComponent<{ value: AppContextValue }> = ({ value, ...props }) => {
  if (typeof window !== "undefined") {
    const host = window.location.host;
    const protocol = host?.toLowerCase().startsWith('localhost') ? 'http' : 'https';
    value.baseUrl = `${protocol}://${window.location.host}`;
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}