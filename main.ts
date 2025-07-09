import XLSX from 'xlsx';
import * as path from "jsr:@std/path";

console.log(`
PPPPPP   oooo  ll      aa aa  rrrrr   iiiii    aa aa
PP   PP oo  oo ll     aa  aa rr  rr    i      aa  aa
PPPPPP  oo  oo ll     aaaaaa rrrrr     i      aaaaaa
PP      oo  oo ll     aa  aa rr rr     i      aa  aa
PP       oooo  llllll aa  aa rr  rr  iiiii    aa  aa
    `);


try {
  await Deno.remove(path.dirname(Deno.execPath()) + '/output.csv');
} catch (err) {
  if (!(err instanceof Deno.errors.NotFound)) {
    throw err;
  }
}

const docs = XLSX.readFile(path.dirname(Deno.execPath()) + '/input.xlsx')
const sheetName = docs.SheetNames[0]
const sheet = docs.Sheets[sheetName]
let json = XLSX.utils.sheet_to_json(sheet)

const categories: string[] = []
let currentRowId = 1
let storedContent = ''

json.reverse().forEach((row: any) => {
  if(row.Niveau > 1) {
    storedContent = row.Titre + ' : ' + '\n' + row['Réponse'] + '\n' + storedContent
    row.toKeep = false
  } else {
    row.ID = currentRowId
    currentRowId++
    let categoryId = categories.indexOf(row.Categories)
    if(categoryId === -1) {
      categoryId = categories.length
      categories.push(row.Categories)
    }

    row['Réponse'] += storedContent
    storedContent = ''

    row['category_id'] = categoryId
    delete row["Phrases d'entraînement"]
    row['language'] = 'fr'
    row.toKeep = true
  }
})

json = json.filter((row: any) => row.toKeep)

const newSheet = XLSX.utils.json_to_sheet(json);
const csv = XLSX.utils.sheet_to_csv(newSheet);

await Deno.writeTextFile(path.dirname(Deno.execPath()) + '/output.csv', csv);

console.log('Convertion done, check output.csv for the results')