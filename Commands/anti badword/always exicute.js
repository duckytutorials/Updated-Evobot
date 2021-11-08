module.exports = ({
    name: "$alwaysExecute",
    code: `$senddm[$get[user];{author:You recieved a verbal warning in $servername!:$servericon}{description:<@$authorid> verbally warned you, due to **swearing**!\n\nPlease don't do it again!}{color:FF0000}{timestamp}{footer:Issued by $usertag}]
    $sendmessage[{author:Verbally Warned!}{description:I verbally warned **$usertag[$get[user]]**, due to **swearing**!\n\n<@$get[user]> have been verbally warned!}{color:FF0000}{timestamp}{footer:Issued by $usertag};no]
    $if[$serverchannelexists[$getservervar[bl]]==true]
    $channelsendmessage[$getservervar[bl];{author:A user was verbally warned!:$authoravatar}{description:I verbally warned <@$get[user]>, due to **swearing**!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:FF0000}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
    $endif
    $deletecommand
    $let[user;$findmember[$authorid;no]]
    $onlyif[$findtextsplitindex[$tolowercase[$message]]!=0;]
    $onlyif[isValidImageLink[$messageattachment]==;]
    $onlyif[$isbot[$authorid]==false;]
    $onlyif[$getservervar[badwords]==true;]
    $textsplit[$getservervar[cbw];/]
    `
    })