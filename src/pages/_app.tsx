import "@/styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: landscape)").matches) {
        // Si la orientación es apaisada, forzar la orientación vertical
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock("portrait");
        }
      }
    };

    // Verificar la orientación inicial
    handleOrientationChange();

    // Agregar el evento para bloquear la rotación cuando cambie la orientación
    window.addEventListener("orientationchange", handleOrientationChange);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={"flex flex-col items-center"}>
          <div className={"flex justify-center"}>
            <Image
              src="https://ciclofargate-staticsfilesbucket-11a3qmi5fai9p.s3.amazonaws.com/uploads/styles/img/logo_airbus.png"
              alt="Airbus Logo"
              width={200}
              height={200}
            />
          </div>
          <Component {...pageProps} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}
