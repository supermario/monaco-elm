Monaco language syntax definition for [Elm](https://elm-lang.org/).

Basic default working, could do with refinement. Contributions welcome!

Usage:

```
import * as elm from "./monaco-elm";

monaco.languages.register({ id: 'elm' });
monaco.languages.setMonarchTokensProvider('elm', elm.language);

monaco.editor.create(document.getElementById('monaco'), {
  language: "elm",
  ...
}

```

Once decent will make a PR for https://github.com/microsoft/monaco-languages.
