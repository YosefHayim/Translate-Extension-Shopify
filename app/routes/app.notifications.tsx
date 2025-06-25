import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { Error } from "@shopify/polaris";

export const loader: LoaderFunction = async ({ request }) => {
  // your loader logic
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  // your action logic
  return null;
};

const Notifications = () => {
  return (
    <div>
      <h1 className="bg-red-500 p-3 font-bold">Notifications page</h1>
    </div>
  );
};
export default Notifications;

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <pre>{error}</pre>
    </div>
  );
};
