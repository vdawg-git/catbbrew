import { execSync } from "child_process"
import { mkdirSync, existsSync, cpSync } from "fs"
import { replaceInFileSync } from "replace-in-file"

const gitDirectory = "./.tmp/icons-git"
const targetDirectory = "./src/lib/icons/"
const exists = existsSync(gitDirectory)

if (exists) {
	execSync(`cd ${gitDirectory} && git reset --hard --recurse-submodules && git pull -f`)
} else {
	mkdirSync(gitDirectory, { recursive: true })
	execSync(`git clone --depth=1 https://github.com/catppuccin/vscode-icons.git ${gitDirectory}`)
}

cpSync(`${gitDirectory}/icons/css-variables/`, targetDirectory, { recursive: true })

replaceInFileSync({ files: targetDirectory + "*.svg", from: /--vscode-ctp-/g, to: "--" })

console.log("Updated icons")
