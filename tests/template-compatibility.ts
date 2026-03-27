import fs from "node:fs";
import path from "node:path";
import { technologyData } from "../src/data/technologies";

type ParsedTemplate = {
  id: string;
  name: string;
  useCase: string;
  techIds: string[];
};

const useCaseRequirementGroups: Record<string, string[][]> = {
  SaaS: [["Database"], ["Web Framework", "Backend Framework"], ["Hosting", "DevOps/Infrastructure"]],
  AI: [["Database"], ["Backend Framework", "Web Framework"], ["Hosting", "DevOps/Infrastructure"]],
  API: [["Database"], ["Backend Framework", "GraphQL/API", "API Documentation"]],
  Enterprise: [["Database"], ["Monitoring/Observability"], ["Hosting", "DevOps/Infrastructure"]],
  Realtime: [["Database"], ["Real-time", "Message Queues/Event Streaming"]],
  Content: [["Web Framework"], ["CMS", "Search"]],
  Mobile: [["Native Framework", "Web Framework"], ["Database"]],
  "E-commerce": [["Web Framework"], ["Payment"], ["Database", "CMS"]],
  DevTools: [["Web Framework", "Build Tools", "Backend Framework"], ["DevOps/Infrastructure", "Testing", "Hosting"]],
};

function extractPopularStacksBlock(fileContent: string): string {
  const startMarker = "const popularStacks = useMemo<StackTemplate[]>(() => [";
  const endMarker = "], []);";

  const startIndex = fileContent.indexOf(startMarker);
  if (startIndex === -1) {
    throw new Error("Could not find popularStacks definition start marker.");
  }

  const endIndex = fileContent.indexOf(endMarker, startIndex);
  if (endIndex === -1) {
    throw new Error("Could not find popularStacks definition end marker.");
  }

  return fileContent.slice(startIndex, endIndex + endMarker.length);
}

function parseTemplates(stacksBlock: string): ParsedTemplate[] {
  const templateRegex = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?useCase:\s*"([^"]+)"[\s\S]*?techIds:\s*\[([^\]]*)\][\s\S]*?\}/g;
  const templates: ParsedTemplate[] = [];

  let match = templateRegex.exec(stacksBlock);
  while (match) {
    const [, id, name, useCase, techIdsRaw] = match;
    const techIds = Array.from(techIdsRaw.matchAll(/"([^"]+)"/g)).map((item) => item[1]);

    templates.push({ id, name, useCase, techIds });
    match = templateRegex.exec(stacksBlock);
  }

  if (templates.length === 0) {
    throw new Error("No templates were parsed from popularStacks block.");
  }

  return templates;
}

function validateTemplates(templates: ParsedTemplate[]) {
  const techById = new Map(technologyData.map((tech) => [tech.id, tech]));
  const seenTemplateIds = new Set<string>();

  const duplicateTemplateIds: string[] = [];
  const unknownUseCases: string[] = [];
  const missingTechIds: Array<{ templateId: string; ids: string[] }> = [];
  const missingRequirements: Array<{ templateId: string; useCase: string; categories: string[] }> = [];

  for (const template of templates) {
    if (seenTemplateIds.has(template.id)) {
      duplicateTemplateIds.push(template.id);
    }
    seenTemplateIds.add(template.id);

    if (!useCaseRequirementGroups[template.useCase]) {
      unknownUseCases.push(`${template.id}:${template.useCase}`);
      continue;
    }

    const unresolvedIds = template.techIds.filter((techId) => !techById.has(techId));
    if (unresolvedIds.length > 0) {
      missingTechIds.push({ templateId: template.id, ids: unresolvedIds });
      continue;
    }

    const categories = new Set(
      template.techIds
        .map((techId) => techById.get(techId)?.category)
        .filter((category): category is string => Boolean(category))
    );

    const unresolvedCategories = useCaseRequirementGroups[template.useCase]
      .filter((requiredGroup) => !requiredGroup.some((category) => categories.has(category)))
      .map((requiredGroup) => requiredGroup.join(" / "));

    if (unresolvedCategories.length > 0) {
      missingRequirements.push({
        templateId: template.id,
        useCase: template.useCase,
        categories: unresolvedCategories,
      });
    }
  }

  return {
    duplicateTemplateIds,
    unknownUseCases,
    missingTechIds,
    missingRequirements,
  };
}

function formatValidationError(details: ReturnType<typeof validateTemplates>): string {
  const lines: string[] = ["Template compatibility validation failed:"];

  if (details.duplicateTemplateIds.length > 0) {
    lines.push(`- Duplicate template IDs: ${details.duplicateTemplateIds.join(", ")}`);
  }

  if (details.unknownUseCases.length > 0) {
    lines.push(`- Unknown use cases: ${details.unknownUseCases.join(", ")}`);
  }

  if (details.missingTechIds.length > 0) {
    for (const issue of details.missingTechIds) {
      lines.push(`- ${issue.templateId} has unknown technology IDs: ${issue.ids.join(", ")}`);
    }
  }

  if (details.missingRequirements.length > 0) {
    for (const issue of details.missingRequirements) {
      lines.push(
        `- ${issue.templateId} (${issue.useCase}) missing required categories: ${issue.categories.join(", ")}`
      );
    }
  }

  return lines.join("\n");
}

function main() {
  const targetFile = path.join(process.cwd(), "src", "components", "tech-stack-builder.tsx");
  const fileContent = fs.readFileSync(targetFile, "utf8");

  const stacksBlock = extractPopularStacksBlock(fileContent);
  const templates = parseTemplates(stacksBlock);
  const validation = validateTemplates(templates);

  const hasIssues =
    validation.duplicateTemplateIds.length > 0 ||
    validation.unknownUseCases.length > 0 ||
    validation.missingTechIds.length > 0 ||
    validation.missingRequirements.length > 0;

  if (hasIssues) {
    throw new Error(formatValidationError(validation));
  }

  console.log(`Validated ${templates.length} templates successfully.`);
}

main();
