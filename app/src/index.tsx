import React from "react";
import ReactDOM from "react-dom";
import '@shopify/polaris/build/esm/styles.css';
import App from "./App";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "react-redux";
import store from "./reducers";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <AppProvider
        i18n={{
          Polaris: {
            ResourceList: {
              sortingLabel: "Sort by",
              defaultItemSingular: "item",
              defaultItemPlural: "items",
              showing: "Showing {itemsCount} {resource}",
              Item: {
                viewItem: "View details for {itemName}",
              },
            },
            Common: {
              checkbox: "checkbox",
            },
          },
        }}
      >
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
