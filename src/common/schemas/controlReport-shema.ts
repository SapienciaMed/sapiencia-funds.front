import * as yup from "yup";

export const controlReportSchema = yup.object({
  controlReport: yup.number().optional().nullable(),
});
