import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spin size="large"></Spin>
    </div>
  );
};

export default Loading;
