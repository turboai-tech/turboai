/**
 * define the api config schema.
 */
type ApiConfigSchema = {
  name: string;
  baseUrl: string;
  auth: {
    apiKey: string;
    apiSecret: string;
  };
};

export const apiConfig: ApiConfigSchema = {
  name: 'mac-ai',
  baseUrl: 'https://dev01-aigc-apisix.tec-develop.cn/mac-ai-dev',
  auth: {
    apiKey: 'GtNupNk2HTZEEnEw',
    apiSecret: 'dwnhC0l91uVntoLGKv3Qh2dv0mwnTmyQ',
  },
};
