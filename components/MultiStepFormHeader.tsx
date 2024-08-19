import React from 'react';
import {FormHeaderLabel} from "@/types";
import {cn} from "@/lib/utils";

const SingleStepFormHeader = (
    { formHeaderLabel,
        index,
        currentStep
    }: {
    formHeaderLabel: FormHeaderLabel,
    index: number,
        currentStep: number
}) => {
    return (
        <div className="flex flex-col items-center w-full gap-1 p-2">
            <div className={cn("flex items-center justify-center w-10 h-10 mb-1 text-white rounded-full", {
                "bg-blue-500": index <= currentStep,
                "bg-gray-200": index > currentStep,
            })}>
                {formHeaderLabel.id}
            </div>
            <p className="text-sm text-gray-500">{formHeaderLabel.title}</p>
            <div className={cn("flex w-full h-1 rounded-md", {
                "bg-blue-500": index <= currentStep,
                "bg-gray-200": index > currentStep,
            })}/>
        </div>
    );
}

const MultiStepFormHeader = ({formHeaderLabel, currentStep}: { formHeaderLabel: FormHeaderLabel[], currentStep : number}) => {
    return (
        <div className="flex w-full max-w-2xl mx-auto">
            {
                formHeaderLabel.map((label, index) => (
                    <div key={index} className="flex flex-col items-center justify-center w-full">
                        {<SingleStepFormHeader formHeaderLabel={label} index={index} currentStep={currentStep}/>}
                    </div>
                ))
            }
        </div>
    );
};

export default MultiStepFormHeader;