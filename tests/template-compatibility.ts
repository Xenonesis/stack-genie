import { technologyData } from "../src/data/technologies";
import { popularStackTemplates, useCaseRequirementGroups } from "../src/data/stack-templates";
import { StackTemplate } from "../src/types/tech-stack";

export interface TemplateValidationResult {
  duplicateTemplateIds: string[];
  unknownUseCases: string[];
  missingTechIds: Array<{ templateId: string; ids: string[] }>;
  missingRequirements: Array<{ templateId: string; useCase: string; categories: string[] }>;
}

function validateTemplates(templates: StackTemplate[]): TemplateValidationResult {
  const techById = new Map(technologyData.map((tech) => [tech.id, tech]));
  const seenIds = new Set<string>();
  const duplicateTemplateIds: string[] = [];
  const unknownUseCases: string[] = [];
  const missingTechIds: Array<{ templateId: string; ids: string[] }> = [];
  const missingRequirements: Array<{ templateId: string; useCase: string; categories: string[] }> = [];

  for (const template of templates) {
    if (seenIds.has(template.id)) {
      duplicateTemplateIds.push(template.id);
    }
    seenIds.add(template.id);

    const requirementGroups = useCaseRequirementGroups[template.useCase];
    if (!requirementGroups) {
      unknownUseCases.push(`${template.id}:${template.useCase}`);
      continue;
    }

    const missingIds = template.techIds.filter((id) => !techById.has(id));
    if (missingIds.length > 0) {
      missingTechIds.push({ templateId: template.id, ids: missingIds });
    }

    const presentCategories = new Set(
      template.techIds
        .map((id) => techById.get(id)?.category)
        .filter((category): category is string => Boolean(category))
    );

    const missingGroups = requirementGroups.filter(
      (group) => !group.some((category) => presentCategories.has(category))
    );

    if (missingGroups.length > 0) {
      missingRequirements.push({
        templateId: template.id,
        useCase: template.useCase,
        categories: missingGroups.map((group) => group.join(" / ")),
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

function formatValidationError(details: TemplateValidationResult): string {
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
  const validation = validateTemplates(popularStackTemplates);

  const hasIssues =
    validation.duplicateTemplateIds.length > 0 ||
    validation.unknownUseCases.length > 0 ||
    validation.missingTechIds.length > 0 ||
    validation.missingRequirements.length > 0;

  if (hasIssues) {
    throw new Error(formatValidationError(validation));
  }

  console.log(`Validated ${popularStackTemplates.length} templates successfully.`);
}

main();
