import { ThemeProvider } from "next-themes";

// import { Toaster } from "../ui/sonner.tsx";
import { TooltipProvider } from "../ui/tooltip.tsx";
import { QueryClientProvider } from "../../components/providers/query-client.tsx";

export function DefaultProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <TooltipProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <Toaster /> */}
          {children}
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
