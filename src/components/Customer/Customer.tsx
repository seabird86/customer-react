import React, { useEffect } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { selectCustomers, getCustomers, createCustomer, deleteCustomer, Customer} from '../../redux/customer';
import { RootState } from '../../redux/store';
import {Table,Button, Space, Tooltip} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined , DeleteOutlined, EyeOutlined} from '@ant-design/icons';

const connector = connect( (state:RootState) => ({
  customers: selectCustomers(state)
}), {
  getCustomers,
  createCustomer,
  deleteCustomer
});
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const CustomerComponent:React.FC<Props> = ({customers, getCustomers, createCustomer, deleteCustomer}) =>{

  useEffect(()=>{
    getCustomers();
  },[]);

  const onCreate = () => {    
    createCustomer(customers[customers.length-1].id+1);
  }

  const onDelete = (rec:Customer) => {    
    deleteCustomer(rec.id);
  }

  const onView = () => {    
    // deleteCustomer(customers[customers.length-1].id+1);
  }

  interface DataType {
    id: number;
    title: string;
    dateStart: string;
    dateEnd: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Start Date',
      dataIndex: 'dateStart',
      key: 'dateStart',
    },
    {
      title: 'End Date',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, rec) => (
        <Space size="middle">
            <Tooltip title="View"><Button type="primary" shape="circle" onClick={onView} icon={<EyeOutlined />} /></Tooltip>
            <Tooltip title="Delete"><Button type="primary" shape="circle" onClick={()=>onDelete(rec)} icon={<DeleteOutlined />} danger/></Tooltip>
            {/* <Dropdown overlay={(
              <Menu
              items={[
                { key: '1', label: 'Action 1' },
                { key: '2', label: 'Action 2' },
              ]}
            />
            )}>
              <a>
                ... <DownOutlined />
              </a>
            </Dropdown> */}
          </Space>
      ),
    },
  ];

  return (
    <>
      <Button onClick={onCreate} type="primary" style={{ marginBottom: 16 }} icon={<PlusOutlined />}>
        Add
      </Button>
    
      <Table columns={columns} dataSource={customers} rowKey={record => record.id}/>
    </>
  );
}

export default connector(CustomerComponent);
