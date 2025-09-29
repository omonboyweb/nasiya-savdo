import { useGetData } from "../../config/useGetdata";
export const Debters = () => {
  const { data } = useGetData("/debtor", "debtor");
  console.log(data);

  return <div>Debters</div>;
};
