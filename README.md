# lpb-to-polaria-csv

Small tool that converts XLSX exports from Le Petit Martin / La Petite Mariane, to Polaria Tech compatible CSV Import file.

## To run:
deno run --allow-read --allow-write main.ts

## To compile
deno task build

## For reference

deno compile  --target aarch64-apple-darwin -o execs/converter_Mac_ARM --allow-read --allow-import --allow-write main.ts && deno compile  --target x86_64-apple-darwin -o execs/converter_Mac_Intel --allow-read --allow-import --allow-write main.ts && deno compile  --target x86_64-unknown-linux-gnu -o execs/converter_Linux_x86 --allow-read --allow-import --allow-write main.ts && deno compile  --target aarch64-unknown-linux-gnu -o execs/converter_Linux_Arm --allow-read --allow-import --allow-write main.ts && deno compile  --target x86_64-pc-windows-msvc -o execs/converter_Windows --allow-read --allow-import --allow-write main.ts

## Usage
It requires a XLSX file named `input.xlsx` formated just like the LPB export file.