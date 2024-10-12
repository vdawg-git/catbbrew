import { execSync } from "child_process"
import { mkdirSync, existsSync, cpSync, readdirSync, renameSync } from "fs"
import { replaceInFileSync } from "replace-in-file"
import { join } from "path"

//! To be executed via `pnpm updateIcons`

const gitDirectory = "./.tmp/icons-git"
const iconsDirectory = "./src/lib/icons/"
const exists = existsSync(gitDirectory)

if (exists) {
	execSync(`cd ${gitDirectory} && git reset --hard --recurse-submodules && git pull -f`)
} else {
	mkdirSync(gitDirectory, { recursive: true })
	execSync(`git clone --depth=1 https://github.com/catppuccin/vscode-icons.git ${gitDirectory}`)
}

cpSync(`${gitDirectory}/icons/css-variables/`, iconsDirectory, { recursive: true })

// we need three $$$ as string.replace will otherwise just give one $ ?
const restString = "{...$$$restProps}"
replaceInFileSync({
	files: iconsDirectory + "*.svg",
	from: [
		/var\(--vscode-ctp-/g,
		'width="16" height="16"',
		`<svg xmlns="http://www.w3.org/2000/svg"`
	],
	to: [
		"rgb(var(--",
		"",
		`<script lang="ts"> type $$Props = Partial<SVGImageElement & { class: string }> </script>

<svg xmlns="http://www.w3.org/2000/svg" ${restString} `
	]
})

const filePaths = readdirSync(iconsDirectory)
const renameFrom = ".svg"
const renameTo = ".svelte"

for (const filePath of filePaths) {
	if (!filePath.endsWith(".svg")) continue

	const newFilePath = join(iconsDirectory, filePath.replace(renameFrom, renameTo))
	const currentPath = join(iconsDirectory, filePath)

	renameSync(currentPath, newFilePath)
}

console.log("Updated icons")
