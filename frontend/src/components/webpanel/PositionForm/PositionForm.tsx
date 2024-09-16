import FormGroup from "../FormGroup/FormGroup";

export default function PositionForm({
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
          formLabel="Edit Job Title"
          inputBox={[
            {
              label: "Job Title",
              placeHolder: "Job Title",
              state: data,
              setState: onChangeState,
              keyProp: "name",
              type: "input",
              languages: languages,
              required: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
