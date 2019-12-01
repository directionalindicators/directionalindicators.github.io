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

var indicatorCounts = [0, 0, 0,0]

function performAnalysis() {
    let rawContent = window.sessionStorage.getItem("rawContent")

    if (rawContent == null) {
        window.location.replace("https://directionalindicators.github.io/")
        return
    }

    let updatedContent = "<p>"
    
    additives.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", additiveColor))
    })
    
    sequential.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", sequentialColor))
    })

    causal.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", causalColor))
    })

    oppositional.forEach(function(item, index) {
        rawContent = rawContent.replace(new RegExp("\\b(" + item + ")\\b", "gi"), highlightWord("$1", oppositionalColor))
    })

    updatedContent += rawContent
    
    updatedContent += "</p>"

    indicatorCounts[0] = (updatedContent.match(new RegExp(additiveColor, "g")) || []).length
    indicatorCounts[1] = (updatedContent.match(new RegExp(sequentialColor, "g")) || []).length
    indicatorCounts[2] = (updatedContent.match(new RegExp(causalColor, "g")) || []).length
    indicatorCounts[3] = (updatedContent.match(new RegExp(oppositionalColor, "g")) || []).length

    document.getElementById("content").innerHTML = updatedContent
}

function highlightWord(word, color) {
    return "<span style=\"background-color: " + color + "\">" + word + "</span>";
}