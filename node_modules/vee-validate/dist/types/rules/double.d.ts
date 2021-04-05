import { StringOrNumber, RuleParamSchema } from '../types';
declare type Separators = 'dot' | 'comma';
interface Params {
    decimals?: string | 0;
    separator?: Separators;
}
declare const validate: (value: StringOrNumber | StringOrNumber[], { decimals, separator }?: Params) => boolean;
declare const params: RuleParamSchema[];
export { validate, params };
declare const _default: {
    validate: (value: string | number | (string | number)[], { decimals, separator }?: Params) => boolean;
    params: RuleParamSchema[];
};
export default _default;
