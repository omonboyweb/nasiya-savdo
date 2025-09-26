import {
  CalendarTwoTone,
  MailTwoTone,
  PhoneTwoTone,
  ScheduleTwoTone,
  ShoppingTwoTone,
  WalletTwoTone,
} from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";
type storedata = {
  id: string | number;
  createdAt: string; //ok
  updatedAt: string; //ok
  password: string; //not show
  fullName: string; //ok
  wallet: string; //ok
  isActive: boolean; //ok
  phoneNumber: string; //ok
  isDeleted: false; //pending
  role: string;
  email: string;
  otpCode: null | string;
  otpExpiresAt: null | string;
};
export const StoreCard = (data: storedata) => {
  return (
    <div className="store-wrapper">
      <Card
        className="store-card"
        variant="outlined"
        style={{ width: 400 }}
        title={
          <ShoppingTwoTone
            style={{
              fontSize: "24px",
            }}
          />
        }
      >
        <Flex>
          <Typography
            style={{ fontSize: "24px", fontWeight: 600, color: "#1677ff" }}
          >
            {data.fullName}
          </Typography>
        </Flex>
        <Flex gap={"10px"} style={{ width: "100%" }}>
          <Flex gap={"10px"}>
            <WalletTwoTone style={{ fontSize: "24px", color: "#08c" }} />
            <p>{data.wallet}</p>
          </Flex>
          <Flex style={{ marginLeft: "auto" }}>
            {!data.isActive ? (
              <p className="notActive">{data.isActive} Disabled</p>
            ) : (
              <p className="isActive">{data.isActive} Enable</p>
            )}
          </Flex>
        </Flex>
        <Flex vertical gap={"1px"}>
          <Flex gap={"10px"}>
            <PhoneTwoTone style={{ fontSize: "24px", color: "#08c" }} />
            <p>{data.phoneNumber}</p>
          </Flex>
          <Flex gap={"10px"}>
            <MailTwoTone style={{ fontSize: "24px", color: "#08c" }} />
            <p>{data.email}</p>
          </Flex>
        </Flex>

        <Flex>
          <Flex gap={"10px"}>
            <CalendarTwoTone style={{ fontSize: "24px", color: "#08c" }} />
            <p>{data.createdAt}</p>
          </Flex>
          <Flex gap={"10px"}>
            <ScheduleTwoTone style={{ fontSize: "24px", color: "#08c" }} />
            <p>{data.updatedAt}</p>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};
