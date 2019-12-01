function validateText() {
    let rawContent = document.getElementById("textContent").value

    if (rawContent.length <= 100) {
        alert("Please enter at least 100 characters!")
    } else {
        window.sessionStorage.setItem("rawContent", rawContent)

        window.location.href = "./result.html"
    }
    
    return false
}

var indicatorCounts = [[0, 0], [0, 0], [0, 0], [0, 0]]

function performAnalysis() {
    let rawContent = window.sessionStorage.getItem("rawContent")

    if (rawContent == null) {
        window.location.replace("https://directionalindicators.github.io/")
        return
    }

    let updatedContent = "<p>"
    
    blandAdditives.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", blandAdditiveColor))
    })
    flavorfulAdditives.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", flavorfulAdditiveColor))
    })
    
    blandSequential.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", blandSequentialColor))
    })
    flavorfulSequential.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", flavorfulSequentialColor))
    })

    blandCausal.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", blandCausalColor))
    })
    flavorfulCausal.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", flavorfulCausalColor))
    })

    blandOppositional.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", blandOppositionalColor))
    })
    flavorfulOppositional.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", flavorfulOppositionalColor))
    })

    updatedContent += rawContent
    
    updatedContent += "</p>"

    indicatorCounts[0][0] = (updatedContent.match(new RegExp(blandAdditiveColor, "g")) || []).length
    indicatorCounts[0][1] = (updatedContent.match(new RegExp(flavorfulAdditiveColor, "g")) || []).length

    indicatorCounts[1][0] = (updatedContent.match(new RegExp(blandSequentialColor, "g")) || []).length
    indicatorCounts[1][1] = (updatedContent.match(new RegExp(flavorfulSequentialColor, "g")) || []).length

    indicatorCounts[2][0] = (updatedContent.match(new RegExp(blandCausalColor, "g")) || []).length
    indicatorCounts[2][1] = (updatedContent.match(new RegExp(flavorfulCausalColor, "g")) || []).length

    indicatorCounts[3][0] = (updatedContent.match(new RegExp(blandOppositionalColor, "g")) || []).length
    indicatorCounts[3][1] = (updatedContent.match(new RegExp(flavorfulOppositionalColor, "g")) || []).length

    document.getElementById("content").innerHTML = updatedContent
}

function highlightWord(word, color) {
    return "<span style=\"background-color: " + color + "\">" + word + "</span>";
}