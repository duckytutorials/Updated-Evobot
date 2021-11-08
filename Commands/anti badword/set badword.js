module.exports = ({
    name: "set-badword",
    code: `$setservervar[badwords;$message[6]]
  Success! Badword is now **$replacetext[$replacetext[$message[5];true;enabled];false;disabled]**!
  $onlybotperms[managemessages;{description:I do not have the \`Manage Messages\` permissions to execute this!}{color:FF0000}]
  $onlyif[$replacetext[$replacetext[$message[1]$message[2]$message[3]$message[4]$message[5]$message[6];true;];false;]==;{description:Only true/false can be entered as settings!}{color:FF0000}]
  $onlyIf[$message[5]!=;{field:Invalid Arguments Used!:> \`\`\`fix
  > $getservervar[prefix]automod <antispam true/false> <caps true/false> <mass mention true/false> <mass emoji true/false> <anti links true/false> <badword true/false>\`\`\`}{color:FF0000}]
  $onlyperms[manageserver;{description:You need the \`Manage Server\` permissions to do this!}{color:FF0000}]`
  )}