import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createCustomer, deleteCustomer, getCustomers } from '../../redux/customer/CustomerSearchRedux';
import { Customer } from '../../redux/entity/CustomerEntity';
import { RootState } from '../../redux/store';

const connector = connect( (state:RootState) => ({
  ...state.customerSearch
}), {
  getCustomers,
  createCustomer,
  deleteCustomer,
});
interface Props extends ConnectedProps<typeof connector> {}
export default connector(({ customersRes, getCustomers,createCustomer,deleteCustomer}:Props) =>{
  useEffect(()=>{
    getCustomers({params:{page:1, pageSize:2}});
  },[]);

  const onChangeTable = (pagination: TablePaginationConfig) => {
    getCustomers({params:{page:pagination.current, pageSize: pagination.pageSize}});
  };

  const onCreate = () => {
    createCustomer({callback: ()=> onChangeTable(customersRes?.pagination ?? {})});
  }

  const onDelete = (rec:Customer) => {    
    deleteCustomer({id:rec.id, callback: ()=> onChangeTable(customersRes?.pagination ?? {})});
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
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
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
      <Table columns={columns} dataSource={customersRes?.customers} rowKey={record => record.id} onChange={(a)=>onChangeTable(a)} pagination={customersRes?.pagination}/>
    </>
  );
});
