import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getCustomersLarge } from "../../service/CustomerService.js";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";
import { InputTextarea } from "primereact/inputtextarea";

SourceManage.propTypes = {};

function SourceManage(props) {
    const [customers1, setCustomers1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [sourceDialog, setSourceDialog] = useState(false)
    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };
    const defaultValues = {
        sources: "",
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
    const openNew = () => {
        setSourceDialog(true);
    };
    const hideDialog = () => {
        setSourceDialog(false)
    }
    useEffect(() => {
        getCustomersLarge().then((data) => {
            setCustomers1(getCustomers(data));
            setLoading1(false);
        });
    }, []);
    return (
        <div className="grid">
            <div className="col-12">
                <Button className="px-8" onClick={openNew}>
                    Thêm
                </Button>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Nguồn dữ liệu</h5>
                    <DataTable value={customers1} paginator className="p-datatable-gridlines" showGridlines rows={10} dataKey="id" filterDisplay="menu" loading={loading1} responsiveLayout="scroll" emptyMessage="No sources found.">
                        <Column field="name" header="Nguồn dữ liệu" filter filterPlaceholder="Search by keywords" style={{ minWidth: "12rem" }} />
                    </DataTable>
                </div>
            </div>
            <Dialog visible={sourceDialog} style={{ width: "800px" }} header="Nhập danh sách nguồn dữ liệu" modal className="p-fluid" onHide={hideDialog}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                  
                    <div className="field">
                        <span>
                            <Controller name="sources" control={control} rules={{ required: "Sources is required." }} render={({ field, fieldState }) => <InputTextarea id={field.name} rows={10} {...field} className={classNames({ "p-invalid": fieldState.invalid })} />} />
                        </span>
                        {getFormErrorMessage("sources")}
                    </div>
                   
                    <div className="text-right">
                        <Button type="submit" label="Thêm" className="mt-2 inline-block w-auto" />
                    </div>
                </form>
            </Dialog>
        </div>
    );
}
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};
export default React.memo(SourceManage, comparisonFn);
