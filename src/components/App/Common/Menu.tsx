import './App.css';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

const getMenus = () => {
  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={true}
      items={[]}
    /> 
  );
}

export default getMenus;
