/**
 * Integration test example for the `post` router
 */
import { expect, test } from '@playwright/test';
import { File } from 'buffer';
import { createContextInner } from '../context';
import { createCaller } from './_app';
import { MadeFrom, MaterialType } from './material';

test('material enums', async () => {
//   const ctx = await createContextInner({});
//   const caller = createCaller(ctx);

  expect(MaterialType.MATERIAL_TYPE_TEXT).toBe(1);
  expect(MaterialType.MATERIAL_TYPE_IMAGE).toBe(2);
  expect(MaterialType.MATERIAL_TYPE_VIDEO).toBe(3);
  expect(MaterialType.MATERIAL_TYPE_AUDIO).toBe(4);
  console.log(Object.keys(MaterialType));
});


test('material create with video file', async () => {
  const ctx = await createContextInner({});
  const caller = createCaller(ctx);

  // 创建真实的文件内容
  const fileContent = Buffer.from('fake video content');
  const file = new File([fileContent], 'test.mp4', { 
    type: 'video/mp4',
    lastModified: Date.now()
  });

  const material = await caller.material.create_material({ file });

  expect(material).toBeDefined();
  expect(material.id).toBeDefined();
  expect(material.name).toBe('test.mp4');
  expect(material.type).toBe(MaterialType.MATERIAL_TYPE_VIDEO);
  expect(material.made_from).toBe(MadeFrom.MADE_FROM_USER);
  expect(material.metadata.size).toBeGreaterThan(0);
});
