import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoadData = (callback: () => any, state: any | any[]): any | any[] => {
    // dispatch
    const dispatch = useDispatch();
    const data = useSelector(state);

    useEffect(() => {
      dispatch(callback());
    }, []);

    return data;
};