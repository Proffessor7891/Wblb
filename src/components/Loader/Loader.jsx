import { Rings } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <Rings color="aqua" height={250} width={250} wrapperClass={s.loader} />
  );
};

export default Loader;
