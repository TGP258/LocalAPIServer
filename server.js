// import express from 'express';
// import { readFile } from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';
//
// // 获取当前目录路径
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const dbPath = path.join(__dirname, 'db.json');
// const updatePath = path.join(__dirname, 'update.json');
//
// const app = express();
// const port = 3000;
//
// // 允许跨域
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
//
// // 读取并返回整个 db.json
// app.get('/db.json', async (req, res) => {
//     try {
//         const data = await readFile(dbPath, 'utf-8');
//         res.setHeader('Content-Type', 'application/json');
//         res.json(JSON.parse(data));
//     } catch (err) {
//         res.status(500).json({ error: '读取数据失败' });
//     }
// });
//
// app.get('/update.json', async (req, res) => {
//     try {
//         const data = await readFile(updatePath, 'utf-8');
//         const parsedData = JSON.parse(data);
//         // 替换 \n 为真正的换行符（如果有）
//         if (parsedData.apk_info) {
//             parsedData.apk_info = parsedData.apk_info.replace(/\\n/g, '\n');
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.json(parsedData);
//     } catch (err) {
//         res.status(500).json({ error: '读取数据失败' });
//     }
// });
//
// // 启动服务器
// app.listen(port, () => {
//     console.log(`服务器已启动: http://localhost:${port}`);
//     console.log(`访问 db.json 内容: http://localhost:${port}/db.json`);
//     console.log(`访问 update.json 内容: http://localhost:${port}/update.json`);
// });
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'db.json');
const updatePath = path.join(__dirname, 'update.json');

const app = express();
const port = 3000;

// 允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// 直接返回 db.json 文件
app.get('/db.json', (req, res) => {
    res.sendFile(dbPath, {
        headers: { 'Content-Type': 'application/json' }
    });
});

// 直接返回 update.json 文件
app.get('/update.json', (req, res) => {
    res.sendFile(updatePath, {
        headers: { 'Content-Type': 'application/json' }
    });
});

app.listen(port, () => {
    console.log(`服务器已启动: http://localhost:${port}`);
    console.log(`访问 db.json: http://localhost:${port}/db.json`);
    console.log(`访问 update.json: http://localhost:${port}/update.json`);
});