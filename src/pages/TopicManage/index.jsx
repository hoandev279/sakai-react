import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AutoComplete } from 'primereact/autocomplete';
import { Rating } from 'primereact/rating'
import { Button } from 'primereact/button'
import { getProducts } from '../../service/ProductService';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import './DataViewDemo.css';

TopicManage.propTypes = {};


function TopicManage(props) {
    const [products, setProducts] = useState(null);
const [layout, setLayout] = useState('grid');
const [loading, setLoading] = useState(true);
const [first, setFirst] = useState(0);
const [totalRecords, setTotalRecords] = useState(0);
const rows = useRef(6);
const datasource = useRef(null);
const isMounted = useRef(false);
const [topic, setTopic] = useState(null)
const [topics,setTopics] = useState([])
const [filterTopics, setFilterTopics] = useState(null)
const searchTopic = (event) => {
    setTimeout(() => {
        let _filteredTopics;
        if (!event.query.trim().length) {
            _filteredTopics = [...topics];
        }
        else {
            _filteredTopics = topics.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilterTopics(_filteredTopics);
    }, 250);
}

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
        getProducts().then(data => {
            datasource.current = data;
            setTotalRecords(data.length);
            setProducts(datasource.current.slice(0, rows.current));
            setLoading(false);
        });
    }, 1000);
}, []); // eslint-disable-line react-hooks/exhaustive-deps

const onPage = (event) => {
    setLoading(true);

    //imitate delay of a backend call
    setTimeout(() => {
        const startIndex = event.first;
        const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
        const newProducts = startIndex === endIndex ? datasource.current.slice(startIndex) : datasource.current.slice(startIndex, endIndex);

        setFirst(startIndex);
        setProducts(newProducts);
        setLoading(false);
    }, 1000);
}
const renderListItem = (data) => {
    return (
        <div className="col-12">
            <div className="product-list-item">
                <img src={`images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                <div className="product-list-detail">
                    <div className="product-name">{data.name}</div>
                    <div className="product-description">{data.description}</div>
                    <Rating value={data.rating} readOnly cancel={false}></Rating>
                    <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                </div>
                <div className="product-list-action">
                    <span className="product-price">${data.price}</span>
                    <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                </div>
            </div>
        </div>
    );
}

const renderGridItem = (data) => {
    return (
        <div className="col-12 md:col-4">
            <div className="product-grid-item card">
                <div className="product-grid-item-top">
                    <div>
                        <i className="pi pi-tag product-category-icon"></i>
                        <span className="product-category">{data.category}</span>
                    </div>
                    <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                </div>
                <div className="product-grid-item-content">
                <img src={`images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-name">{data.name}</div>
                    <div className="product-description">{data.description}</div>
                    <Rating value={data.rating} readOnly cancel={false}></Rating>
                </div>
                <div className="product-grid-item-bottom">
                    <span className="product-price">${data.price}</span>
                    <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                </div>
            </div>
        </div>
    );
}
const itemTemplate = (product, layout) => {
    if (!product) {
        return;
    }

    if (layout === 'list')
        return renderListItem(product);
    else if (layout === 'grid')
        return renderGridItem(product);
}

const renderHeader = () => {
    let onOptionChange = (e) => {
        setLoading(true);
        setLayout(e.value);
    };

    return (
        <div style={{ textAlign: 'left' }}>
            <AutoComplete value={topic} suggestions={filterTopics} completeMethod={searchTopic} field="name" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setTopic(e.value)} aria-label="Topics" />

        </div>
    );
}
const header = renderHeader();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                <div className="dataview-demo">
            <div className="card">
                <DataView value={products} layout={layout} header={header}
                        itemTemplate={itemTemplate} lazy paginator paginatorPosition={'both'} rows={rows.current}
                        totalRecords={totalRecords} first={first} onPage={onPage} loading={loading} />
            </div>
        </div>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};
export default React.memo(TopicManage, comparisonFn);