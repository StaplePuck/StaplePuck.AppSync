import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { seasonId } = ctx.args;
  const PK = `SEASON#${seasonId}`;
  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({ PK, SK: PK }),
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  
  return ctx.result;
}
