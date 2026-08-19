import { technologyData } from "../src/data/technologies";

console.log(`Auditing logos for ${technologyData.length} technologies...`);

let missingCount = 0;
let invalidUrlCount = 0;
let placeholderCount = 0;

for (const tech of technologyData) {
  if (!tech.icon || tech.icon.trim() === '') {
    console.error(`[MISSING ICON] ${tech.id} (${tech.name})`);
    missingCount++;
  } else if (!tech.icon.startsWith('http://') && !tech.icon.startsWith('https://')) {
    console.error(`[INVALID URL] ${tech.id}: ${tech.icon}`);
    invalidUrlCount++;
  } else if (tech.icon.includes('avatars.githubusercontent.com/u/10022570')) {
    console.warn(`[GENERIC PLACEHOLDER] ${tech.id}: ${tech.icon}`);
    placeholderCount++;
  }
}

console.log(`Results:
- Total audited: ${technologyData.length}
- Missing icons: ${missingCount}
- Invalid URLs: ${invalidUrlCount}
- Generic placeholders: ${placeholderCount}
`);

if (missingCount === 0 && invalidUrlCount === 0 && placeholderCount === 0) {
  console.log("All technology logos are valid and configured with specific brand icons!");
  process.exit(0);
} else {
  process.exit(1);
}
