import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma = new PrismaClient();

/* app.get('/', (req: Request, res: Response) => {
  prismaFunctions.main();
  res.send('Express + Typescript Server');
}); */

app.get('/user/:id', async (req: Request, res: Response) => {
  res.status(500);
  // await prisma.$connect();
  // try {
  // const user = await prisma.user.findUniqueOrThrow({
  //   where: {
  //     userId: req.params.id,
  //   },
  // });
  // res.status(200);
  // } catch (error) {
  // res.status(404).send(error);
  // res.send(`Getting User ID: ${req.params.id}`);
  // await prisma.$disconnect();
});

/* // auth router attaches routes to the baseURL: '/'
app.use("/", router); */

export default {
  path: '/api',
  handler: app,
};
