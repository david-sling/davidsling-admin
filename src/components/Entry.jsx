import { capitalize } from "@material-ui/core";
import React from "react";
import FormInput from "./FormInput";

export default function Entry({ entry, schema, setEntry }) {
  return (
    <section>
      <form id="grid" action="">
        {entry &&
          schema?.fields?.map((item) => {
            return (
              <div className="field" key={item.key}>
                <label htmlFor="">{capitalize(item.key)}</label>
                {schema._readOnly ? (
                  <p>{entry[item.key]}</p>
                ) : (
                  <FormInput
                    setValue={(v) => {
                      setEntry({ ...entry, [item.key]: v });
                    }}
                    value={entry[item.key]}
                    type={schema.fields.find((k) => k.key == item.key).type}
                  />
                )}
              </div>
            );
          })}
        {entry?._dateCreated && (
          <div className="field">
            <label htmlFor="">Created Date</label>
            <p>
              {new Date(entry?._dateCreated?.seconds * 1000).toDateString()}
            </p>
          </div>
        )}
      </form>
    </section>
  );
}
