import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";

import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import { authenticate } from "../.server/shopify";
import { boundary } from "@shopify/shopify-app-remix/server";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return {
    apiKey:
      process.env.SHOPIFY_API_KEY || console.log("SHOPIFY_API_KEY is not set"),
  };
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/right-to-left">Right to left</Link>
        <Link to="/app/fonts">Fonts</Link>
        <Link to="/app/notifications">Notifications</Link>
        <Link to="/app/dynamic-buttons">Dynamic buttons</Link>
        <Link to="/app/payment-methods">Payment methods</Link>
        <Link to="/app/accessbility">Accessbility</Link>
        <Link to="/app/auto-postal-code">Auto postal code</Link>
        <Link to="/app/order-cancellation">Order cancellation</Link>
        <Link to="/app/guide">Guide</Link>
        <Link to="/app/subscription-plans">Subscription plans</Link>
        <Link to="/app/support">Support</Link>
        <Link to="/app/our-apps">Our apps</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
