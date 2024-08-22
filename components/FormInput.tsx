import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    storeSections,
    businessTypes,
    statusTypes,
    storeFrontType,
    selectOptionType, storeInputsTypes
} from "@/constant"
import {cn, formatDate} from "@/lib/utils";
import { BsCalendarDate } from "react-icons/bs";

// Define the props for the reusable form field component
interface TextInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    inputType: string;
}

const FormInput = <T extends FieldValues>({ control, name, label, placeholder, inputType }: TextInputProps<T>) => {
    let options : selectOptionType[] = [];
    if(name === storeSections.BUSINESS_TYPE){
        options = businessTypes;
    } else if(name === storeSections.STATUS_TYPE){
        options = statusTypes;
    } else if(name === storeSections.STORE_FRONT_TYPE){
        options = storeFrontType;
    }

    return (
            <FormField
                control={control}
                name={name}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                    {
                        inputType === "text" ? (
                            <FormControl>
                                <Input placeholder={placeholder} {...field} />
                            </FormControl>
                        ) : inputType === "select" ? (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            options.map((option, index) => (
                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </FormControl>
                            </Select>
                            ) : inputType === "calendar" ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            asChild
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
                            ) : inputType === "file" ? (
                                <Alert>
                                    <AlertTitle>Select Image</AlertTitle>
                                    <AlertDescription>
                                        Select the image/file to upload
                                    </AlertDescription>
                                    <Input type="file" {...field} />
                                </Alert>
                            )
                        : (
                                <FormControl>
                                    <Input placeholder={placeholder} {...field} />
                                </FormControl>
                        )
                    }
                    <FormMessage />
                    </FormItem>
                )}
            />
    );
};

export default FormInput;
