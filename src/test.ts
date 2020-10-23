import * as fs from "fs";
import Dereferencer from "@json-schema-tools/dereferencer";

describe("meta-schema", () => {
  const s = fs.readFileSync("./schema.json", "utf8");
  let schema = false;
  try {
    schema = JSON.parse(s);
  } catch (e) { }

  it("is valid json", () => {
    expect(schema).toBeTruthy();
  });

  it("has references that are valid", async () => {
    expect.assertions(4);
    const deref = new Dereferencer(schema);
    const dereffed = await deref.resolve();
    expect(dereffed).toBeTruthy();
    expect(dereffed.definitions).not.toBeDefined();
    expect(dereffed.properties.methods.items.properties.result.oneOf[0].properties.schema.title).toBe("JSONSchema");
    expect(dereffed.properties.methods.items.properties.result.oneOf[1].title).toBe("referenceObject");
  });
});
