import {
  KoaContext,
  KoaRouteHandler,
  KoaRouteHandlerOptions,
  VariablesMap,
} from '../types/koa';
import Exception, { ExceptionCode } from '../util/error';
import { OperationSchema } from '../util/iam';

const normalizeRequiredRules = <ParamsT = VariablesMap, QueryT = VariablesMap>(
  ctx: KoaContext<ParamsT, QueryT>,
  rules?:
    | OperationSchema
    | OperationSchema[]
    | ((
        ctx: KoaContext<ParamsT, QueryT>
      ) => OperationSchema | OperationSchema[])
) => {
  if (!rules) {
    return null;
  }

  if (typeof rules === 'function') {
    const derivedRules = rules(ctx);
    return Array.isArray(derivedRules) ? derivedRules : [derivedRules];
  }

  return Array.isArray(rules) ? rules : [rules];
};

const handler = <ParamsT = VariablesMap, QueryT = VariablesMap>(
  routeHandler: KoaRouteHandler<ParamsT, QueryT>,
  options?: KoaRouteHandlerOptions<ParamsT, QueryT>
): KoaRouteHandler<ParamsT, QueryT> => async (ctx) => {
  if (options?.schema?.params) {
    const validation = options.schema.params.validate(ctx.params);
    if (validation.error) {
      throw new Exception(ExceptionCode.badRequest, {
        message: 'request params validation failed',
        details: validation.error,
      });
    }
  }

  if (options?.schema?.query) {
    const validation = options.schema.query.validate(ctx.params);
    if (validation.error) {
      throw new Exception(ExceptionCode.badRequest, {
        message: 'request query validation failed',
        details: validation.error,
      });
    }
  }

  if (options?.schema?.body) {
    const validation = options.schema.body.validate(ctx.body);
    if (validation.error) {
      throw new Exception(ExceptionCode.badRequest, {
        message: 'request body validation failed',
        details: validation.error,
      });
    }
  }

  const requiredRules = normalizeRequiredRules<ParamsT, QueryT>(
    ctx,
    options?.requiredRules
  );

  if (requiredRules && !ctx.state.policy?.canExecuteOperations(requiredRules)) {
    throw new Exception(ExceptionCode.forbidden, {
      message: 'request context does not have privilege to execute operation',
      requiredOperations: requiredRules.map((rules) => rules.toJsonObject()),
    });
  }

  await routeHandler(ctx);
};

export default handler;
