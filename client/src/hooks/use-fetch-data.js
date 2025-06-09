import { useEffect } from "react";
import useDataStore from "@/store/dataStore";

const useFetchData = (key, apiFunc, params) => {

    const { setData, setLoading } = useDataStore();
  
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await apiFunc(...params);
            setData(key, response.data);
            setLoading(false);
        };
  
        fetchData();
    }, [key, ...params]);

};

export default useFetchData;
  