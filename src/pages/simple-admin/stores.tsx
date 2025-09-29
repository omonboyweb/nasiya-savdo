import { Flex } from "antd";
import { StoreCard } from "../../components/common/store-card";
import CreateStore from "../../components/layout/create-store";
import { useGetData } from "../../config/useGetdata";
type storedata = {
  id: string | number;
  createdAt: string; //ok
  updatedAt: string; //ok
  password: string; //not show
  fullName: string; //ok
  wallet: string; //ok
  isActive: boolean; //ok
  phoneNumber: string; //ok
  isDeleted: false; //ok
  role: string; //ok
  email: string; //ok
  otpCode: null | string;
  otpExpiresAt: null | string;
};
export const Stores = () => {
  const { data } = useGetData("/store", "store");
  return (
    <>
      <div className="simple__admin-store">
        {data?.data?.map((item: storedata) => (
          <StoreCard key={item.id} {...item} />
        ))}
      </div>
      <Flex justify="center" style={{ padding: "30px", marginTop: "50px" }}>
        <CreateStore />
      </Flex>
    </>
  );
};
