/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  readPackageUp,
  type PackageJson as BasePackageJson,
} from 'read-package-up';
import { fileURLToPath } from 'url';
import path from 'path';

export type PackageJson = BasePackageJson & {
  config?: {
    sandboxImageUri?: string;
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let packageJson: PackageJson | null = null;

export async function getPackageJson(): Promise<PackageJson | null> {
  if (packageJson) {
    return packageJson;
  }

  const result = await readPackageUp({ cwd: __dirname });
  if (!result) {
    // TODO: Maybe bubble this up as an error.
    return null;
  }

  packageJson = result.packageJson;
  return packageJson;
}
