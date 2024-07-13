import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

export const useAppwrite = (fn: () => void) => {
    const [data, setdata] = useState<any>([])
    const [loading, setloading] = useState(true);

    const fetchData = async () => {
        setloading(true);
        try {
            const res = await fn();
            setdata(res)
        } catch (error: any) {
            Alert.alert('Error', error.message)
        }
        finally {
            setloading(false);
        }
    };
    useEffect(()=> {
        fetchData();
    }, []);

    const refetch = () => fetchData()

    return {data, loading, refetch}
}