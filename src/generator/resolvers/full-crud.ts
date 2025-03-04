import { OptionalKind, MethodDeclarationStructure, Project } from "ts-morph";
import path from "path";

import { resolversFolderName, crudResolversFolderName } from "../config";
import {
  generateTypeGraphQLImport,
  generateArgsImports,
  generateModelsImports,
  generateOutputsImports,
  generateGraphQLFieldsImport,
  generateHelpersFileImport,
} from "../imports";
import { generateCrudResolverClassMethodDeclaration } from "./helpers";
import { DmmfDocument } from "../dmmf/dmmf-document";
import { DMMF } from "../dmmf/types";

export default function generateCrudResolverClassFromMapping(
  project: Project,
  baseDirPath: string,
  mapping: DMMF.ModelMapping,
  model: DMMF.Model,
  dmmfDocument: DmmfDocument,
) {
  const resolverDirPath = path.resolve(
    baseDirPath,
    resolversFolderName,
    crudResolversFolderName,
    model.typeName,
  );
  const filePath = path.resolve(resolverDirPath, `${mapping.resolverName}.ts`);
  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });

  generateTypeGraphQLImport(sourceFile);
  generateGraphQLFieldsImport(sourceFile);
  generateArgsImports(
    sourceFile,
    mapping.actions
      .filter(it => it.argsTypeName !== undefined)
      .map(it => it.argsTypeName!),
    0,
  );
  generateHelpersFileImport(sourceFile, 3);

  const distinctOutputTypesNames = [
    ...new Set(mapping.actions.map(it => it.outputTypeName)),
  ];
  const modelOutputTypeNames = distinctOutputTypesNames.filter(typeName =>
    dmmfDocument.isModelTypeName(typeName),
  );
  const otherOutputTypeNames = distinctOutputTypesNames.filter(
    typeName => !dmmfDocument.isModelTypeName(typeName),
  );
  generateModelsImports(sourceFile, modelOutputTypeNames, 3);
  generateOutputsImports(sourceFile, otherOutputTypeNames, 2);

  sourceFile.addClass({
    name: mapping.resolverName,
    isExported: true,
    decorators: [
      {
        name: "Resolver",
        arguments: [`_of => ${model.typeName}`],
      },
    ],
    methods: mapping.actions.map<OptionalKind<MethodDeclarationStructure>>(
      action =>
        generateCrudResolverClassMethodDeclaration(
          action,
          mapping,
          dmmfDocument,
        ),
    ),
  });
}
