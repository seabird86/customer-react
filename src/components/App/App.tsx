import Customer from '../Customer/Customer';
import Recorder from '../Recorder';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Header>Header</Header>
        <Content>
          <Recorder />
          <Customer />
        </Content>
        <Footer>Footer</Footer>
      </Layout>      
    </div>
  );
}

export default App;
