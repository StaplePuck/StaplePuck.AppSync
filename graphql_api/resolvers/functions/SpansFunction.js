import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { leagueId } = ctx.args;
  const PK = `LEAGUE#${leagueId}`;
  return {
    operation: 'Query',
    query: {
      expression: 'PK = :pk and begins_with(SK, :type)',
      expressionValues: util.dynamodb.toMapValues({ ':pk': PK, ':type': 'SPAN#' }),
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  
  return ctx.result.items;
}
