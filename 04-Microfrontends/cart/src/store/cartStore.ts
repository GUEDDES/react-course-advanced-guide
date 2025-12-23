// Re-export the cart store from shell
// This ensures we use the same store instance across microfrontends

// @ts-ignore
import { useCartStore } from 'shell/cartStore';

export { useCartStore };
