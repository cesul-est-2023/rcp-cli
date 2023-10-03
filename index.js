#! /usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'fs-extra'
import child_process from 'child_process'
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const argv = yargs(hideBin(process.argv)).command({
    command: 'create <name>',
    describe: 'Cria um novo projeto Node.js com Jest',
    handler: async (argv) => {
      const { name } = argv;
      await createProject(name);
  }
}).argv;

async function createProject(name) {
    if (fs.existsSync(name)) {
        console.error(`O diretório "${name}" já existe.`);
        return;
    }

    fs.mkdirSync(name);
    fs.copyFileSync(`${__dirname}/template/jest.config.js`, `${name}/jest.config.js`);

    process.chdir(name);
    fs.mkdirSync("__tests__");

    fs.writeFileSync('package.json', JSON.stringify({
        name,
        version: '1.0.0',
        main: "index.js",
        scripts: {
            test: 'jest'
        },
        license: "ISC"
    }, null, 2));

    child_process.execSync('npm install jest @types/jest --save-dev', { stdio: 'inherit' });

    console.log('Projeto criado com sucesso!');
}
