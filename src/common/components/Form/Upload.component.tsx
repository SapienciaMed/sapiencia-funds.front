import React, { useRef } from "react";
import { Control, Controller } from "react-hook-form";
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';

interface IUploadComponent {
  idInput: string;
  control: Control<any>;
  className?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  onFileSelect?: (e: any) => void;
  onFileUpload?: (e: any) => void;
  onFileRemove?: (file: any, callback: () => void) => void;
  onFileClear?: () => void;
  // ... otras propiedades específicas del componente FileUpload
}

export function UploadComponent({
  idInput,
  control,
  className = "select-basic",
  label,
  classNameLabel = "text-main",
  onFileSelect,
  onFileUpload,
  onFileRemove,
  onFileClear,
  // ... otras propiedades específicas del componente FileUpload
}: IUploadComponent): React.JSX.Element {
  const toast = useRef(null);
  const fileUploadRef = useRef(null); // Agregar esta línea

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef} // Agregar esta línea
        name={idInput}
        // Resto de las propiedades específicas del componente FileUpload
        onUpload={onFileUpload}
        onSelect={onFileSelect}
        onError={onFileClear}
        onClear={onFileClear}
      />
    </div>
  );
}