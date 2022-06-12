import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getCustomersLarge } from "../../service/CustomerService";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { Calendar } from "primereact/calendar";
CampaignFacebookManage.propTypes = {};

function CampaignFacebookManage(props) {
    const [customers1, setCustomers1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [campaignDialog, setCampaignDialog] = useState(false);
    const [deleteCampaignDialog, setDeleteCampaignDialog] = useState(false);
    const [campaign, setCampaign] = useState({});
    const toast = useRef(null);

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return { ...d, active: Math.random() < 0.5 };
        });
    };
    const formatDate = (value) => {
        return value.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };
    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };
    const statusTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.active ? "instock" : "outofstock"}`}>{rowData.active ? "Đã thực hiện" : "Đang thực hiện"}</span>;
    };

    const confirmDeleteCampaign = (campaign) => {
        setCampaign(campaign);
        setDeleteCampaignDialog(true);
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="text-center">
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteCampaign(rowData)} />
                </div>
            </React.Fragment>
        );
    };
    const hideDeleteCampaignDialog = () => {
        setDeleteCampaignDialog(false);
    };
    const deleteCampaign = () => {
        let _campaigns = customers1.filter((val) => val.id !== campaign.id);
        setCustomers1(_campaigns);
        setDeleteCampaignDialog(false);
        setCampaign({});
        toast.current.show({ severity: "success", summary: "Successful", detail: "Campaign Deleted", life: 3000 });
    };
    const deleteCampaignDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCampaignDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCampaign} />
        </React.Fragment>
    );
    const openNew = () => {
        setCampaignDialog(true);
    };

    const saveProduct = () => {};
    const hideDialog = () => {
        setCampaignDialog(false);
    };

    const campaignDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" type="submit" icon="pi pi-check" className="p-button-text" onClick={() => {}} />
        </>
    );
    useEffect(() => {
        getCustomersLarge().then((data) => {
            setCustomers1(getCustomers(data));
            setLoading1(false);
            console.log(getCustomers(data));
        });
    }, []);
    const defaultValues = {
        name: "",
        links: "",
        type: "",
        content: "",
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
        <div>
            <Toast ref={toast} />
            <div className="grid">
                <div className="col-12">
                    <Button className="px-8" onClick={openNew}>
                        Thêm
                    </Button>
                </div>
                <div className="col-12">
                    <div className="card">
                        <h5>Chiến dịch facebook</h5>
                        <DataTable value={customers1} paginator className="p-datatable-gridlines" showGridlines rows={10} dataKey="id" filterDisplay="menu" loading={loading1} responsiveLayout="scroll" emptyMessage="No customers found.">
                            <Column field="name" header="Tên chiến dịch" filter filterPlaceholder="Search by name" style={{ minWidth: "12rem" }} />
                            <Column field="status" header="Danh sách bài viết thực hiện chiến dịch" filterMenuStyle={{ width: "14rem" }} style={{ minWidth: "12rem" }} filter />
                            <Column field="company" header="Loại chiến dịch" style={{ minWidth: "12rem" }} filter />
                            <Column body={dateBodyTemplate} header="Thời gian tạo" style={{ minWidth: "12rem" }} filter />
                            <Column field="activity" header="Số lần" style={{ minWidth: "12rem" }} filter />
                            <Column field="active" header="Trạng thái" body={statusTemplate} style={{ minWidth: "12rem" }} filter />
                            <Column header="Hành động" body={actionBodyTemplate} exportable={false} style={{ minWidth: "8rem" }}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
            <Dialog visible={campaignDialog} style={{ width: "800px" }} header="Thêm chiến dịch" modal className="p-fluid" onHide={hideDialog}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="field">
                        <span>
                            <label htmlFor="name" className={classNames({ "p-error": errors.name })}>
                                Tên chiến dịch
                            </label>
                            <Controller name="name" control={control} rules={{ required: "Name is required." }} render={({ field, fieldState }) => <InputText id={field.name} {...field} autoFocus className={classNames({ "p-invalid": fieldState.invalid })} />} />
                        </span>
                        {getFormErrorMessage("name")}
                    </div>
                    <div className="field">
                        <span>
                            <label htmlFor="links" className={classNames({ "p-error": !!errors.links })}>
                                Link bài viết thực hiện chiến dịch
                            </label>
                            <Controller name="links" control={control} rules={{ required: "Links is required." }} render={({ field, fieldState }) => <InputTextarea id={field.name} {...field} className={classNames({ "p-invalid": fieldState.invalid })} />} />
                        </span>
                        {getFormErrorMessage("links")}
                    </div>
                    <div className="field">
                        <span>
                            <label htmlFor="type">Chọn loại chiến dịch</label>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={[
                                            { name: "Bình luận", code: "BL" },
                                            { name: "Report", code: "RP" },
                                        ]}
                                        optionLabel="name"
                                    />
                                )}
                            />
                        </span>
                    </div>
                    <div className="field">
                        <span>
                            <label htmlFor="content" className={classNames({ "p-error": errors.name })}>
                                Nội dung bình luận
                            </label>
                            <Controller name="content" control={control} rules={{ required: "Content is required." }} render={({ field, fieldState }) => <InputText id={field.name} {...field} autoFocus className={classNames({ "p-invalid": fieldState.invalid })} />} />
                        </span>
                        {getFormErrorMessage("content")}
                    </div>
                    <div className="text-right">
                        <Button type="submit" label="Thêm" className="mt-2 inline-block w-auto" />
                    </div>
                </form>
            </Dialog>
            <Dialog visible={deleteCampaignDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteCampaignDialogFooter} onHide={hideDeleteCampaignDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                    {campaign && (
                        <span>
                            Are you sure you want to delete <b>{campaign.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};
export default React.memo(CampaignFacebookManage, comparisonFn);
