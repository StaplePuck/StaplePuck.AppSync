import { util } from '@aws-appsync/utils';

export function request(ctx) {  
  const { id, seasonId, ...values } = ctx.arguments.input;
  const PK = `SEASON#${seasonId}`;
  const SK = `TEAM#${id}`;
  return dynamodbPutRequest({ key: { PK, SK }, values: { ...values, PK, SK, id, seasonId, type: "TEAM" } });
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