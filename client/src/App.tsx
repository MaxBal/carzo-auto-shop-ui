import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Bags from "./pages/Bags";
import { CheckoutPage as Checkout } from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/bags" component={Bags} />
          <Route path="/checkout" component={Checkout} />
          <Route component={NotFound} />
        </Switch>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
