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
        in: 'header', // Corrected from 'Headers' to 'header'
        name: 'Authorization',
      },
    },
  },
  apis: [path.resolve(__dirname, './controllers/*.ts')],
  security: [{ apiKeyAuth: [] }], // Corrected from [Headers] to []
};
