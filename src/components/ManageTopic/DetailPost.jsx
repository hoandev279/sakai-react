import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "primereact/avatar";
import "./DetailPost.css";
DetailPost.propTypes = {};

function DetailPost(props) {
    const { data } = props;
    return (
        <div>
            <div className="flex align-items-center gap-2 mb-3">
                <Avatar
                    image="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E"
                    className="mr-2"
                    size="xlarge"
                    shape="circle"
                />
                <div>
                    <div className="font-bold">{data.favoriteFruit + ": " + data.link}</div>
                    <div className="flex align-items-center gap-1">
                        8h <i className="pi pi-clock"></i>
                    </div>
                </div>
            </div>
            <div className="mb-5">{data.content}</div>
            <div>
                <img className="w-full h-full" src={`images/product/bamboo-watch.jpg`} alt="" />
            </div>
            <hr />

            <div className="flex justify-content-start" style={{ gap: "10px" }}>
                <div className="inline-flex align-items-center gap-3">
                    <span className="mr-1 font-bold"> {data.countLike}</span> <i className="pi pi-thumbs-up"></i>
                </div>
                <div className="inline-flex align-items-center gap-3">
                    <span className="mr-1 font-bold"> {data.countComment}</span>{" "}
                    <i
                        className="pi pi-comments
"
                    ></i>
                </div>
                <div className="inline-flex align-items-center gap-3">
                    <span className="mr-1 font-bold"> {data.countShare}</span>{" "}
                    <i
                        className="pi pi-share-alt
"
                    ></i>
                </div>
            </div>
            <hr />
            <div className="flex flex-wrap" style={{ rowGap: '15px' }}>
            {data.comments &&
                data.comments.length &&
                data.comments.map((comment, index) => (
                    <div className="flex" style={{ columnGap: '15px'}} key={index}>
                        <img className="w-4rem h-4rem border-circle" src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/274992766_1316032005577591_8261516713860481229_n.jpg?stp=c23.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=-dWWebky8RcAX-hsSfF&_nc_oc=AQkn61dFCBzjH9hPPOTMrJm8E5vxkb0IB-7emU9tO8RdBjGYcITj9zt0n-YuOQyE949ZxuOAPu7ykK0iAG4shVb8&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8RgdWNNjvYC5Aq-nOY_bXyvYcxrgmPWDSM_KBHkqQB8A&oe=62A8671E" alt="" />
                        <p className="inline-block">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailPost;
