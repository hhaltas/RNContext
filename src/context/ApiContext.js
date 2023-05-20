import {createContext, useState, useEffect, useContext} from 'react';
import {APIURL} from '../static';

const ApiContext = createContext();
export function ApiProvider({children}) {
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [offset, setOffset]);

  const fetchData = async () => {
    try {
      console.log(offset);
      if (!loading && !isListEnd) {
        setLoading(true);

        fetch(APIURL + offset)
          .then(response => response.json())
          .then(responseJson => {
           // console.log(responseJson);
            if (responseJson.result.length > 0) {
              setOffset(offset + 1);

              setDataSource([...dataSource, ...responseJson.result]);
              setLoading(false);
            } else {
              setIsListEnd(true);
              setLoading(false);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    } catch (error) {
    //  console.log('catch', error);
    }
  };
  const values = {
    dataSource,
    setDataSource,
    offset,
    setOffset,
    isListEnd,
    setIsListEnd,
    loading,
    setLoading,
  };
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
}
export default ApiContext;

export function useAPI() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
