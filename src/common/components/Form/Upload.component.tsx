
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import * as Icons from "react-icons/im";
import * as Icons2 from "react-icons/fa"
import * as Icons3 from "react-icons/ri";

interface Atributos {
    id: string;
    dataArchivo: () => void;
}

export const UploadComponent = () => {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        const progressBarStyle = {
            marginLeft: 'auto',
        };

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto" style={progressBarStyle}>
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '10%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                </div>
                <div className="flex flex-column" style={{ width: '50%' }}>
                    <span className="text-center">
                        <Tag value={props.formatSize} style={{ backgroundColor: '#533893' }} className="px-3 py-2" />
                    </span>
                    <span className="text-center">{file.name}</span>
                </div>
                <div className="ml-auto">
                    <Button type="button" icon={Icons3.RiDeleteBinLine} className="p-button-outlined p-button-rounded p-button-danger" onClick={() => onTemplateRemove(file, props.onRemove)} />
                </div>
            </div>
        );
    };

    const emptyTemplate = () => {
        const containerStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        };

        return (
            <div style={containerStyle}>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-2">
                    <i style={{ display: 'flex', justifyContent: 'center' }}>{ }</i>
                    <p>Arrastra y suelta la imagen aquí</p>
                    <p style={{ color: 'red' }}>Solo es permitido el formato PDF</p>
                </span>

            </div>
        );
    };

    const chooseOptions = {
        icon: Icons.ImAttachment,
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };
    const uploadOptions = {
        icon: Icons2.FaEye,
        iconOnly: true,
        className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
    };
    const cancelOptions = {
        icon: Icons3.RiDeleteBinLine,
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                url="/api/upload"
                multiple
                accept="application/pdf"
                maxFileSize={1000000}
                onUpload={onTemplateUpload}
                onSelect={onTemplateSelect}
                onError={onTemplateClear}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                uploadOptions={uploadOptions}
                cancelOptions={cancelOptions}
            />
        </div>
    )
}
