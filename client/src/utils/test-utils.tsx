import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import Providers from "../Providers";

type AllTheProvidersProps = { children: React.ReactNode };

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <Providers>{children}</Providers>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
