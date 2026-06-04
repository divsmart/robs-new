#!/usr/bin/env node

/**
 * Password hash generator for Rob's Food Forest auth
 * 
 * Usage:
 *   node generate-password-hash.mjs <username> <password>
 * 
 * Example:
 *   node generate-password-hash.mjs michael mypassword123
 * 
 * Then add the output to your .env.local USERS variable:
 *   USERS=michael:abc123hash,rob:def456hash
 */

import { createHash } from 'crypto'

const SALT = process.env.PASSWORD_SALT || 'change_this_salt_in_production'

const [,, username, password] = process.argv

if (!username || !password) {
  console.error('Usage: node generate-password-hash.mjs <username> <password>')
  process.exit(1)
}

const hash = createHash('sha256')
  .update(password + SALT)
  .digest('hex')

console.log(`\nUsername : ${username.toLowerCase().trim()}`)
console.log(`Hash     : ${hash}`)
console.log(`\nAdd to .env.local USERS variable as:`)
console.log(`  ${username.toLowerCase().trim()}:${hash}`)
console.log(`\nIf adding to existing users:`)
console.log(`  USERS=existing_user:existing_hash,${username.toLowerCase().trim()}:${hash}`)
