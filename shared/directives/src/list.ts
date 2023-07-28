import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export function ListDirective(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const list = getDirective(schema, fieldConfig, directiveName)?.[0];
      
      if (list) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        
        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          console.log('[ListDirective] fieldConfig', fieldConfig);
          console.log('[ListDirective] directiveName', directiveName);
          console.log('[ListDirective] list', list);
          console.log('[ListDirective] calling resolver but sending list args in info object');
          console.log('[ListDirective] args', args);
          args.first = 10;
          return resolve(source, args, context, info);
        };
        return fieldConfig;
      }
      return fieldConfig;
    },
  });
}
