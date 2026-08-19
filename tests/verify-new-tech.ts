import { technologyData, categories } from "../src/data/technologies";

const ids = technologyData.map((tech) => tech.id);
const idSet = new Set<string>();
const duplicates = ids.filter((id) => {
  if (idSet.has(id)) return true;
  idSet.add(id);
  return false;
});

const newTech = technologyData.filter((tech) => tech.skills || tech.compatibleWith);
const dangling = newTech.flatMap((tech) =>
  (tech.compatibleWith ?? []).filter((ref) => !idSet.has(ref)).map((ref) => `${tech.id} -> ${ref}`)
);

const categorySet = new Set(categories);
const unknownCategories = technologyData.filter((tech) => !categorySet.has(tech.category));

console.log(`Total technologies: ${technologyData.length}`);
console.log(`Categories: ${categories.length}`);
console.log(`Entries with skills/compatibleWith metadata: ${newTech.length}`);

if (duplicates.length > 0) {
  console.error(`Duplicate ids introduced or pre-existing: ${[...new Set(duplicates)].join(", ")}`);
}
if (dangling.length > 0) {
  console.error(`Dangling compatibleWith refs in new entries: ${dangling.join(", ")}`);
}
if (unknownCategories.length > 0) {
  console.error(`Entries with unknown category: ${unknownCategories.map((t) => t.id).join(", ")}`);
}

const newIds = newTech.map((tech) => tech.id);
const newDuplicates = newIds.filter((id, index) => ids.lastIndexOf(id) !== ids.indexOf(id) && ids.indexOf(id) < ids.indexOf(newIds[0]));
if (newDuplicates.length > 0) {
  console.error(`New entries collide with existing ids: ${newDuplicates.join(", ")}`);
}

if (dangling.length === 0 && duplicates.length === 0 && newDuplicates.length === 0 && unknownCategories.length === 0) {
  console.log("Integrity check passed for all technologies.");
} else {
  process.exit(1);
}
