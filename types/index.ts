
export type mutationReturnType = {
    message: string;
    status: number;
}

export type FormHeaderLabel = {
    id: number;
    title: string;
}

export type StoreFormFieldNames =
    | "businessType"
    | "status"
    | "storefrontType"
    | "storeName"
    | "storeDescription"
    | "openingDate"
    | "storeLogo"
    | "businessHours"
    | "storeLicenseNumber"
    | "taxIdNumber"
    | "streetAddress"
    | "city"
    | "state"
    | "postalCode"
    | "country"
    | "latitude"
    | "longitude"
    | "contactName"
    | "contactEmail"
    | "phoneNumber"
    | "alternatePhoneNumber"
    | "faxNumber"
    | "websiteUrl"
    | "customerServiceContact";