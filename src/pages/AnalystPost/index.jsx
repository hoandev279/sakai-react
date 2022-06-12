import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getCrawlFb } from "../../service/Crawl";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import classNames from "classnames";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar'
AnalystPost.propTypes = {};

function AnalystPost(props) {
    const [customers1, setCustomers1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [postDialog, setPostDialog] = useState(false);
    const [date, setDate] = useState(null)
    const openNew = () => {
        setPostDialog(true);
    };
    const keywordsTemplate = (rowData) => {
        const concatStr = rowData.keywords.map((p) => p.name).join(",");
        return <span>{concatStr}</span>;
    };
    useEffect(() => {
        getCrawlFb().then((data) => {
            setCustomers1(data);
            setLoading1(false);
            console.log(data);
        });
    }, []);
    const defaultValues = {
        name: "",
        keywords: "",
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        console.log(data);

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };
    return (
        <div className="grid">
            <div className="col-12">
                <div className="col-12">
                    <Button className="px-8" onClick={openNew}>
                        Thêm
                    </Button>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="flex align-items-center justify-content-between py-2">
                            <h5 className="mb-0">Thống kê</h5>
                            <div>
                            <span className="p-buttonset mr-1">
                                <Button label="Hôm nay" className="p-button-secondary" />
                                <Button label="Hôm qua" className="p-button-secondary" />
                                <Button label="Tuần này" className="p-button-secondary" />
                            </span>
                            <Calendar id="range" value={date} onChange={(e) => setDate(e.value)} selectionMode="range" readOnlyInput showIcon />

                            </div>
                            
                        </div>

                        <DataTable value={customers1} paginator className="p-datatable-gridlines" showGridlines rows={10} dataKey="id" filterDisplay="menu" loading={loading1} responsiveLayout="scroll" emptyMessage="No posts found.">
                            <Column field="nameTopic" header="Tên chủ đề" filter filterPlaceholder="Search by name" style={{ minWidth: "12rem" }} />
                            <Column field="countPost" header="Số lượng bài viết mới" filterMenuStyle={{ width: "14rem" }} style={{ minWidth: "12rem" }} filter />
                            <Column body={keywordsTemplate} header="Danh sách keywords" style={{ minWidth: "12rem" }} />
                            <Column field="countLike" header="Tổng số like" style={{ minWidth: "12rem" }} filter />
                            <Column field="countComment" header="Tổng số comment" style={{ minWidth: "12rem" }} filter />
                            <Column field="countShare" header="Tổng số share" style={{ minWidth: "12rem" }} filter />
                            <Column field="favoriteFruit" header="Nguồn từ" style={{ minWidth: "12rem" }} filter />
                        </DataTable>
                    </div>
                </div>
            </div>
            <Dialog visible={postDialog} style={{ width: "800px" }} header="Thêm chủ đề" modal className="p-fluid" onHide={() => setPostDialog(false)}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="field">
                        <span>
                            <label htmlFor="name" className={classNames({ "p-error": errors.name })}>
                                Tên chủ đề
                            </label>
                            <Controller name="name" control={control} rules={{ required: "Name is required." }} render={({ field, fieldState }) => <InputText id={field.name} {...field} autoFocus placeholder="Tên chủ đề" className={classNames({ "p-invalid": fieldState.invalid })} />} />
                        </span>
                        {getFormErrorMessage("name")}
                    </div>
                    <div className="field">
                        <span>
                            <label htmlFor="keywords" className={classNames({ "p-error": !!errors.links })}>
                                Danh sách keywords
                            </label>
                            <Controller
                                name="keywords"
                                control={control}
                                rules={{ required: "Links is required." }}
                                render={({ field, fieldState }) => <InputTextarea id={field.name} {...field} className={classNames({ "p-invalid": fieldState.invalid })} placeholder="Keyword cách nhau bởi dấu enter" />}
                            />
                        </span>
                        {getFormErrorMessage("keywords")}
                    </div>

                    <div className="text-right">
                        <Button type="submit" label="Thêm" className="mt-2 inline-block w-auto" />
                    </div>
                </form>
            </Dialog>
        </div>
    );
}

export default AnalystPost;
