const base = require('@playwright/test');
import fs from 'fs';

export const test = base.extend({
  sharedData: async ({}, use) => {
    const filePath = 'testData/sharedData.json';

    let data = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
            : {};

            await use(data);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
});