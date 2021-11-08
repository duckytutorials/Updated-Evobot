module.exports = ({
    name: "add-badword",
    aliases: ['add-bw',],
    category:"Mod",
    explanation:"Blacklist a word in the server!",
    bot:"Manage Messages",
    user:"Manage Messages",
    usage:"add-badword <word>",
    example:"add-badword ( ͡° ͜ʖ ͡°)",
    explain:"Blacklist a word in the server.",
    code: `
    $setservervar[cbw;$replacetext[$replacetext[$checkcondition[$getservervar[cbw]!=];false;$tolowercase[$message[1]]/];true;$getservervar[cbw]$tolowercase[$message[1]]/]]
    $description[**Successfully added** $replacetext[$replacetext[\`$tolowercase[$message[1]]\`;#right_click#;>];#left_click#;<]]
    $color[YELLOW]
    $thumbnail[$serverIcon]
    $onlyif[$findtextsplitindex[$tolowercase[$message[1]]]==0;{description:Command \`$tolowercase[$message[1]]\` **is already available in the badword list**}{color:YEllOW}]
    $textsplit[$getservervar[cbw];/]
    $onlyif[$checkcontains[$message;#RIGHT#;#LEFT#;#RIGHT_BRACKET#;#LEFT_BRACKET#;/]==false;{description:Please don't use it \`symbol\` for badword}{color:YELLOW}]
    $argscheck[>1;{description:**Invalid Argument: \`Missing Badword\`
     
    \`$getServerVar[prefix]add-bw <badword>\`}{color:YELLOW}]
    $onlyperms[manageserver;{description:**You have no permissions for** \`Manage Server\`}{color:YELLOW}{timestamp}]
    `
    })