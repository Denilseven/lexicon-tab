# What is this?

This is a page I've built to make it more convenient to search the definition of words in various dictionaries, translators and search engines online.

# How it works

When you click one of the buttons it will open, in the same tab, a link that is the combination of the input you've given in the topmost box and the link of that dictionary.

For example, if you write ````Test```` in the input box and then click the default ````Dictionary```` button, it will open this link: ````https://www.dictionary.com/browse/Test````

# How to use it

For starters, you can head on to https://denilseven.github.io/lexicon-tab/, type a word in the topmost box and then click on one of the options below to search this word using the dictionary you want.

To **create a new option** you can click on the "plus" button, it will open a menu with three boxes. Now, for example, if we wanted to add an option to translate the input from any language to latin using Google Translate, we would fill in the boxes as follows:
```
Translate (auto to latin)
```
```
https://translate.google.com/?sl=auto&tl=la&text=
```
```
&op=translate
```
The first box is the name of the button that will be created, the second box is the start of the link (the part of the link before the input text) and the third box is the end of the link (the part of the link after the input text).

When we click this new button, it will open ```"https://translate.google.com/?sl=auto&tl=la&text=" + <input> + "&op=translate"```

To **delete an option** you just right-click it.

The code saves your changes in local storage.
