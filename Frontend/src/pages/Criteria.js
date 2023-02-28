import { useEffect } from "react";
import axiosInstance from "src/AxiosInstance"


export default function CriteriaPage() {

    useEffect(() => {
        axiosInstance(`criteria/`, {
            method: "GET",
            data: {}
        })
            .then((res) => {
                console.log('res: ', res);
            }).catch(err => {
                console.log('err: ', err);
            })
    }, [])


    return (
        <>
            Criteria
        </>
    )
}