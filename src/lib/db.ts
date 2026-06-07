import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { drizzle as drizzleLibSQL } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

// This function gets the Drizzle instance using the Cloudflare D1 binding.
export function getDb() {
  if (process.env.NODE_ENV === 'development') {
    // In local dev, use a local SQLite file via libsql
    const client = createClient({ url: 'file:local.db' });
    return drizzleLibSQL(client, { schema }) as any;
  } else {
    // @ts-ignore
    const { getRequestContext } = eval('require')('@cloudflare/next-on-pages');
    const d1 = getRequestContext().env.DB;
    if (!d1) {
      throw new Error('D1 Database binding "DB" is not available.');
    }
    return drizzleD1(d1, { schema }) as any;
  }
}
