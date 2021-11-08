module.exports = ({
    name: "badword-list",
    aliases: ['bw-list'],
    category:"Mod",
    explanation:"Show the blacklist a words in the server!",
    bot:"Manage Messages",
    user:"Manage Messages",
    usage:"badword-list",
    example:"badword-list",
    explain:"Show the blacklist a words in the server!",
    code: `
    $title[**__Badword List__**]
    $color[YELLOW]
    $thumbnail[$servericon]
    $description[\`$replacetext[$replacetext[$replacetext[$getservervar[cbw];#right_click#;>];#left_click#;<];/;, ]\`]
    $addtimestamp
    $onlyif[$gettextsplitlength>=2;{description:**There are no badword in this server.**}{color:YELLOW}]
    $onlyif[$getservervar[badwords]==true;Badwords is disabled.]
    $textsplit[$getservervar[cbw];/] 
    `
    })