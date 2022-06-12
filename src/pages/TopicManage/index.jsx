import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AutoComplete } from "primereact/autocomplete";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { getPosts } from "../../service/Crawl.js";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import "./DataViewDemo.css";
import { Dialog } from "primereact/dialog";
import { Avatar } from 'primereact/avatar'
import DetailPost from "../../components/ManageTopic/DetailPost.jsx";
TopicManage.propTypes = {};

function TopicManage(props) {
    const [posts, setPosts] = useState(null);
    const [layout, setLayout] = useState("grid");
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const rows = useRef(6);
    const datasource = useRef(null);
    const isMounted = useRef(false);
    const [topic, setTopic] = useState(null);
    const [detailPost,setDetailPost] = useState(null)
    const [topics, setTopics] = useState([]);
    const [filterTopics, setFilterTopics] = useState(null);
    const [displayDialog,setDisplayDialog] = useState(false)
    const searchTopic = (event) => {
        setTimeout(() => {
            let _filteredTopics;
            if (!event.query.trim().length) {
                _filteredTopics = [...topics];
            } else {
                _filteredTopics = topics.filter((country) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilterTopics(_filteredTopics);
        }, 250);
    };

    useEffect(() => {
        if (isMounted.current) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setTimeout(() => {
            isMounted.current = true;
            getPosts().then((data) => {
                datasource.current = data;
                setTotalRecords(data.length);
                setPosts(datasource.current.slice(0, rows.current));
                setLoading(false);
            });
        }, 1000);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const openDetailPost = (data) => {
        console.log(data)
        setDetailPost(data)
        setDisplayDialog(true)
    }
    const onPage = (event) => {
        setLoading(true);

        //imitate delay of a backend call
        setTimeout(() => {
            const startIndex = event.first;
            const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
            const newPosts = startIndex === endIndex ? datasource.current.slice(startIndex) : datasource.current.slice(startIndex, endIndex);

            setFirst(startIndex);
            setPosts(newPosts);
            setLoading(false);
        }, 1000);
    };

    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.favoriteFruit + ": " + data.link}</span>
                        </div>
                        <span className={`product-badge status-instock`}>{data.nameTopic}</span>
                    </div>
                    <div className="product-grid-item-content">
                        <img onClick={() => openDetailPost(data)} className="cursor-pointer" src={`images/product/bamboo-watch.jpg`} onError={(e) => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")} alt={data.name} />
                        <div className="product-name">{data.name}</div>
                    </div>
                    <div className="text-center">
                        <p>{data.content.substr(0,50) + "... "}</p>
                        <div className="flex justify-content-center" style={{ gap: '10px' }}>
                            <div className="inline-flex align-items-center gap-3">
                                <span className="mr-1"> {data.countLike}</span> <i className="pi pi-thumbs-up"></i>
                            </div>
                            <div className="inline-flex align-items-center gap-3">
                                <span className="mr-1"> {data.countComment}</span>{" "}
                                <i
                                    className="pi pi-comments
"
                                ></i>
                            </div>
                            <div className="inline-flex align-items-center gap-3">
                                <span className="mr-1"> {data.countShare}</span>{" "}
                                <i
                                    className="pi pi-share-alt
"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderHeader = () => {
        let onOptionChange = (e) => {
            setLoading(true);
            setLayout(e.value);
        };

        return (
            <div style={{ textAlign: "left" }}>
                <AutoComplete value={topic} suggestions={filterTopics} completeMethod={searchTopic} field="name" dropdown forceSelection onChange={(e) => setTopic(e.value)} aria-label="Topics" />
            </div>
        );
    };
    const header = renderHeader();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <div className="dataview-demo">
                        <div className="card">
                            <DataView value={posts} layout={layout} header={header} itemTemplate={renderGridItem} lazy paginator paginatorPosition={"both"} rows={rows.current} totalRecords={totalRecords} first={first} onPage={onPage} loading={loading} />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog visible={displayDialog} style={{ width: '680px'}} header="Detail Post" modal onHide={() => setDisplayDialog(false)}>
                <DetailPost data={detailPost}/>
            </Dialog>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};
export default React.memo(TopicManage, comparisonFn);
