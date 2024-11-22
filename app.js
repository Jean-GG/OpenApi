const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 8082 ;

// Configuración de Swagger JSDoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World API',
      version: '1.0.0',
      description: 'A simple API with JSDoc documentation',
    },
    servers: [
      {
        url: 'http://localhost{$PORT}',
      },
    ],
  },
  apis: ['./app.js'], // Archivos donde están los comentarios JSDoc
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Rutas
/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a Hello World message.
 *     responses:
 *       200:
 *         description: A Hello World response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, World!
 */
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

/**
 * @swagger
 * /docs-json:
 *   get:
 *     summary: Retrieve the OpenAPI documentation in JSON format.
 *     responses:
 *       200:
 *         description: OpenAPI documentation retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 openapi: 3.0.0
 *                 info:
 *                   title: Hello World API
 *                   version: 1.0.0
 *                   description: A simple API with JSDoc documentation
 *                 paths: {}
 */
app.get('/docs-json', (req, res) => {
  res.json(swaggerDocs);
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
  console.log(`API Docs JSON available at http://localhost:${PORT}/docs-json`);
});
