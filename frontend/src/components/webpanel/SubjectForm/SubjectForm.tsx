import FormGroup from "../FormGroup/FormGroup";

export default function SubjectForm({
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
          formLabel="Subject Info."
          inputBox={[
            {
              label: "Contact Subject",
              placeHolder: "Contact Subject",
              state: data,
              setState: onChangeState,
              keyProp: "name",
              type: "input",
              languages: languages,
              required: true,
            },

            {
              label: "End-Point E-mail",
              placeHolder: "E-mail",
              state: data,
              setState: onChangeState,
              keyProp: "email",
              type: "input",
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
