import {
  PropertyDeclarationStructure,
  OptionalKind,
  Project,
  GetAccessorDeclarationStructure,
  SetAccessorDeclarationStructure,
  Writers,
  MethodDeclarationStructure,
} from "ts-morph";
import path from "path";

import { outputsFolderName, inputsFolderName } from "./config";
import {
  generateTypeGraphQLImport,
  generateInputsImports,
  generateEnumsImports,
  generateArgsImports,
  generateGraphQLScalarsImport,
  generatePrismaNamespaceImport,
  generateOutputsImports,
  generateCustomScalarsImport,
} from "./imports";
import { DmmfDocument } from "./dmmf/dmmf-document";
import { DMMF } from "./dmmf/types";
import { GeneratorOptions } from "./options";
import { pascalCase } from "./helpers";

export function generateOutputTypeClassFromType(
  project: Project,
  dirPath: string,
  type: DMMF.OutputType,
  dmmfDocument: DmmfDocument,
) {
  const fileDirPath = path.resolve(dirPath, outputsFolderName);
  const filePath = path.resolve(fileDirPath, `${type.typeName}.ts`);
  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });
  const fieldArgsTypeNames = type.fields
    .filter(it => it.argsTypeName)
    .map(it => it.argsTypeName!);

  generateTypeGraphQLImport(sourceFile);
  generateGraphQLScalarsImport(sourceFile);
  generatePrismaNamespaceImport(sourceFile, dmmfDocument.options, 2);
  generateCustomScalarsImport(sourceFile, 2);
  generateArgsImports(sourceFile, fieldArgsTypeNames, 0);
  generateOutputsImports(
    sourceFile,
    type.fields
      .filter(field => field.outputType.location === "outputObjectTypes")
      .map(field => field.outputType.type),
    1,
  );
  generateEnumsImports(
    sourceFile,
    type.fields
      .map(field => field.outputType)
      .filter(fieldType => fieldType.location === "enumTypes")
      .map(fieldType => fieldType.type),
    2,
  );

  sourceFile.addClass({
    name: type.typeName,
    isExported: true,
    decorators: [
      {
        name: "ObjectType",
        arguments: [
          `"${type.typeName}"`,
          Writers.object({
            isAbstract: "true",
            ...(dmmfDocument.options.simpleResolvers && {
              simpleResolvers: "true",
            }),
          }),
        ],
      },
    ],
    properties: [
      ...type.fields
        .filter(field => field.argsTypeName === undefined)
        .map<OptionalKind<PropertyDeclarationStructure>>(field => ({
          name: field.name,
          type: field.fieldTSType,
          hasExclamationToken: true,
          hasQuestionToken: false,
          trailingTrivia: "\r\n",
          decorators: [
            {
              name: "Field",
              arguments: [
                `_type => ${field.typeGraphQLType}`,
                Writers.object({
                  nullable: `${!field.isRequired}`,
                }),
              ],
            },
          ],
        })),
      ...type.fields
        .filter(field => field.argsTypeName)
        .map<OptionalKind<PropertyDeclarationStructure>>(field => ({
          name: field.name,
          type: field.fieldTSType,
          hasExclamationToken: true,
          hasQuestionToken: false,
          // trailingTrivia: "\r\n",
        })),
    ],
    methods: type.fields
      .filter(field => field.argsTypeName)
      .map<OptionalKind<MethodDeclarationStructure>>(field => ({
        name: `get${pascalCase(field.name)}`,
        returnType: field.fieldTSType,
        trailingTrivia: "\r\n",
        decorators: [
          {
            name: "Field",
            arguments: [
              `_type => ${field.typeGraphQLType}`,
              Writers.object({
                name: `"${field.name}"`,
                nullable: `${!field.isRequired}`,
              }),
            ],
          },
        ],
        parameters: [
          {
            name: "root",
            type: type.typeName,
            decorators: [{ name: "Root", arguments: [] }],
          },
          {
            name: "args",
            type: field.argsTypeName,
            decorators: [{ name: "Args", arguments: [] }],
          },
        ],
        statements: [Writers.returnStatement(`root.${field.name}`)],
      })),
  });
}

export function generateInputTypeClassFromType(
  project: Project,
  dirPath: string,
  inputType: DMMF.InputType,
  _dmmfDocument: DmmfDocument,
  options: GeneratorOptions,
) {
  const filePath = path.resolve(
    dirPath,
    inputsFolderName,
    `${inputType.typeName}.ts`,
  );
  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });

  generateTypeGraphQLImport(sourceFile);
  generateGraphQLScalarsImport(sourceFile);
  generatePrismaNamespaceImport(sourceFile, options, 2);
  generateCustomScalarsImport(sourceFile, 2);
  generateInputsImports(
    sourceFile,
    inputType.fields
      .filter(field => field.selectedInputType.location === "inputObjectTypes")
      .map(field => field.selectedInputType.type)
      .filter(fieldType => fieldType !== inputType.typeName),
  );
  generateEnumsImports(
    sourceFile,
    inputType.fields
      .map(field => field.selectedInputType)
      .filter(fieldType => fieldType.location === "enumTypes")
      .map(fieldType => fieldType.type as string),
    2,
  );

  const fieldsToEmit = inputType.fields.filter(field => !field.isOmitted);
  const mappedFields = fieldsToEmit.filter(field => field.hasMappedName);

  sourceFile.addClass({
    name: inputType.typeName,
    isExported: true,
    decorators: [
      {
        name: "InputType",
        arguments: [
          `"${inputType.typeName}"`,
          Writers.object({
            isAbstract: "true",
          }),
        ],
      },
    ],
    properties: fieldsToEmit.map<OptionalKind<PropertyDeclarationStructure>>(
      field => {
        return {
          name: field.name,
          type: field.fieldTSType,
          hasExclamationToken: !!field.isRequired,
          hasQuestionToken: !field.isRequired,
          trailingTrivia: "\r\n",
          decorators: field.hasMappedName
            ? []
            : [
                {
                  name: "Field",
                  arguments: [
                    `_type => ${field.typeGraphQLType}`,
                    Writers.object({
                      nullable: `${!field.isRequired}`,
                    }),
                  ],
                },
              ],
        };
      },
    ),
    getAccessors: mappedFields.map<
      OptionalKind<GetAccessorDeclarationStructure>
    >(field => {
      return {
        name: field.typeName,
        type: field.fieldTSType,
        hasExclamationToken: field.isRequired,
        hasQuestionToken: !field.isRequired,
        trailingTrivia: "\r\n",
        statements: [`return this.${field.name};`],
        decorators: [
          {
            name: "Field",
            arguments: [
              `_type => ${field.typeGraphQLType}`,
              Writers.object({
                nullable: `${!field.isRequired}`,
              }),
            ],
          },
        ],
      };
    }),
    setAccessors: mappedFields.map<
      OptionalKind<SetAccessorDeclarationStructure>
    >(field => {
      return {
        name: field.typeName,
        type: field.fieldTSType,
        hasExclamationToken: field.isRequired,
        hasQuestionToken: !field.isRequired,
        trailingTrivia: "\r\n",
        parameters: [{ name: field.name, type: field.fieldTSType }],
        statements: [`this.${field.name} = ${field.name};`],
      };
    }),
  });
}
