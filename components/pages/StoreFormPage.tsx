"use client"

import React from 'react';
import MultiStepFormHeader from "@/components/MultiStepFormHeader";
import {FormHeaderLabel} from "@/types";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "../ui/card";
import {ZodUserShopDetailsFormSchema} from "@/zod/formValidation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import {
    storeFromInformation,
    businessTypes,
    storeSections,
    statusTypes,
    storeFrontType,
    storeFormContact,
    storeFormLocation,
} from "@/constant"
import {Input} from "../ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {cn, formatDate} from "../../lib/utils";
import {BsCalendarDate} from "react-icons/bs";
import {Calendar} from "../ui/calendar";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { useEdgeStore } from '@/lib/edgestore';
import Link from "next/link";
import {EdgestoreErrorHandler} from "@/lib/edgestoreErrorHandler";
import FormError from "@/components/FormError";
import FormSuccess  from "@/components/FormSuccess";
import {SingleImageDropzone} from "@/components/fileUploadComponents/SingleImageDropzone";
import {
    MultiFileDropzone,
    type FileState,
} from '@/components/fileUploadComponents/MultiFileDropzone';

const formHeaderLabels: FormHeaderLabel[] = [
    {
        id: 1,
        title: "Store Information",
    },
    {
        id: 2,
        title: "Store Location",
    },
    {
        id: 3,
        title: "Store Contact",
    },
    {
        id: 4,
        title: "Store Artifacts",
    }
]

const StoreFormPage = () => {
    const [currentStep, setCurrentStep] = React.useState(0);

    // file state
    const [file, setFile] = React.useState<File>();
    const [fileStates, setFileStates] = React.useState<FileState[]>([]);
    const [urls, setUrls] = React.useState<{
        url: string;
        thumbnail: string | null
    }>();
    const [multipelFilesUrls, setMultipelFilesUrls] = React.useState<string[]>([])
    const [fileUploadProgress, setFileUploadProgress] = React.useState<number>(0)
    const [fileUploadError, setFileUploadError] = React.useState<string | undefined>()
    const [fileUploadSuccess, setFileUploadSuccess] = React.useState<string | undefined>()
    const [multipelFileUploadError, setMultipelFileUploadError] = React.useState<string | undefined>()
    const { edgestore } = useEdgeStore();

    // set the window width
    const [windowType, setWindowType] = React.useState<"Mobile" | "Desktop" | "Tablet">("Desktop")

    React.useEffect(() => {
        const handleResize = () => {
            setWindowType(window.innerWidth >= 500 ? "Desktop" : window.innerWidth >= 300 ? "Tablet" : "Mobile")
        };
        window.addEventListener("resize", handleResize);
        // Call handleResize initially to set the correct width
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    // console.log(windowWidth)

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    }

    const handlePrev = () => {
        setCurrentStep(prev => prev - 1);
    }

    const form = useForm<z.infer<typeof ZodUserShopDetailsFormSchema>>({
        resolver: zodResolver(ZodUserShopDetailsFormSchema),
        // defaultValues:{
        //     // Store Information
        //     storeName: undefined,
        //     businessType: undefined,
        //     storeDescription: undefined,
        //     // openingDate: new Date.now(),
        //     storeLogo: undefined,
        //     businessHours: undefined,
        //     // status: "Active" || "Inactive" || "Under Maintenance",
        //     // storefrontType: "Online" || "Physical" || "Both",
        //     storeLicenseNumber: undefined,
        //     taxIdNumber: undefined,
        //     // Store Location
        //     streetAddress: "",
        //     city: "",
        //     state: "",
        //     postalCode: "",
        //     country: "",
        //     // latitude: 0,
        //     // longitude: 0,
        //     // Store Contact
        //     contactName: "",
        //     contactEmail: "",
        //     phoneNumber: "",
        //     alternatePhoneNumber: "",
        //     faxNumber: "",
        //     websiteUrl: "",
        //     customerServiceContact: "",
        // }
    })

    // upload single Image
    const uploadImage = async () => {
        if(!file){
            return
        }
        if (file) {
            try {
                // send the files/images to the edge store
                const res = await edgestore.myPublicImages.upload({
                    file,
                    // set the type of the Image e.g.: store/my-store-logo.png
                    input: {type : "store"},
                    //set the progress of the upload
                    onProgressChange: (progress) => {
                        setFileUploadProgress(progress)
                    }
                })
                // set the urls to show to the user
                setUrls({
                    url: res.url,
                    thumbnail: res.thumbnailUrl
                })
                setFileUploadSuccess("Files Uploaded")
                setFileUploadProgress(0)
            }
            catch (e: any | Error){
                const message = EdgestoreErrorHandler(e)
                setFileUploadError(message)
            }
        }

    }

    // upload multiple files
    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    const onSubmit = async (values: z.infer<typeof ZodUserShopDetailsFormSchema>) => {
        const formData = {
            ...values,
            logoUrl: urls?.url,
            thumbnailUrl: urls?.thumbnail,
            multipleFilesUrls: multipelFilesUrls
        }
        console.log(formData);
        window.alert(JSON.stringify(formData, null, 2));
        form.reset()
    };

    return (
        <section className="container p-5">
            <Card className="max-w-[800px] mx-auto">
                <MultiStepFormHeader formHeaderLabel={formHeaderLabels} currentStep={currentStep}/>
                <CardHeader className="text-pretty text-center font-semibold">Provide Your Sore {
                    currentStep == 0 ? "Information" : currentStep == 1 ? "Location Information" : currentStep == 2 ? "Contact Information" : "Store Artifacts"}
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-4">
                                {currentStep === 0 && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="storeName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Store Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Example Store" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="storeDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Store Description</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Example Store description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="businessType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Business Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select business type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {businessTypes.map((option, index) => (
                                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="openingDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Opening Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <div className="w-full">
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            formatDate(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <BsCalendarDate className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </div>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="businessHours"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Business Hours</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Example 8.00 a.m - 5.00 p.m" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Business Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select business status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {statusTypes.map((option, index) => (
                                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="storefrontType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Storefront Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Store Front Type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {storeFrontType.map((option, index) => (
                                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="storeLicenseNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Store LicenseNumber</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="83458945" type={"number"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="taxIdNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Store TaxIdNumber</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="832456820" type={"number"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                {currentStep === 1 && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="streetAddress"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Street Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="123 Main St" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="City" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>state</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="state" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>country</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="country" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="postalCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>PostalCode</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="postalCode" type={"number"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="longitude"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Longitude</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="longitude" type={"number"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="latitude"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Latitude</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="latitude" type={"number"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </>
                                )}

                                {currentStep === 2 && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="contactName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="contactEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="contact@example.com" type={"email"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phoneNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="0712956879" type={"tel"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="alternatePhoneNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Alternate PhoneNumber</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="0712956879" type={"tel"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="faxNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>FaxNumber</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="45679234" type={"number"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="websiteUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>WebsiteUrl</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://www.example.com" type={"url"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="customerServiceContact"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Service Contact</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="0712956879" type={"tel"} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                                {
                                    currentStep === 3 && (
                                        <>
                                            <div className="w-full flex justify-center items-center">
                                                <Alert>
                                                    <AlertTitle className="mb-4">Select Image</AlertTitle>
                                                    <div className="flex flex-col justify-center items-center gap-2 mb-2">
                                                        <SingleImageDropzone
                                                            width={windowType === "Desktop" ? 500 : windowType === "Tablet" ? 300 : 200}
                                                            height={200}
                                                            value={file}
                                                            onChange={(file) => {
                                                                setFile(file);
                                                            }}
                                                        />
                                                        <Button
                                                            type={"button"}
                                                            variant={"outline"}
                                                            disabled={fileUploadProgress > 0}
                                                            onClick={uploadImage}>
                                                            {fileUploadProgress > 0 ? "Uploading..." : "Upload"}
                                                        </Button>
                                                    </div>
                                                    { fileUploadProgress > 0 && (
                                                        <div className="flex flex-col gap-2">
                                                            <div className="h-[6px] w-full border rounded overflow-hidden">
                                                                <div
                                                                    className="h-full bg-zinc-800 dark:bg-white transition-all duration-150"
                                                                    style={{
                                                                        width: `${fileUploadProgress}%`
                                                                    }}
                                                                />
                                                            </div>
                                                            <p className="flex justify-end items-end text-foreground font-semibold font-mono">
                                                                {fileUploadProgress}%
                                                            </p>
                                                        </div>
                                                    )}
                                                    {fileUploadError && <FormError message={fileUploadError}/>}
                                                    {fileUploadSuccess && <FormSuccess message={fileUploadSuccess}/>}
                                                </Alert>
                                            </div>

                                            <div className="flex w-full justify-center items-center my-3">
                                                    <Alert>
                                                        <AlertTitle>Upload your documents</AlertTitle>
                                                        <div className="w-full mt-2">
                                                            <MultiFileDropzone
                                                                value={fileStates}
                                                                onChange={(files) => {
                                                                    setFileStates(files);
                                                                }}
                                                                onFilesAdded={async (addedFiles) => {
                                                                    setFileStates([...fileStates, ...addedFiles]);
                                                                    await Promise.all(
                                                                        addedFiles.map(async (addedFileState) => {
                                                                            try {
                                                                                const res = await edgestore.publicFiles.upload({
                                                                                    file: addedFileState.file,
                                                                                    input: {type : "store"},
                                                                                    onProgressChange: async (progress) => {
                                                                                        updateFileProgress(addedFileState.key, progress);
                                                                                        if (progress === 100) {
                                                                                            // wait 1 second to set it to complete
                                                                                            // so that the user can see the progress bar at 100%
                                                                                            await new Promise((resolve) => setTimeout(resolve, 1000));
                                                                                            updateFileProgress(addedFileState.key, 'COMPLETE');
                                                                                        }
                                                                                    },
                                                                                });
                                                                                console.log(res);
                                                                                setMultipelFilesUrls([...multipelFilesUrls, res.url]);
                                                                            } catch (err : any | Error | unknown) {
                                                                                updateFileProgress(addedFileState.key, 'ERROR');
                                                                                setMultipelFileUploadError(err?.data.message || "Files upload fail!");
                                                                            }
                                                                        }),
                                                                    );
                                                                }}
                                                            />
                                                            {multipelFileUploadError && <FormError message={fileUploadError}/>}
                                                        </div>
                                                    </Alert>
                                            </div>
                                        </>
                                    )
                                }

                                {
                                    currentStep === formHeaderLabels.length - 1 && (
                                        <div className="w-full flex justify-end items-end">
                                            <Button
                                                type="submit">Submit</Button>
                                        </div>
                                    )
                                }
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-between items-center w-full max-w-2xl mx-auto">
                        <Button
                            type={"button"}
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                        >
                            Prev</Button>
                        <div className="flex justify-center items-center gap-3">
                            <Button
                                type={"button"}
                                onClick={handleNext}
                                disabled={currentStep === formHeaderLabels.length - 1}
                            >
                                Next
                            </Button>
                        </div>

                    </div>
                </CardFooter>
            </Card>
        </section>
    );
};

export default StoreFormPage;

// <FormField
//     control={form.control}
//     name="storeLogo"
//     render={({ field }) => (
//         <FormItem>
//             <FormLabel>Store Logo</FormLabel>
//             <FormControl>
//                 <Alert>
//                     <AlertTitle className="mb-4">Select Image</AlertTitle>
//                     <Input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handelFile(e)}
//                     />
//                 </Alert>
//             </FormControl>
//             <FormMessage />
//         </FormItem>
//     )}
// />