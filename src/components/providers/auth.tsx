import { useCallback } from "react";
import {
  AuthProvider as ReactAuthProvider,
  type AuthProviderProps,
} from "react-oidc-context";

const AUTH_CONFIG: AuthProviderProps = {
  authority: import.meta.env.VITE_HERCULES_OIDC_AUTHORITY!,
  client_id: import.meta.env.VITE_HERCULES_OIDC_CLIENT_ID!,
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "openid profile email",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const onSigninCallback = useCallback(() => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);
  const onSignoutCallback = useCallback(() => {
    window.location.pathname = "";
  }, []);

  return (
    <ReactAuthProvider
      {...AUTH_CONFIG}
      onSigninCallback={onSigninCallback}
      onSignoutCallback={onSignoutCallback}
    >
      {children}
    </ReactAuthProvider>
  );
}
