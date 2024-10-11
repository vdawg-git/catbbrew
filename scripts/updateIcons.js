import { execSync } from "child_process"
import { cp, mkdirSync, existsSync } from "fs"

const gitDirectory = "./.tmp/icons-git"
const exists = existsSync(gitDirectory)

if (exists) {
	execSync(`cd ${gitDirectory} && git reset --hard --recurse-submodules && git pull -f`)
} else {
	mkdirSync(gitDirectory, { recursive: true })
	execSync(`git clone --depth=1 https://github.com/hyprwm/hyprland-wiki ${gitDirectory}`)
}

cp(`${gitDirectory}/icons/variable/`, "./src/lib/icons/")
