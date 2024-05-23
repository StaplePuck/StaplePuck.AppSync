import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { id, ...values } = ctx.arguments.input;
  const PK = `LEAGUE#${id}`;
  const SK = `LEAGUE#${id}`;
  return dynamodbPutRequest({ key: { PK, SK }, values: { ...values, PK, SK, id, type: "LEAGUE" } });
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return ctx.result;
}

function dynamodbPutRequest({ key, values }) {
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues(key),
    attributeValues: util.dynamodb.toMapValues(values)
  };
}