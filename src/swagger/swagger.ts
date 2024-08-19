import path from "path";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API endpoints',
    },
    securityDefinitions: {
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
      },
    },
  },
  apis: [path.resolve(__dirname, './controllers/*.ts')],
  security: [{ apiKeyAuth: [] }],
};
