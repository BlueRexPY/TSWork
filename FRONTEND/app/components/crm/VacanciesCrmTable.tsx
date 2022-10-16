import { IVacancy } from "@/api/models/IVacancy";
import { Button, Table } from "antd";
import Column from "antd/lib/table/Column";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  vacancies: IVacancy[];
};

const VacanciesCrmTable = ({ vacancies }: Props) => {
  return (
    <Table dataSource={vacancies} className="CrmTable">
      <Column
        width="55px"
        title="Logo"
        dataIndex="logo"
        key="logo"
        render={(logo) => (
          <Image
            src={logo ? logo : ""}
            loader={() => (logo ? logo : "")}
            width={35}
            height={35}
            alt="logo"
            draggable={false}
          />
        )}
      />
      <Column title="Name" dataIndex="positionName" key="positionName" />
      <Column
        width="50px"
        title="Responses"
        dataIndex="responses"
        key="responses"
        render={(responses) => responses.length}
      />
      <Column
        title="Date"
        dataIndex="createdAt"
        filterMode="tree"
        width="50px"
        filterSearch={true}
        key="createdAt"
        render={(createdAt) => {
          const vacancyDate = new Date(createdAt);
          return `${vacancyDate.getDate() + 1 < 10 ? "0" : ""}${
            vacancyDate.getDate() + 1
          }.${vacancyDate.getMonth() + 1 < 10 ? "0" : ""}${
            vacancyDate.getMonth() + 1
          }`;
        }}
      />
      <Column
        title="More"
        dataIndex="_id"
        width="50px"
        key="_id"
        render={(_id) => (
          <Link target="_blank" href={`/crm/res/${_id}`}>
            <Button size="small" type="primary">
              <a target="_blank">Open</a>
            </Button>
          </Link>
        )}
      />
    </Table>
  );
};

export default VacanciesCrmTable;
