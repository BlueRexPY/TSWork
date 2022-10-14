import { setupStore } from "@/store/store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ReactChild, ReactNode } from "react";
const store = setupStore();

export const renderWithState = (components: ReactNode) => {
  return <Provider store={store}>{components}</Provider>;
};
