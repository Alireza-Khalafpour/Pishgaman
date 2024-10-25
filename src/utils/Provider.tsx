"use client";

import { AppWrapper } from "@/context/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>{children}</AppWrapper>
    </QueryClientProvider>
  );
};

export default Provider;
