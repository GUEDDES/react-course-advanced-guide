import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartStore } from './cartStore';

describe('useCartStore', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
  };

  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({
      ...mockProduct,
      quantity: 1,
    });
  });

  it('should increment quantity when adding existing item', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity(mockProduct.id, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity(mockProduct.id, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate total correctly', () => {
    const { result } = renderHook(() => useCartStore());

    const product1 = { id: '1', name: 'Product 1', price: 10 };
    const product2 = { id: '2', name: 'Product 2', price: 20 };

    act(() => {
      result.current.addItem(product1);
      result.current.addItem(product2);
      result.current.addItem(product2); // quantity = 2
    });

    expect(result.current.total).toBe(50); // 10 + 20*2
  });

  it('should calculate item count correctly', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
      result.current.addItem({ ...mockProduct, id: '2' });
    });

    expect(result.current.itemCount).toBe(3);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem({ ...mockProduct, id: '2' });
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should check if item exists', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.hasItem(mockProduct.id)).toBe(true);
    expect(result.current.hasItem('non-existent')).toBe(false);
  });

  it('should get item quantity', () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.getItemQuantity(mockProduct.id)).toBe(0);

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });

    expect(result.current.getItemQuantity(mockProduct.id)).toBe(2);
  });
});
