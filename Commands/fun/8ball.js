module.exports = {
 name: "8ball",
 code: `
$description[**What is your question?**
\`"$message?"\`
**My answer is...**
\`"$jsonrequest[https://api.rodiscool.repl.co/8ball;responce]"\`]
$color[RANDOM]
$onlyif[$message!=;{description:**You need to ask me something if you want an answer!**}{color:YELLOW}]
$thumbnail[https://66.media.tumblr.com/98c383d96670af7939e819e423825cfa/0ec5b0da41b86ce6-4d/s500x750/0f01086b8c1dcbde970fbaa818bc5f573df58b5f.gif]
`
  }
