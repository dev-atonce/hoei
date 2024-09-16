import FormGroup from "../FormGroup/FormGroup";

export default function AddressForm({
  data,
  onSave,
  languages,
  onChangeState,
  id,
}: any) {
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <FormGroup
          onSave={onSave}
          formLabel="Address Info."
          inputBox={[
            {
              label: "Branch Name",
              placeHolder: "Branch Name",
              state: data,
              setState: onChangeState,
              keyProp: "name",
              type: "input",
              languages: languages,
              required: true,
            },

            {
              label: "Fax",
              placeHolder: "Fax",
              state: data,
              setState: onChangeState,
              keyProp: "fax",
              type: "input",
              required: true,
            },
            {
              label: "Telephone",
              placeHolder: "Telephone",
              state: data,
              setState: onChangeState,
              keyProp: "tel",
              type: "input",
              required: true,
              //   languages: languages,
            },
            {
              label: "Google Map",
              placeHolder: "Google Map URL",
              state: data,
              setState: onChangeState,
              keyProp: "googleMap",
              type: "input",
              required: true,
            },
            {
              label: "Address",
              placeHolder: "Address",
              state: data,
              setState: onChangeState,
              keyProp: "address",
              type: "textArea",
              rows: 3,
              languages: languages,
              required: true,
            },
          ]}
        />
      </div>

      {/* <div className="flex flex-col gap-9">
        <FormGroup
          // modalState={show}
          id={id}
          onSave={onSaveSeo}
          formLabel={"SEO Settings"}
          inputBox={[
            {
              label: "Title",
              placeHolder: "Page Title",
              state: serviceState?.serviceSeo,
              setState: onChangeSeoState,
              keyProp: "title",
              type: "input",
              languages,
            },
            {
              label: "Keywords",
              placeHolder: "META Keywords",
              state: serviceState?.serviceSeo,
              setState: onChangeSeoState,
              keyProp: "keyword",
              type: "input",
              languages,
            },
            {
              label: "Description",
              placeHolder: "META Description",
              state: serviceState?.serviceSeo,
              setState: onChangeSeoState,
              keyProp: "description",
              type: "textArea",
              rows: 3,
              languages,
            },
          ]}
        />
      </div> */}
    </div>
  );
}
