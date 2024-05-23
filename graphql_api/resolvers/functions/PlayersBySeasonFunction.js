import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { seasonId } = ctx.args;
  const PK = `SEASON#${seasonId}`;
  return {
    operation: 'Query',
    query: {
      expression: 'PK = :pk and begins_with(SK, :type)',
      expressionValues: util.dynamodb.toMapValues({ ':pk': PK, ':type': 'PLAYER#' }),
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  
  return ctx.result.items;
}
