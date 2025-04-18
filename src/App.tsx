import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./router/root";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: "#355aff",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
