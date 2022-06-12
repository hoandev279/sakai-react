import React, { useState, useEffect, useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
        },
        {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
        },
    ],
};

const Dashboard = (props) => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
    
    }, []);

    useEffect(() => {
        if (props.colorMode === "light") {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Chủ đề</span>
                            <div className="text-900 font-medium text-xl">152</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-comments text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 chủ đề </span>
                    <span className="text-500">được cập nhật hôm nay</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Bài viết</span>
                            <div className="text-900 font-medium text-xl">2.100 được theo dõi</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-hashtag text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520 bài viết </span>
                    <span className="text-500">mới hôm nay</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Trang Facebook</span>
                            <div className="text-900 font-medium text-xl">28441 được theo dõi</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-facebook text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520 trang </span>
                    <span className="text-500">có bài viết mới hôm nay</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Trang tin tức</span>
                            <div className="text-900 font-medium text-xl">1520 được theo dõi</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-globe text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 trang </span>
                    <span className="text-500">có bài viết mới hôm nay</span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <h5>Bài viết mới</h5>
                        <div>
                            <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu2.current.toggle(event)} />
                            <Menu
                                ref={menu2}
                                popup
                                model={[
                                    { label: "Add New", icon: "pi pi-fw pi-plus" },
                                    { label: "Remove", icon: "pi pi-fw pi-minus" },
                                ]}
                            />
                        </div>
                    </div>

                    <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                     
                      
                    </ul>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <h5>Bài viết nổi bật trong ngày</h5>
                        <div>
                            <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu2.current.toggle(event)} />
                            <Menu
                                ref={menu2}
                                popup
                                model={[
                                    { label: "Add New", icon: "pi pi-fw pi-plus" },
                                    { label: "Remove", icon: "pi pi-fw pi-minus" },
                                ]}
                            />
                        </div>
                    </div>

                    <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>    <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <img className="w-full h-full border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"></img>
                            </div>
                            <span className="text-900 line-height-3">
                                <a href="#" className="font-medium">
                                    Tên nguồn dữ liệu từ Facebook
                                </a>
                                <span className="text-700"> Nội dung bài viết tóm gọn trong 100 ký tự...</span>
                                <br />
                                Cảm xúc: 1000 | Bình luận: 1000 | Chia sẻ: 10000
                                <br />
                                Chủ đề:{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 1
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 2
                                </a>
                                ,{" "}
                                <a href="#" className="font-medium">
                                    Tên chủ đề 3
                                </a>
                                <a href="#" className="text-blue-500">
                                    {" "}
                                    Xem chi tiết
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(Dashboard, comparisonFn);
