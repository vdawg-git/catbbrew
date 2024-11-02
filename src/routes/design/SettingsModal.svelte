<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button"
	import { cn } from "$lib/utils"
	import { syntaxThemeInput$ } from "$lib/shiki"
	import * as Dialog from "$lib/components/ui/dialog"
	import { Trigger } from "$lib/components/ui/accordion"
</script>

<Dialog.Root open>
	<Dialog.Trigger class="text-subtext0 hover:text-text" aria-label="Settings" title="Settings">
		<div class="i-mingcute-settings-3-line size-5"></div>
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header class="flex flex-col mb-1 gap1">
			<Dialog.Title>Settings ⚙️</Dialog.Title>
		</Dialog.Header>

		<div class="flex p-4 rounded-lg gap-4 border flex-col">
			<div class="flex flex-col gap-1">
				<h2 class="font-medium">Custom syntax highlighting</h2>
				<p class="text-muted-foreground">
					Use highlighting rules from a VS Code theme file. The file must use Catppuccin Mocha
					colors or Catppuccin color names for its values.
				</p>
			</div>
			<label
				class={cn(
					buttonVariants({
						variant: "outline",
						className: "p-4 border grow rounded-xl border-mauve"
					})
				)}
			>
				📁 Upload theme file..
				<input
					type="file"
					class="sr-only"
					id="theme-upload"
					onchange={async (e) => {
						// @ts-ignore
						const file: File | undefined = e.target!.files?.[0]
						if (!file) return
						const theme = await file.text().catch(() => undefined)
						if (!theme) return

						syntaxThemeInput$.next(theme)
					}}
				/>
			</label>
		</div>
	</Dialog.Content>
</Dialog.Root>
