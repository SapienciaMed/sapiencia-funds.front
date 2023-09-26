import React from "react";

import { FilterMasterActivityForm } from "../forms/filter-masteractivity.form";

import useSearchMasterHook from "../hooks/search-master-activity.hook";

import TableComponent from "../../../common/components/table.component";

const SearchMasterPage = (): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmit,
    redirectCreate,
    formValues,
    showTable,
    activity,
    tableComponentRef,
    tableColumns,
    tableActions,
  } = useSearchMasterHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
          Gestión territorial
          </label>
        </div>

        <FilterMasterActivityForm
          control={control}
          formState={formState}
          activityList={activity}
          redirectCreate={redirectCreate}
          onSubmit={onSubmit}
          formValues={formValues}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiFunds}/api/v1/activities/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchMasterPage);
