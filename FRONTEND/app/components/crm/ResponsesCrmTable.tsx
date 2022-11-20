import { IUser } from "@/api/models/IUser";
import { Button, Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";

type Props = {
  responses: IUser[];
};

const ResponsesCrmTable = ({ responses }: Props) => {
  return (
    <Table dataSource={responses} className="CrmTable">
      <Column title="Name" dataIndex="name" key="name" width="10px" />
      <Column title="Surname" dataIndex="surname" key="surname" width="10px" />
      <Column title="Phone" dataIndex="number" key="number" width="140px" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        width="10px"
        title="GitHub"
        dataIndex="github"
        key="github"
        render={(github) => (
          <Button size="small" type="primary">
            <a target="_blank" href={github}>
              GitHub
            </a>
          </Button>
        )}
      />
      <Column
        width="10px"
        title="CV"
        dataIndex="cv"
        key="cv"
        render={(cv) => (
          <Button size="small" type="primary">
            <a target="_blank" href={cv}>
              CV
            </a>
          </Button>
        )}
      />
    </Table>
  );
};

export default ResponsesCrmTable;
