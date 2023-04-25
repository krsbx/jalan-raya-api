import fs from 'fs-extra';
import _ from 'lodash';

export async function readSqlFile(filePath: string) {
  try {
    const sql = await fs.readFile(filePath, 'utf-8');
    const sqls = sql
      .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
      .replace(/\s+/g, ' ') // excess white space
      .split(';');

    return sqls;
  } catch {
    return null;
  }
}

export async function joinSqlFiles(...filePaths: string[]) {
  try {
    const sqls = await Promise.all(filePaths.map(readSqlFile));

    const flatSql = sqls.reduce((prev, curr) => {
      if (!prev || !curr) return [];
      if (!prev && curr) return curr;

      prev.push(...curr);

      return prev;
    }, [] as (string | null)[]);

    return _(flatSql).map(_.trim).compact().value() as unknown as string[];
  } catch {
    return null;
  }
}
