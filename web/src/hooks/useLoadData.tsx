import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadData = (
  callback: () => any, 
  state: any | any[],
  ): any | any[] => {
    // dispatch
    const dispatch = useDispatch();
    const data = useSelector(state);

    useEffect(() => {
      dispatch(callback());
    }, [dispatch]);

    return data;
};

type Params = { 
  action: () => void; 
  state: any; 
  params: string | number;
};
export const useLoadDataBy = ({
  action,
  state,
  params,
}: Params): any | any[] => {
    // dispatch
    const dispatch = useDispatch();
    const data = useSelector(state);

    useEffect(() => {
      if (!params) return;
      
      dispatch(action());
    }, [dispatch]);

    return data;
};