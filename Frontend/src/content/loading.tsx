import { Puff } from "react-loading-icons";
//98ff98

const Loading = () => {
  return (
    <section className="flex_center h-screen mt-[260px]">
      <Puff stroke="gray" speed={0.5} width={120} height={120} />
    </section>
  );
};

export default Loading;
