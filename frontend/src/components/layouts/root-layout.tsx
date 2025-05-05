import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
