export enum RequestStatusEnum {
  Pending = "Pending",
  Admin_Rejected = "Admin_Rejected",
  Admin_Accepted = "Admin_Accepted",
  Doctor_Accepted = "Doctor_Accepted",
  Doctor_Rejected = "Doctor_Rejected",
}
export const RequestStatusArray = Object.entries(RequestStatusEnum).map(
  ([key, value], index) => ({
    label: value.replace(/_/g, " "), // Optional: more user-friendly
    value: index, // numeric index for dropdowns
    enumKey: key, // "Pending", "Admin_Rejected", etc.
    enumValue: value, // same as enumKey here since it's a string enum
  })
);
