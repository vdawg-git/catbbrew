import { derived, writable } from "svelte/store"

import Rust from "$lib/icons/rust.svelte"
import Typescript from "$lib/icons/typescript.svelte"
import type { Component } from "svelte"

type Language = {
	display: string
	text: string
	icon: Component
}

export type LanguageName = "typescript" | "rust"

export const languages: Record<LanguageName, Language> = {
	typescript: {
		display: "Typescript",
		icon: Typescript,
		text: `
// Click on the code to change the color 
// Or use the sidebar to the right :)
// You can also edit the code here and paste your own. 

import { createHighlighter } from 'shiki'
import { type VariantProps, tv } from "tailwind-variants"
import type { Button as ButtonPrimitive } from "bits-ui"
import Root from "./button.svelte"

// \`createHighlighter\` is async, it initializes the internal and
// loads the themes and languages specified.
const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript'],
})

type Highlighter = ReturnType<typeof createHighlighter>
const regex = /([A-Z])\w+/g
const a = 1 + 1

// then later you can use \`highlighter.codeToHtml\` synchronously
// with the loaded themes and languages.
const code = highlighter.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'nord'
})


const buttonVariants = tv({
	base: "",
	variants: {
		variant: {
			default:
				"bg-primary  text-base0/50",
			destructive: "bg-destructive  hover:bg-destructive/90",
			outline: "border-input   hover:text-accent-foreground border",
			secondary: "bg-secondary  hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary  hover:underline"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
})

type Variant = VariantProps<typeof buttonVariants>["variant"]
type Size = VariantProps<typeof buttonVariants>["size"]

type Props = ButtonPrimitive.Props & {
	variant?: Variant
	size?: Size
}

type Events = ButtonPrimitive.Events

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants
}

`
	},
	rust: {
		display: "Rust",
		icon: Rust,
		text: `
mod fnv;
mod glob;
mod pathutil;

#[cfg(feature = "serde1")]
mod serde_impl;

#[cfg(feature = "log")]
macro_rules! debug {
    ($($token:tt)*) => (::log::debug!($($token)*);)
}

#[cfg(not(feature = "log"))]
macro_rules! debug {
    ($($token:tt)*) => {};
}

/// Represents an error that can occur when parsing a glob pattern.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Error {
    /// The original glob provided by the caller.
    glob: Option<String>,
    /// The kind of error.
    kind: ErrorKind,
}

    /// This takes a Candidate as input, which can be used to amortize the               <Label for="email">Email</Label>  <Label for="email">Email</Label>  <Label for="email">Email</Label>  <Label for="email">Email</Label>  <Label for="email">Email</Label>
    /// cost of preparing a path for matching.
    pub fn matches_candidate_into(
        &self,
        path: &Candidate<'_>,
        into: &mut Vec<usize>,
    ) {
        into.clear();
        if self.is_empty() {
            return;
        }
        for strat in &self.strats {
            strat.matches_into(path, into);
        }
        into.sort();
        into.dedup();
    }

    fn new(pats: &[Glob]) -> Result<GlobSet, Error> {
        if pats.is_empty() {
            return Ok(GlobSet { len: 0, strats: vec![] });
        }
        let mut lits = LiteralStrategy::new();
        let mut base_lits = BasenameLiteralStrategy::new();
        let mut exts = ExtensionStrategy::new();
        let mut prefixes = MultiStrategyBuilder::new();
        let mut suffixes = MultiStrategyBuilder::new();
        let mut required_exts = RequiredExtensionStrategyBuilder::new();
        let mut regexes = MultiStrategyBuilder::new();
        for (i, p) in pats.iter().enumerate() {
            match MatchStrategy::new(p) {
                MatchStrategy::Literal(lit) => {
                    lits.add(i, lit);
                }
                MatchStrategy::BasenameLiteral(lit) => {
                    base_lits.add(i, lit);
                }
                MatchStrategy::Extension(ext) => {
                    exts.add(i, ext);
                }
                MatchStrategy::Prefix(prefix) => {
                    prefixes.add(i, prefix);
                }
                MatchStrategy::Suffix { suffix, component } => {
                    if component {
                        lits.add(i, suffix[1..].to_string());
                    }
                    suffixes.add(i, suffix);
                }
                MatchStrategy::RequiredExtension(ext) => {
                    required_exts.add(i, ext, p.regex().to_owned());
                }
                MatchStrategy::Regex => {
                    debug!("glob converted to regex: {:?}", p);
                    regexes.add(i, p.regex().to_owned());
                }
            }
        }
        debug!(
            "built glob set; {} literals, {} basenames, {} extensions, \
                {} prefixes, {} suffixes, {} required extensions, {} regexes",
            lits.0.len(),
            base_lits.0.len(),
            exts.0.len(),
            prefixes.literals.len(),
            suffixes.literals.len(),
            required_exts.0.len(),
            regexes.literals.len()
        );
        Ok(GlobSet {
            len: pats.len(),
            strats: vec![
                GlobSetMatchStrategy::Extension(exts),
                GlobSetMatchStrategy::BasenameLiteral(base_lits),
                GlobSetMatchStrategy::Literal(lits),
                GlobSetMatchStrategy::Suffix(suffixes.suffix()),
                GlobSetMatchStrategy::Prefix(prefixes.prefix()),
                GlobSetMatchStrategy::RequiredExtension(
                    required_exts.build()?,
                ),
                GlobSetMatchStrategy::Regex(regexes.regex_set()?),
            ],
        })
    }
}

impl Default for GlobSet {
    /// Create a default empty GlobSet.
    fn default() -> Self {
        GlobSet::empty()
    }
}`
	}
}

const state = writable<LanguageName>("typescript")
export const setLanguage = state.set
export const language = derived(state, (language) => ({ ...languages[language], name: language }))
