module.exports = ({
name: "avatar",
code:`$if[$message!=server]
$title[$username[$findmember[$message;yes]]'s avatar]
$description[$addfield[Avatar links;[PNG]($replaceText[$userAvatar[$findmember[$message;yes]];webp;png]) | [WEBP]($replaceText[$userAvatar[$findmember[$message;yes]];png;webp]) | [JPEG]($replaceText[$replaceText[$userAvatar[$findmember[$message;yes]];webp;jpeg];png;jpeg]);no]]
$image[$userAvatar[$findmember[$message;yes]]]
$color[BLUE]
$elseif[$message==server]
$title[$servername's server icon]
$description[$addfield[Avatar links;[PNG]($replaceText[$servericon;webp;png]) | [WEBP]($replaceText[$servericon;png;webp]) | [JPEG]($replaceText[$replaceText[$servericon;webp;jpeg];png;jpeg]);no]]
$image[$servericon]
$color[BLUE]
$endelseif
$endif`})