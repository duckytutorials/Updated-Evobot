module.exports = [{
    name:"category",
    type:"awaitedCommand",
    code:`$setservervar[tmc;$getservervar[tmc]$message/]
    Setup completed!
    $onlyif[$channelexists[$message]==true;Could not find the category!]`}]