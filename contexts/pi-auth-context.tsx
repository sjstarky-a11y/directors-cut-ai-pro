"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PI_NETWORK_CONFIG } from "@/lib/system-config";

export type VerifiedPiUser = {
  uid: string;
  username: string;
};

interface PiAuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
}

interface PiVerificationResponse {
  user: VerifiedPiUser;
}

interface IncompletePayment {
  identifier?: string;
  transaction?: {
    txid?: string;
  };
}

declare global {
  interface Window {
    Pi: {
      init: (config: {
        version: string;
        sandbox?: boolean;
      }) => void | Promise<void>;

      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (
          payment: IncompletePayment
        ) => void
      ) => Promise<PiAuthResult>;
    };
  }
}

interface PiAuthContextType {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authMessage: string;
  piAccessToken: string | null;
  userData: VerifiedPiUser | null;
  signIn: () => Promise<void>;
  reinitialize: () => Promise<void>;
}

const AUTH_TIMEOUT_MS = 25000;

/** Heuristic: the Pi Browser identifies itself in its user agent. */
export function isPiBrowserEnvironment(): boolean {
  return (
    typeof navigator !== "undefined" &&
    /PiBrowser/i.test(navigator.userAgent)
  );
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Pi sign-in timed out.")),
      ms
    );

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

const PiAuthContext =
  createContext<PiAuthContextType | undefined>(undefined);

const loadPiSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window.Pi !== "undefined") {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${PI_NETWORK_CONFIG.SDK_URL}"]`
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), {
        once: true,
      });

      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Pi SDK script")),
        { once: true }
      );

      return;
    }

    const script = document.createElement("script");

    if (!PI_NETWORK_CONFIG.SDK_URL) {
      reject(new Error("Pi SDK URL is not configured."));
      return;
    }

    script.src = PI_NETWORK_CONFIG.SDK_URL;
    script.async = true;

    script.onload = () => {
      console.log("Pi SDK loaded.");
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Pi SDK script."));
    };

    document.head.appendChild(script);
  });
};

export function PiAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [isAuthenticating, setIsAuthenticating] =
    useState(false);

  const [authMessage, setAuthMessage] = useState(
    "Sign in with your Pi account to continue."
  );

  const [piAccessToken, setPiAccessToken] =
    useState<string | null>(null);

  const [userData, setUserData] =
    useState<VerifiedPiUser | null>(null);

  const isRunning = useRef(false);
  const sdkInitialized = useRef(false);

  const authenticateAndVerify = async (): Promise<void> => {
    setAuthMessage("Authenticating with Pi Network...");

    const piAuthResult = await window.Pi.authenticate(
      ["username"],
      (payment) => {
        console.warn(
          "Incomplete Pi payment found:",
          payment
        );
      }
    );

    if (!piAuthResult?.accessToken) {
      throw new Error(
        "Pi authentication did not return an access token."
      );
    }

    setAuthMessage("Verifying Pi account...");

    const verificationResponse = await fetch(
      "/api/auth/pi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: piAuthResult.accessToken,
        }),
      }
    );

    const verificationData =
      (await verificationResponse.json()) as
        | PiVerificationResponse
        | { error?: string; details?: unknown };

    if (!verificationResponse.ok) {
      console.error(
        "Pi account verification failed:",
        verificationData
      );

      throw new Error(
        "The Pi account could not be verified."
      );
    }

    const verifiedUser = (
      verificationData as PiVerificationResponse
    ).user;

    if (!verifiedUser?.uid || !verifiedUser?.username) {
      throw new Error(
        "Pi verification returned invalid user data."
      );
    }

    setPiAccessToken(piAuthResult.accessToken);
    setUserData(verifiedUser);
  };

  const initializePiAndAuthenticate =
    async (): Promise<void> => {
      if (isRunning.current) {
        return;
      }

      isRunning.current = true;
      setIsAuthenticating(true);

      try {
        setIsAuthenticated(false);
        setAuthMessage("Loading Pi Network SDK...");

        await withTimeout(loadPiSDK(), AUTH_TIMEOUT_MS);

        if (typeof window.Pi === "undefined") {
          throw new Error(
            "Pi SDK is unavailable after loading."
          );
        }

        if (!sdkInitialized.current) {
          setAuthMessage("Initializing Pi Network...");

          await window.Pi.init({
            version: "2.0",
            sandbox: PI_NETWORK_CONFIG.SANDBOX,
          });

          sdkInitialized.current = true;
        }

        await withTimeout(authenticateAndVerify(), AUTH_TIMEOUT_MS);

        setAuthMessage("Pi authentication successful.");
        setIsAuthenticated(true);
      } catch (error) {
        console.error(
          "Pi authentication initialization failed:",
          error
        );

        setIsAuthenticated(false);
        setPiAccessToken(null);
        setUserData(null);

        setAuthMessage(
          isPiBrowserEnvironment()
            ? "Failed to authenticate or verify the Pi account. Please try again."
            : "Pi sign-in is only available inside the Pi Browser. Please open Director's Cut AI Pro from the Pi Browser."
        );
      } finally {
        isRunning.current = false;
        setIsAuthenticating(false);
      }
    };

  const value: PiAuthContextType = {
    isAuthenticated,
    isAuthenticating,
    authMessage,
    piAccessToken,
    userData,
    signIn: initializePiAndAuthenticate,
    reinitialize: initializePiAndAuthenticate,
  };

  return (
    <PiAuthContext.Provider value={value}>
      {children}
    </PiAuthContext.Provider>
  );
}

export function usePiAuth(): PiAuthContextType {
  const context = useContext(PiAuthContext);

  if (context === undefined) {
    throw new Error(
      "usePiAuth must be used within a PiAuthProvider"
    );
  }

  return context;
}