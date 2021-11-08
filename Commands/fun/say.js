module.exports = ({
    name:"say",
    code:`$onlyIf[$message!=;Please enter something to say!]
    $replaceText[$replaceText[$hasPerms[$authorID;mentioneveryone];true;$message;1];false;$replaceText[$replaceText[$checkContains[$noMentionMessage;@everyone;@here];true;You cannot use mentions in a say command!;1];false;$message;1];1]`
    })