import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import CartPage from "./pages/cart/page.tsx";
import RootLayout from "./pages/layout.tsx";
import MoviePage from "./pages/movie/page.tsx";
import HomePage from "./pages/page.tsx";
import Store from "./store/index.ts";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "movie/:movieId",
          element: <MoviePage />,
        },
      ],
    },
  ],
  { basename: "/rent-a-film" },
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
