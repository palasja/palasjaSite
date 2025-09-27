import fs from 'node:fs/promises';
import express from 'express';
import robots from 'express-robots-txt';
import sirv from 'sirv';
import compression from 'compression';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3004;
const base = process.env.BASE || '/';

const app = express();

// Cached production assets
// const templateHtml =  await fs.readFile('./dist/client/index.html', 'utf-8');

// app.use('*', async (req, res) => {
//     res.status(200).json({r:2});
// });
// Create http server

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {

//   const { createServer } = await import('vite');
//   vite = await createServer({
//     server: { middlewareMode: true },
//     appType: 'custom',
//     base,
//   });
//   app.use(vite.middlewares);
} else {
//   const compression = (await import('compression')).default;
//   const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// app.use(
//   robots(
//     botList.map((s) => {
//       return { UserAgent: s, Disallow: '' };
//     })
//   )
// );
// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');
    let template;
    let render;
    let getFeedback;
    let getServices;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      const { fetchFeedback } = await vite.ssrLoadModule('/src/ssrApiFunction.tsx');
      const { fetchServices } = await vite.ssrLoadModule('/src/ssrApiFunction.tsx');
      getFeedback = fetchFeedback;
      getServices = fetchServices;
    } else {
      template = await fs.readFile('./dist/client/index.html', 'utf-8');
      render = (await import('./dist/server/entry-server.js')).render;

      const { fetchFeedback } = await import('./dist/ssrApiFunction/ssrApiFunction.js');
      const { fetchServices } = await import('./dist/ssrApiFunction/ssrApiFunction.js');
      getFeedback = fetchFeedback;
      getServices = fetchServices;
    }
    const feedback = await getFeedback();
    const services = await getServices();
    const data = { feedback: feedback, services: services };
    const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;
    const html = template.replace(`<!--app-html-->`, `${render(data)} ${script}` ?? '');
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
//// ================>>Dynamic import not working on server, uncomment for local runninig
// import fs from 'node:fs/promises';
// import express from 'express';
// import robots from 'express-robots-txt';

// // Constants
// const isProduction = process.env.NODE_ENV === 'production';
// const port = process.env.PORT || 3004;
// const base = process.env.BASE || '/';


// // Cached production assets
// const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';

// // Create http server
// const app = express();

// // Add Vite or respective production middlewares
// let vite;
// if (!isProduction) {
//   const { createServer } = await import('vite');
//   vite = await createServer({
//     server: { middlewareMode: true },
//     appType: 'custom',
//     base,
//   });
//   app.use(vite.middlewares);
// } else {
//   const compression = (await import('compression')).default;
//   const sirv = (await import('sirv')).default;
//   app.use(compression());
//   app.use(base, sirv('./dist/client', { extensions: [] }));
// }

// // app.use(
// //   robots(
// //     botList.map((s) => {
// //       return { UserAgent: s, Disallow: '' };
// //     })
// //   )
// // );
// // Serve HTML
// app.use('*', async (req, res) => {
//   try {
//     const url = req.originalUrl.replace(base, '');
//     let template;
//     let render;
//     let getFeedback;
//     let getServices;
//     if (!isProduction) {
//       // Always read fresh template in development
//       template = await fs.readFile('./index.html', 'utf-8');
//       template = await vite.transformIndexHtml(url, template);
//       render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
//       const { fetchFeedback } = await vite.ssrLoadModule('/src/ssrApiFunction.tsx');
//       const { fetchServices } = await vite.ssrLoadModule('/src/ssrApiFunction.tsx');
//       getFeedback = fetchFeedback;
//       getServices = fetchServices;
//     } else {
//       template = templateHtml;
//       render = (await import('./dist/server/entry-server.js')).render;

//       const { fetchFeedback } = await import('./dist/ssrApiFunction/ssrApiFunction.js');
//       const { fetchServices } = await import('./dist/ssrApiFunction/ssrApiFunction.js');
//       getFeedback = fetchFeedback;
//       getServices = fetchServices;
//     }
//     const feedback = await getFeedback();
//     const services = await getServices();
//     const data = { feedback: feedback, services: services };
//     const script = `<script>window.__data__=${JSON.stringify(data)}</script>`;
//     const html = template.replace(`<!--app-html-->`, `${render(data)} ${script}` ?? '');
//     res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
//   } catch (e) {
//     vite?.ssrFixStacktrace(e);
//     console.log(e.stack);
//     res.status(500).end(e.stack);
//   }
// });

// // Start http server
// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`);
// });
