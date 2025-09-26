import React from "react";
import { Table, Space, Button, message, Popconfirm } from "antd";
import type { TableColumnsType } from "antd";
import { useGetData } from "../../config/useGetdata";
import { useDeleteData } from "../../config/useDeleteData";
import CreateAdmin from "./crete-admin";

interface DataType {
  key: React.Key;
  name: string;
  status?: boolean;
  action?: string;
}

const AllAdmin: React.FC = () => {
  const { data } = useGetData("admin", "/admin");
  const { mutate: deleteAdmin } = useDeleteData("admin", "/admin");
  const [deleteId, setDeleteId] = React.useState<number | null | string>(null);
  const handleDeleteAdmin = (id: number) => {
    setDeleteId(id);
    deleteAdmin(id, {
      onSuccess: () => {
        message.success("Deleted admin");
      },
      onError: () => {
        message.error("Error on delete admin");
        setDeleteId(null);
      },
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Ishonchingiz komilmi?"
            onConfirm={() => handleDeleteAdmin(record.key as number)}
            okText="Ha"
            cancelText="Yo‘q"
          >
            <Button danger loading={deleteId === record.key}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataTable: DataType[] = data?.data?.map((item: any) => ({
    key: item?.id,
    name: item?.username,
    status: item.isActive ? "Active" : "Inactive",
    action: "Edit",
  }));

  return (
    <>
      <Table<DataType> columns={columns} dataSource={dataTable} size="middle" />
      <CreateAdmin />
    </>
  );
};

export default AllAdmin;
