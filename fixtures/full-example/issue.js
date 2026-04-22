import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const issueBodyPath = resolve(__dirname, "issue-body.md");

export default readFileSync(issueBodyPath, "utf-8");
