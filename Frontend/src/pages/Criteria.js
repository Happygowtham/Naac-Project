import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "src/AxiosInstance"


export default function CriteriaPage() {

    const [criteriaData, setCriteriaData] = useState([]);

    useEffect(() => {
        axiosInstance(`criteria/`, {
            method: "GET",
        })
            .then((res) => {
                setCriteriaData(res?.data);
            }).catch(err => {
                console.log('err: ', err);
            })
    }, [])


    return (
        <>
            {
                criteriaData?.map((res, id) => {
                    return (
                        <>
                            {id + 1} - {res?.title} <br />
                        </>
                    )
                })
            }
        </>
    )
}