import { useState, useRef, useEffect } from 'react';
import './Recorder.css';
import {useDispatch, useSelector} from 'react-redux';
import {start, selectDateStart} from '../../redux/recorder';
import { Button } from 'antd';
import { CloseCircleOutlined,FieldTimeOutlined } from '@ant-design/icons';

const addZero = (num: number) => num < 10 ? `0${num}`:`${num}`;

const Recorder = () =>{
  const dispatch = useDispatch();
  const dateStart = useSelector(selectDateStart);
  const started = dateStart !== '';
  const interval = useRef<number>(0);
  const [,setCount] = useState<number>(0);

  const onClick=()=>{
    if (started){
      window.clearInterval(interval.current);
      dispatch(start(''));
    }else{
      dispatch(start(new Date().toISOString()));
      interval.current = window.setInterval(()=> {
        setCount(count  => count + 1);
      },100);
    }
    
  }

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  },[]);

  let seconds = started ? Math.floor((Date.now() - new Date(dateStart).getTime())/1000):0;
  const hours = seconds ? Math.floor(seconds /60/60):0;
  seconds -=hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds /60):0;
  seconds -=minutes * 60;
  return (
    <>
      <Button type="primary" shape="round" onClick={onClick} icon={started?(<CloseCircleOutlined />):(<FieldTimeOutlined />)} >{started?'Stop':'Start'}</Button>

      <div>{addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}</div>
    </>
  );
}

export default Recorder;
