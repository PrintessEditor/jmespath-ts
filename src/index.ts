import Parser from './Parser';
import Lexer from './Lexer';
import TreeInterpreter from './TreeInterpreter';
import {
  ExpressionNodeTree,
  LexerToken,
  JSONValue,
  InputArgument,
  InputSignature,
  RuntimeFunction,
} from './typings/index';

export function compile(expression: string): ExpressionNodeTree {
  const nodeTree = Parser.parse(expression);
  return nodeTree;
}

export function tokenize(expression: string): LexerToken[] {
  return Lexer.tokenize(expression);
}

export const registerFunction = (
  functionName: string,
  customFunction: RuntimeFunction<any, any>,
  signature: InputSignature[],
): void => {
  TreeInterpreter.runtime.registerFunction(functionName, customFunction, signature);
};

export function search(data: JSONValue, expression: string): JSONValue {
  const nodeTree = Parser.parse(expression);
  return TreeInterpreter.search(nodeTree, data);
}

export const jmespath = {
  search,
  compile,
  tokenize,
  registerFunction,
  TYPE_NUMBER: InputArgument.TYPE_NUMBER,
  TYPE_ANY: InputArgument.TYPE_ANY,
  TYPE_STRING: InputArgument.TYPE_STRING,
  TYPE_ARRAY: InputArgument.TYPE_ARRAY,
  TYPE_OBJECT: InputArgument.TYPE_OBJECT,
  TYPE_BOOLEAN: InputArgument.TYPE_BOOLEAN,
  TYPE_EXPREF: InputArgument.TYPE_EXPREF,
  TYPE_NULL: InputArgument.TYPE_NULL,
  TYPE_ARRAY_NUMBER: InputArgument.TYPE_ARRAY_NUMBER,
  TYPE_ARRAY_STRING: InputArgument.TYPE_ARRAY_STRING,
};

export default jmespath;
