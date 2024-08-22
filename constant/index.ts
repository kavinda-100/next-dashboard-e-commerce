import React from "react";
import {StoreFormFieldNames} from "@/types";

type navigationBarType = {
    label: string,
    path: string,
    icon?: React.ReactNode,
}

export const navigationBar: navigationBarType[] = [
    {
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        label: "Profile",
        path: "/profile",
    },
    {
        label: "product",
        path: "/product",
    },
    {
        label: "category",
        path: "/category",
    },
    {
        label: "Orders",
        path: "/order",
    },
    {
        label: "Users",
        path: "/manage-user",
    },
    {
        label: "Setting",
        path: "/setting",
    }
    ]

export const enum storeSections {
    BUSINESS_TYPE = "businessType",
    STATUS_TYPE = "status",
    STORE_FRONT_TYPE = "storefrontType"
}
export type selectOptionType = {
    label: string,
    value: string,
}
 export type storeInputsTypes  = {
    label: string;
    name: StoreFormFieldNames;
    placeholder: string;
    inputType: string;
}

export const businessTypes = [
    {
        label: "Retail",
        value: "Retail"
    },
    {
        label: "Wholesale",
        value: "Wholesale"
    },
    {
        label: "Both",
        value: "Both"
    }
]

export const statusTypes = [
    {
        label: "Active",
        value: "Active"
    },
    {
        label: "Inactive",
        value: "Inactive"
    },
    {
        label: "Under Maintenance",
        value: "Under Maintenance"
    }
]

export const storeFromInformation = [
    {
        name: "storeName",
        label: "Store Name",
        placeholder: "example name",
        inputType: "text"
    },
    {
        name: "businessType",
        label: "Business Type",
        placeholder: "example: Retail, Wholesale, etc",
        inputType: "select"
    },
    {
        name: "storeDescription",
        label: "Store Description",
        placeholder: "some description",
        inputType: "text"
    },
    {
        name: "openingDate",
        label: "Opening Date",
        placeholder: "dd/mm/yyyy",
        inputType: "date"
    },
    {
        name: "storeLogo",
        label: "Store Logo",
        placeholder: "",
        inputType: "file"
    },
    {
        name: "businessHours",
        label: "Business Hours",
        placeholder: "9:00 AM - 5:00 PM",
        inputType: "text"
    },
    {
        name: "status",
        label: "Status",
        placeholder: "Active | Inactive | Under Maintenance",
        inputType: "select"
    },
    {
        name: "storeLicenseNumber",
        label: "Store License Number",
        placeholder: "123456",
        inputType: "number"
    },
    {
        name: "taxIdNumber",
        label: "Tax ID Number",
        placeholder: "123456",
        inputType: "number"
    }

]

export const storeFrontType = [
    {
        label: "Warehouse",
        value: "Warehouse"
    },
    {
        label: "Physical",
        value: "Physical"
    },
    {
        label: "Online",
        value: "Online"
    }
]

export const storeFormLocation = [
        {
            name: "streetAddress",
            label: "Street Address",
            placeholder: "1234 Main St",
            inputType: "text"
        },
        {
            name: "city",
            label: "City",
            placeholder: "City",
            inputType: "text"
        },
        {
            name: "state",
            label: "State",
            placeholder: "State",
            inputType: "text"
        },
        {
            name: "postalCode",
            label: "Postal Code",
            placeholder: "123456",
            inputType: "number"
        },
        {
            name: "country",
            label: "Country",
            placeholder: "Country",
            inputType: "text"
        },
        {
            name: "latitude",
            label: "Latitude",
            placeholder: "123456",
            inputType: "number"
        },
        {
            name: "longitude",
            label: "Longitude",
            placeholder: "123456",
            inputType: "number"
        },
        {
            name: "storefrontType",
            label: "Storefront Type",
            placeholder: "Online | Physical | Both",
            inputType: "select"
        }
    ]

export const storeFormContact = [
    {
        name: "contactName",
        label: "Contact Name",
        placeholder: "John Doe",
        inputType: "text"
    },
    {
        name: "contactEmail",
        label: "Contact Email",
        placeholder: "example@gmail.com",
        inputType: "email"
    },
    {
        name: "phoneNumber",
        label: "Phone Number",
        placeholder: "0712367346",
        inputType: "number"
    },
    {
        name: "alternatePhoneNumber",
        label: "Alternate Phone Number",
        placeholder: "0712367346",
        inputType: "number"
    },
    {
        name: "faxNumber",
        label: "Fax Number",
        placeholder: "0712367346",
        inputType: "number"
    },
    {
        name: "websiteUrl",
        label: "Website Url",
        placeholder: "https://example.com",
        inputType: "url"
    },
    {
        name: "customerServiceContact",
        label: "Customer Service Contact",
        placeholder: "0712367346",
        inputType: "number"
    }
    ]