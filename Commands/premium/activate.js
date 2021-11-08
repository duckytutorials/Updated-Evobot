module.exports = ({
name: "activate"
code: `
$onlyIf[$guildID!=;`error` you cant use this in DM!]
$onlyIf[$message!=;`error` The given code is invalid!] 
$onlyIf[$checkCondition[$charCount[$message]==15]==true;`error` The given code is invalid!]
$onlyIf[$getVar[code;$authorID]==$message;`error` The given code is invalid!]
 
 
You activated premium in `$serverName[$guildID]`
 
$setVar[code;;$authorID]
$setServerVar[premium;yes]`})