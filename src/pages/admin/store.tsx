import { StoreCard } from "../../components/common/store-card";
import { useGetData } from "../../config/useGetdata";
type storedata = {
  id: string | number;
  createdAt: string;
  updatedAt: string;
  password: string;
  fullName: string;
  wallet: string;
  isActive: boolean;
  phoneNumber: string;
  isDeleted: false;
  role: string;
  email: string;
  otpCode: null | string;
  otpExpiresAt: null | string;
};

export const Store = () => {
  const { data } = useGetData("/store", "store");
  return (
    <div className="store-wrapper">
      {data?.data?.map((item: storedata) => (
        <div key={item.id}>{<StoreCard {...item} />}</div>
      ))}
    </div>
  );
};
