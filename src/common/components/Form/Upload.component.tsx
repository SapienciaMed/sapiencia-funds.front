import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { trashIcon } from "../icons/trash";
import { clip } from "../icons/clip";
import { imagesicon } from "../icons/images";

interface IProps {
    id: string;
    setFilesData: Dispatch<SetStateAction<File[]>>;
    filesAccept?: string;
    maxSize?: number;
    multiple?: boolean;
    dropboxMessage?: string;
    buttonsTitle?: {
      choose: string;
      upload: string;
      cancel: string;
    }
  }

  export const UploadComponent = ({
    id,
    setFilesData,
    filesAccept,
    maxSize,
    multiple = false,
    dropboxMessage = "",
    buttonsTitle = { choose: "Adjuntar", upload: "Cargar", cancel: "Eliminar" }
  }: IProps) => {
    const [totalSize, setTotalSize] = useState(0);
  
    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        const filesArr: File[] = [];
        let _totalSize = totalSize;
        let files = e.files;
        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
            filesArr.push(files[key]);
        });
        setTotalSize(_totalSize);
        setFilesData(filesArr);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });
        setTotalSize(_totalSize);
        const fileName = e.files[0].name;
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });

    };

    const onTemplateRemove = (file, callback) => {
        setFilesData(prev => {
            return prev.filter(item => item !== file);
          });
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const clearFile = () => {
        setFilesData([]);
        setTotalSize(0);
      }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / (maxSize) / 10000;
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
                    <span className="total-size">{formatedValue} / {maxSize / (1024 * 1024)} MB</span>
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
                <Button type="button" icon="trashIcon" className="p-button p-component p-button-danger p-button-rounded p-button-outlined p-button-icon-only" onClick={() => onTemplateRemove(file, props.onRemove)} >{trashIcon}</Button>
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
                <i style={{ display: 'flex', justifyContent: 'center' }}>{imagesicon}</i>
                <p>{dropboxMessage}</p>
                    <p style={{ color: 'red' }}>Solo es permitido el formato PDF</p>
                </span>

            </div>
        );
    };

    const chooseOptions = {
        icon: (
          clip
        ),
        iconOnly: true,
        className: "custom-choose-btn p-button-rounded p-button-outlined",
      };
      const uploadOptions = {
        icon: (
          <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.7513 13.5638C14.5524 13.5638 14.3616 13.4847 14.221 13.3441C14.0803 13.2034 14.0013 13.0127 14.0013 12.8138C14.0013 12.6148 14.0803 12.4241 14.221 12.2834C14.3616 12.1428 14.5524 12.0638 14.7513 12.0638C16.4113 12.0638 17.0013 11.2338 17.0013 8.88375C16.9291 8.04604 16.5635 7.26072 15.9689 6.66617C15.3744 6.07163 14.589 5.70601 13.7513 5.63375C13.4108 5.6424 13.0735 5.7031 12.7513 5.81375C12.654 5.85444 12.5492 5.87386 12.4438 5.87073C12.3384 5.86759 12.2349 5.84197 12.1402 5.79557C12.0455 5.74917 11.9618 5.68307 11.8947 5.6017C11.8277 5.52033 11.7788 5.42556 11.7513 5.32375C11.3707 4.1346 10.5788 3.12002 9.51765 2.46209C8.4565 1.80416 7.1956 1.54595 5.96124 1.73382C4.72689 1.92168 3.5999 2.54331 2.78252 3.48714C1.96515 4.43098 1.51091 5.63522 1.50133 6.88375C1.50133 10.3238 2.26133 12.0638 3.75133 12.0638C3.95024 12.0638 4.141 12.1428 4.28166 12.2834C4.42231 12.4241 4.50133 12.6148 4.50133 12.8138C4.50133 13.0127 4.42231 13.2034 4.28166 13.3441C4.141 13.4847 3.95024 13.5638 3.75133 13.5638C1.25133 13.5638 0.00132606 11.3138 0.00132606 6.88375C-0.029911 5.30751 0.491578 3.77005 1.47533 2.53808C2.45908 1.30611 3.84304 0.457349 5.38712 0.139031C6.93121 -0.179288 8.538 0.0529171 9.92879 0.795367C11.3196 1.53782 12.4066 2.74367 13.0013 4.20375C13.2653 4.15608 13.5331 4.13265 13.8013 4.13375C15.0363 4.20952 16.201 4.73429 17.0759 5.6092C17.9508 6.48411 18.4756 7.64876 18.5513 8.88375C18.5013 10.1638 18.5013 13.5638 14.7513 13.5638Z"
              fill="#34ca6b"
            />
            <path
              d="M12.0817 10.9638C11.8833 10.9615 11.6934 10.8826 11.5517 10.7438L9.25172 8.44376L6.95172 10.7438C6.80955 10.8762 6.6215 10.9484 6.4272 10.9449C6.2329 10.9415 6.04751 10.8628 5.9101 10.7254C5.77269 10.588 5.69397 10.4026 5.69055 10.2083C5.68712 10.014 5.75924 9.82593 5.89172 9.68376L8.72172 6.85376C8.79067 6.783 8.87308 6.72677 8.96411 6.68837C9.05514 6.64997 9.15293 6.63019 9.25172 6.63019C9.35052 6.63019 9.44831 6.64997 9.53933 6.68837C9.63036 6.72677 9.71278 6.783 9.78172 6.85376L12.6117 9.68376C12.7522 9.82438 12.8311 10.015 12.8311 10.2138C12.8311 10.4125 12.7522 10.6031 12.6117 10.7438C12.4689 10.8809 12.2797 10.9594 12.0817 10.9638Z"
              fill="#34ca6b"
            />
            <path
              d="M9.25098 14.4937C9.05206 14.4937 8.8613 14.4147 8.72065 14.2741C8.57999 14.1334 8.50098 13.9426 8.50098 13.7437V7.38373C8.50098 7.18482 8.57999 6.99405 8.72065 6.8534C8.8613 6.71275 9.05206 6.63373 9.25098 6.63373C9.44989 6.63373 9.64065 6.71275 9.78131 6.8534C9.92196 6.99405 10.001 7.18482 10.001 7.38373V13.7437C10.001 13.9426 9.92196 14.1334 9.78131 14.2741C9.64065 14.4147 9.44989 14.4937 9.25098 14.4937Z"
              fill="#34ca6b"
            />
          </svg>
        ),
        iconOnly: true,
        className: "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
      };
      const cancelOptions = {
        icon: (
          trashIcon
        ),
        iconOnly: true,
        className: "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
      };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content={buttonsTitle.choose} position="bottom" />
            <Tooltip target=".custom-upload-btn" content={buttonsTitle.upload} position="bottom" />
            <Tooltip target=".custom-cancel-btn" content={buttonsTitle.cancel} position="bottom" />

            <FileUpload
                id={id}
                ref={fileUploadRef}
                name="demo[]"
                url="/api/upload"
                multiple={multiple}
                accept={filesAccept}
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
