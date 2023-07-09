import React, { type PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { setupStore, type AppStore, type RootState } from '@/redux/store';
// As a basic setup, import your same slice reducer
import { MemoryRouter } from 'react-router-dom';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      ui: { value: false },
      authentication: {
        id: 99999,
        name: '',
        email: '',
        isVerified: false,
        isLogged: false
      }
    },
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
  initialEntries: string[] = ['/']
): Record<string, any> {
  function Wrapper({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element {
    // console.log(initialEntries);
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
