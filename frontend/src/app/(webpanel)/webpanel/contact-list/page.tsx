"use client";

import { useState, useContext, useEffect, use } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import FormGroup from "@/components/webpanel/FormGroup/FormGroup";
import { FetchContext } from "@/contexts/FetchContext";

export default function ContactListsPage() {
    const envLangs = process.env.NEXT_PUBLIC_LANGUAGES;
    // @ts-ignore
    const languages = envLangs.split(",").map((i: any) => i.toUpperCase());

    const initState: any = {
        nameTH: "",
        addressTH: "",
        telephone: "",
        fax: "",
        email: "",
        gMap: "",
        facebook: "",
        instagram: "",
        line: "",
        line2: "",
    }

    const { onFetchOne, onSave }: any = useContext(FetchContext);
    const [contactState, setContactState] = useState(initState as any);

    const onChangeState = (e: any, field: string) => {
        setContactState((prevState: any) => ({ ...prevState, [field]: e }));
    };

    const fetchData = async () => {
        const result = await onFetchOne("contact-list", null);
        setContactState({...result});
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onCreate = () => {
        onSave(
            contactState,
            "PUT",
            null,
            "contact-list",
            `Update Contact Success`
        );
    };

    return (
        <DefaultLayout>
            <Breadcrumb
                pageName="Contact Info"
                prevPage={{ pageName: "Dashboard", url: "/webpanel" }}
            />
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                    <FormGroup
                        formLabel="List of contact"
                        inputBox={[
                            {
                                label: "Name",
                                placeHolder: "Name",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "name",
                                type: "input",
                                languages: languages,
                            },
                            {
                                label: "Address",
                                placeHolder: "Address",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "address",
                                type: "input",
                                languages: languages,
                            },
                            {
                                label: "Telephone",
                                placeHolder: "Telephone",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "telephone",
                                type: "input",
                            },
                            {
                                label: "Fax",
                                placeHolder: "Fax",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "fax",
                                type: "input",
                            },
                            {
                                label: "Email",
                                placeHolder: "Email",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "email",
                                type: "input",
                            },
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <FormGroup
                        formLabel="Social Media"
                        inputBox={[
                            {
                                label: "Facebook",
                                placeHolder: "Facebook",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "facebook",
                                type: "input",
                            },
                            {
                                label: "Instagram",
                                placeHolder: "Instagram",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "instagram",
                                type: "input",
                            },
                            {
                                label: "Line",
                                placeHolder: "Line",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "line",
                                type: "input",
                            },
                            {
                                label: "Line 2",
                                placeHolder: "Line 2",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "line2",
                                type: "input",
                            },
                            {
                                label: "GoogleMaps",
                                placeHolder: "GoogleMaps",
                                state: contactState,
                                setState: onChangeState,
                                keyProp: "gMap",
                                type: "textArea",
                            },
                        ]}
                    />
                </div>
            </div>
            <button
                onClick={onCreate}
                className="w-full justify-center rounded-lg bg-success p-2 font-medium text-gray hover:bg-opacity-90 mt-5"
            >
                Update
            </button>
        </DefaultLayout>
    );
}
