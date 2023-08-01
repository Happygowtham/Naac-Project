import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from 'src/AxiosInstance';

const ChartReport = ({ metricData }) => {

    const [progressData, setProgressData] = useState({});

    useEffect(() => {
        axiosInstance(`progress/`, { method: "GET" })
            .then(res => {
                setProgressData(res?.data)
            })
    }, [])


    const Result = Object.values(metricData)?.map(item => {
        return ({
            x: item[0]?.key_identifiers?.name,
            y: parseInt(progressData?.identifier?.[item[0]?.key_identifiers?.id])
        })
    });

    const data = {
        series: [{
            name: "Progress of Completion",
            data: Result?.map(item => item?.y)
        }],
        options: {
            chart: {
                type: 'bar',
                toolbar: {
                    show: false,
                }
            },
            legend: {
                fontFamily: 'Nunito Sans',
                fontWeight: 600,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Nunito Sans',
                            fontWeight: 600,
                            color: "#8b44ff",
                            offsetY: -10,
                            formatter: function (val) {
                                return val
                            }
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Nunito Sans',
                            fontWeight: 400,
                            color: "#8b44ff",
                            offsetY: 16,
                            formatter: function (val) {
                                return val
                            }
                        },

                    }
                }
            },
            colors: [ // this array contains different color code for each data
                "#8b44ff",
            ],
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
            },
            tooltip: {
                shared: true,
                intersect: false,
                fixed: {
                    enabled: false,
                    position: 'bottomRight',
                    offsetX: 0,
                    offsetY: 0,
                },
            },
            xaxis: {
                categories: Object.values(metricData)?.map(item => item[0]?.key_identifiers?.name),
            },

        }
    };

    return (
        <>
            <Chart
                series={data.series}
                options={data.options}
                type="bar"
                height="400"
            />
        </>
    )
}

export default ChartReport;