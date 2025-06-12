let gridSize = 20;
let cellSize = 30;
let grid = [];
let words = ['PLANTIO', 'AGRICULTURA', 'COLHEITA', 'CAMPO', 'FAZENDA', 'ALIMENTOS', 'COLHEITADEIRA'];
let foundWords = [];
let selectedCells = [];
let selecting = false;
function setup() {
createCanvas(gridSize * cellSize, gridSize * cellSize);
createEmptyGrid();
placeWords();
fillRandomLetters();
}
function draw() {
background(255);
drawGrid();
}
function mousePressed() {
selecting = true;
selectedCells = getCellFromMouse(mouseX, mouseY);
}
function mouseReleased() {
selecting = false;
let endCell = getCellFromMouse(mouseX, mouseY);
let word = getWordFromSelection(selectedCells, endCell);
if (words.includes(word)) {
foundWords.push(word);
}
}
function getCellFromMouse(x, y) {
let row = floor(y / cellSize);
let col = floor(x / cellSize);
return { row, col };
}
function getWordFromSelection(start, end) {
let word = '';

if (start.row === end.row) {
// Horizontal
let row = start.row;
let startCol = min(start.col, end.col);
let endCol = max(start.col, end.col);
for (let c = startCol; c <= endCol; c++) {
word += grid[row][c];
}
} else if (start.col === end.col) {
// Vertical
let col = start.col;
let startRow = min(start.row, end.row);
let endRow = max(start.row, end.row);
for (let r = startRow; r <= endRow; r++) {
word += grid[r][col];
}
}
return word;
}
function drawGrid() {
textAlign(CENTER, CENTER);
textSize(20);
for (let i = 0; i < gridSize; i++) {
for (let j = 0; j < gridSize; j++) {
let highlight = isCellInFoundWord(i, j);
stroke(0);
fill(highlight ? 'rgb(49,53,209)' : "rgb(150,4,145)");
rect(j * cellSize, i * cellSize, cellSize, cellSize);
fill(0);
text(grid[i][j], j * cellSize + cellSize / 2, i * cellSize +
cellSize / 2);
}
}
}
function isCellInFoundWord(row, col) {
for (let word of foundWords) {
for (let i = 0; i < gridSize; i++) {
for (let j = 0; j <= gridSize - word.length; j++) {
// Check horizontal
let found = true;

for (let k = 0; k < word.length; k++) {
if (grid[i][j + k] !== word[k]) {
found = false;
break;
}
}
if (found && row === i && col >= j && col < j + word.length)
return true;
}
}
for (let j = 0; j < gridSize; j++) {
for (let i = 0; i <= gridSize - word.length; i++) {
// Check vertical
let found = true;
for (let k = 0; k < word.length; k++) {
if (grid[i + k][j] !== word[k]) {
found = false;
break;
}
}
if (found && col === j && row >= i && row < i + word.length)
return true;
}
}
}
return false;
}
// Mesmas funções auxiliares de antes:
function createEmptyGrid() {
for (let i = 0; i < gridSize; i++) {
grid[i] = [];
for (let j = 0; j < gridSize; j++) {
grid[i][j] = '';
}
}
}
function placeWords() {
for (let word of words) {
let placed = false;
while (!placed) {

let dir = random(['H', 'V']); // Horizontal ou Vertical
let row = floor(random(gridSize));
let col = floor(random(gridSize));
if (canPlaceWord(word, row, col, dir)) {
for (let i = 0; i < word.length; i++) {
if (dir === 'H') grid[row][col + i] = word[i];
else grid[row + i][col] = word[i];
}
placed = true;
}
}
}
}
function canPlaceWord(word, row, col, dir) {
if (dir === 'H' && col + word.length > gridSize) return false;
if (dir === 'V' && row + word.length > gridSize) return false;
for (let i = 0; i < word.length; i++) {
let cell = dir === 'H' ? grid[row][col + i] : grid[row + i][col];
if (cell !== '' && cell !== word[i]) return false;
}
return true;
}
function fillRandomLetters() {
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
for (let i = 0; i < gridSize; i++) {
for (let j = 0; j < gridSize; j++) {
if (grid[i][j] === '') {
grid[i][j] = letters.charAt(floor(random(letters.length)));
}
}
}
}
