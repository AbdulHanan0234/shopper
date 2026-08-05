import { createRoot } from "react-dom/client";
import ShopContextProvider from "./Context/ShopContext.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>,
);