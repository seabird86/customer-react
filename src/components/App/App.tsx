import { Layout, Spin } from 'antd';
import 'antd/dist/antd.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/store';
import Customer from '../Customer/Customer';
import Recorder from '../Recorder/Recorder';
import './App.css';

const { Header, Footer, Content } = Layout;

const connector = connect( ({global}:RootState) => ({
  loading: Object.values(global).some(val => val),
}), {
});
interface Props extends ConnectedProps<typeof connector> {}
export default connector(({loading}:Props) => {
  return (
    <div className="App">
      <Layout>
        {loading && (<Spin style={{position:'fixed',zIndex:1000}}/>)}
        <Header>Header</Header>
        <Content>
          <Recorder/>
          <Customer/>
        </Content>
        <Footer>Footer</Footer>
      </Layout>      
    </div>
  );
});