import { check } from "@shopify/theme-check-node";

async function main() {
  const root = process.cwd();
  const offenses = await check(root);
  console.log(offenses);
}

main();
