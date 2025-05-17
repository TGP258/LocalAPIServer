import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'db.json');

const app = express();
const port = 3000;

// 允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// 读取并返回整个 db.json
app.get('/api', async (req, res) => {
    try {
        const data = await readFile(dbPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: '读取数据失败' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器已启动: http://localhost:${port}/api`);
    console.log(`直接访问 db.json 内容`);
});