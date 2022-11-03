"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
async function bootstrap() {
    const fastify = (0, fastify_1.default)({
        logger: true,
    });
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();
        return { count };
    });
    await fastify.listen({ port: 3333 });
}
bootstrap();
