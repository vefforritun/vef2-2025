/** Lýsing á falli */
function foo() {

}

/**
 * Read a file.
 *
 * @param {string} path - Path to file
 * @returns {Promise<string>} Promise that represents the file content
 */
function readFile(path) {
  return 'data';
}

console.log(foo(), readFile('foo.txt'));
